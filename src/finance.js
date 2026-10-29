// Pure financial engine. All amounts are euros; rates are nominal annual fractions.
export const checkedNumber=(v,min=0,max=1e9)=>{if(v===''||v===null||v===undefined)return null;const n=Number(v);return Number.isFinite(n)&&n>=min&&n<=max?n:null;};
export function payment(principal,annualRate,months){if(principal===0)return 0;if(!Number.isFinite(principal)||principal<0||!Number.isFinite(annualRate)||annualRate<0||!Number.isInteger(months)||months<1)throw Error('Invalid loan');const r=annualRate/12;return r===0?principal/months:principal*r/(-Math.expm1(-months*Math.log1p(r)));}
export function capitalForPayment(monthly,annualRate,months){return monthly/payment(1,annualRate,months);}
export function remaining(principal,annualRate,months,elapsed){if(elapsed>=months)return 0;if(elapsed<=0)return principal;const r=annualRate/12;return r===0?principal*(1-elapsed/months):principal*Math.exp(elapsed*Math.log1p(r))-payment(principal,annualRate,months)*Math.expm1(elapsed*Math.log1p(r))/r;}
export function duties(price,{region='brussels',mode='home',eligible=false,benefitShare=100,taxBase=0,date='2026-10-29'}={}){const base=Math.max(price,taxBase||0),share=eligible&&mode==='home'?Math.min(100,Math.max(0,benefitShare))/100:0;
 if(!['brussels','wallonia','flanders'].includes(region))throw Error('Invalid region');
 // No forward claim for 2027 changes that are still proposals at verification time.
 if(date>'2026-12-31'&&share>0)return {amount:base*(region==='flanders'?.12:.125),benefit:false,unverifiedDate:true};
 if(region==='brussels'){const ok=share===1&&base<=600000;return {amount:Math.max(0,base-(ok?200000:0))*.125,benefit:ok};}
 if(region==='wallonia')return {amount:base*(.125*(1-share)+.03*share),benefit:share>0};
 return {amount:base*(.12*(1-share)+.02*share),benefit:share>0};}
export function renovation({area=0,method='none',level='medium',unitCost=null,detailed=0,contingency=15},data){
 if(!['none','sqm','detail'].includes(method)||!data[level])throw Error('Invalid works');
 if(method==='none')return {base:0,contingency:0,total:0,low:null,high:null};
 const a=checkedNumber(area),c=checkedNumber(contingency,0,100),unit=unitCost===null||unitCost===''?data[level].mid:checkedNumber(unitCost);
 const base=method==='detail'?checkedNumber(detailed):(a===null||a===0||unit===null?null:a*unit);
 if(base===null||c===null||!Number.isFinite(base)||base<0)throw Error('Invalid works');
 return {base,contingency:base*c/100,total:base*(1+c/100),low:method==='sqm'?a*data[level].low:null,high:method==='sqm'?a*data[level].high:null};}
