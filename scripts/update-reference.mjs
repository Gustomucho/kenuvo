// Run on CI or manually. Never called by a visitor's calculator.
import{readFile,writeFile,mkdir}from'node:fs/promises';
const path='data/reference.json',data=JSON.parse(await readFile(path)),today=new Date().toISOString().slice(0,10);
const endpoint='https://data-api.ecb.europa.eu/service/data/MIR/M.BE.B.A2C.P.R.A.2250.EUR.N?startPeriod=2025-01&format=csvdata';
const response=await fetch(endpoint,{signal:AbortSignal.timeout(30000),headers:{Accept:'text/csv'}});if(!response.ok)throw Error(`ECB HTTP ${response.status}`);
const csv=await response.text();const rows=csv.trim().split(/\r?\n/).map(row=>row.match(/("(?:[^"]|"")*"|[^,]*)(,|$)/g)?.filter(Boolean).map(v=>v.replace(/,$/,'').replace(/^"|"$/g,'').replace(/""/g,'"')));
const header=rows.shift(),period=header.indexOf('TIME_PERIOD'),value=header.indexOf('OBS_VALUE'),key=header.indexOf('KEY');if(period<0||value<0||key<0)throw Error('Unexpected ECB schema');
const observations=rows.filter(r=>r[key]===data.rate.series&&/^\d{4}-\d{2}$/.test(r[period])&&r[period]<=today.slice(0,7)&&Number.isFinite(Number(r[value]))&&Number(r[value])>=0&&Number(r[value])<=30).sort((a,b)=>a[period].localeCompare(b[period]));
const latest=observations.at(-1);if(!latest||latest[period]<data.rate.period)throw Error('Missing or stale observations');
data.rate={...data.rate,value:Number(latest[value]),period:latest[period],checkedAt:today};
// Tax and renovation verification dates are never advanced by an interest-rate fetch.
await writeFile(path,JSON.stringify(data,null,2)+'\n');await mkdir('reports',{recursive:true});
const quarter=[0,3,6,9].includes(new Date().getUTCMonth());let review=`# Reference check ${today}\n\nECB housing-loan rate: ${data.rate.value}% (${data.rate.period}). AAR/NDER statistical series; not APR or bullet pricing.\n\n`;
if(quarter){try{const r=await fetch(data.renovationSource,{signal:AbortSignal.timeout(30000)});if(!r.ok)throw Error(`HTTP ${r.status}`);const html=await r.text();if(html.length<500)throw Error('Unexpected document');review+='Quarterly renovation source retrieved. Human review required: compare the published scope, VAT and light/complete/heavy ranges before changing prices or verification dates. No automatic replacement of cost assumptions.\n';}catch(err){review+=`Renovation check blocked: ${err.message}. Keep last verified ranges and dates.\n`;}}
review+='\nReview regional tax rules separately. Reference updates require pull-request review before publication.\n';await writeFile('reports/reference-check.md',review);console.log(review);