export function evaluate(s,works,price=Number(s.price)){
 const read=(k,f=0)=>checkedNumber(s[k])??f;
 const missing=[];for(const k of ['rate','ltv','vacancy','management','rentRecognition','downPayment','worksAdvance','benefitShare'])if(checkedNumber(s[k],0,100)===null)missing.push(k);for(const k of ['reserve','existingDebts','propertyTax','insurance','maintenance','otherHousing','buyFees','loanFees','transition'])if(s[k]!==undefined&&checkedNumber(s[k])===null)missing.push(k);if(!/^\d{4}-\d{2}-\d{2}$/.test(s.date||''))missing.push('date');for(const k of ['savings','income','monthlyLimit','livingCosts'])if(checkedNumber(s[k])===null)missing.push(k);
 if(!Number.isFinite(price)||price<=0)missing.push('price');if(s.mode==='rental'&&checkedNumber(s.rent)===null)missing.push('rent');if(s.bullet){if(checkedNumber(s.bulletRate,0,100)===null)missing.push('bulletRate');if(checkedNumber(s.bulletAmount)===null)missing.push('bulletAmount');}
 const years=read('years',25),rate=read('rate',3.53)/100;if(checkedNumber(s.years,1,40)===null||!Number.isInteger(years))missing.push('years');if(!Number.isFinite(works)||works<0)missing.push('works');
 if(missing.length)return {complete:false,missing:[...new Set(missing)]};
 const duty=duties(price,{...s,taxBase:read('taxBase'),eligible:s.eligible,benefitShare:read('benefitShare',100)}),cost=price+duty.amount+read('buyFees',6500)+read('loanFees',5000)+works+read('transition');
 const usable=Math.max(0,read('savings')-read('reserve')),need=Math.max(0,cost-usable),bullet=s.bullet?Math.min(need,read('bulletAmount')):0,amort=need-bullet,months=Math.round(years*12),monthly=payment(amort,rate,months),interest=bullet*read('bulletRate')/1200;
 const expenses=read('propertyTax')/12+read('insurance')/12+read('maintenance')/12+read('otherHousing');
 const grossRent=s.mode==='rental'?read('rent'):0,netRent=grossRent*(1-read('vacancy',5)/100)-expenses-grossRent*read('management')/100;
 const exit=s.exitPlan==='external'?read('exitFunds'):0,provision=bullet&&s.exitPlan==='save'?bullet/120:0;
 const initialExpense=read('downPayment',10)/100*price+works*read('worksAdvance')/100;
 const debt=monthly+interest,effort=debt+provision;
 const householdRoom=read('income')-read('existingDebts')-read('livingCosts')+(s.mode==='rental'?grossRent*read('rentRecognition',70)/100-expenses:-expenses);
 const cap=Math.max(0,Math.min(read('monthlyLimit'),householdRoom));
 const bankValue=read('bankValue')||price,ltv=need/bankValue,ltvLimit=read('ltv',s.mode==='rental'?80:90)/100;
 const cashflow=netRent-debt-provision,exitFunded=bullet===0||s.exitPlan==='save'||(s.exitPlan==='external'&&s.exitConfirmed&&exit>=bullet);
 const failures=[];if(read('savings')<read('reserve'))failures.push('reserve');if(effort>cap+.01)failures.push('monthly');if(ltv>ltvLimit+1e-9)failures.push('ltv');if(initialExpense>usable+.01)failures.push('advance');if(!exitFunded)failures.push('exit');if(s.mode==='rental'&&s.enableTarget&&cashflow<read('cashflowTarget'))failures.push('yield');
 const scenarios=Array.from(new Set([1,10,20,years].filter(y=>y<=Math.max(years,bullet?10:0)))).sort((a,b)=>a-b).map(y=>({year:y,debt:remaining(amort,rate,months,Math.round(y*12))+(y<10?bullet:0),bulletDue:y===10?bullet:0}));
 // Minimum contribution is calculated against constraints, not merely current requested credit.
 const affordableDebt=Math.min(cap,s.mode==='rental'&&s.enableTarget?Math.max(0,netRent-read('cashflowTarget')):Infinity);const availableForAmort=Math.max(0,affordableDebt-interest-provision),maxAmort=capitalForPayment(availableForAmort,rate,months),maxBullet=exitFunded?bullet:0,maxLoan=Math.min(maxAmort+maxBullet,ltvLimit*bankValue,cost);
 const minimumContribution=Math.max(0,cost-maxLoan,initialExpense);
 const warnings=[];if(!read('bankValue'))warnings.push('bankEstimate');if(duty.unverifiedDate)warnings.push('dateTax');if(s.eligible)warnings.push('taxVerify');if(bullet&&s.exitPlan==='external')warnings.push('exitUncertain');
 return {complete:true,maxLoan,householdRoom:householdRoom-effort,price,cost,duties:duty.amount,benefit:duty.benefit,works,usable,need,amort,bullet,monthly,interest,provision,debt,effort,cap,ltv,netRent,expenses,cashflow,minimumContribution,recommendedSavings:minimumContribution+read('reserve'),gap:Math.max(0,minimumContribution+read('reserve')-read('savings')),initialExpense,exitFunded,failures,warnings,compatible:failures.length===0,scenarios,totalInterest:monthly*months-amort+interest*120,annualYield:cost?netRent*12/cost:null,rawYield:cost?grossRent*12/cost:null};}
export function priceCeiling(s,works){if(!evaluate(s,works,1).complete)return null;
 // Separate tax intervals avoid a binary search across the Brussels relief discontinuity.
 const intervals=s.region==='brussels'&&s.eligible&&s.mode==='home'?[[1,600000],[600000.01,5000000]]:[[1,5000000]];let best=0;
 for(const [start,end]of intervals){if(!evaluate(s,works,start).compatible)continue;let lo=start,hi=end;for(let i=0;i<48;i++){const mid=(lo+hi)/2;if(evaluate(s,works,mid).compatible)lo=mid;else hi=mid;}best=Math.max(best,lo);}return Math.floor(best/100)*100;}
export function extractFacts(text){if(typeof text!=='string'||text.length>100000)throw Error('Text too long');const plain=text.replace(/<[^>]*>/g,' '),out={};const money=plain.match(/(?:€\s*([\d][\d .\u00a0]*(?:,\d{1,2})?)|([\d][\d .\u00a0]*(?:,\d{1,2})?)\s*(?:€|euros?))/i);if(money){const v=Number((money[1]||money[2]).replace(/[ .\u00a0]/g,'').replace(',','.'));if(v>=10000&&v<=3e7)out.price=v;}const area=plain.match(/([\d]+(?:[.,]\d+)?)\s*m[²2]/i);if(area)out.area=Number(area[1].replace(',','.'));return out;}
