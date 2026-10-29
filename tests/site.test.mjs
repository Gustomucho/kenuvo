import{test}from'node:test';import assert from'node:assert/strict';import{execFileSync}from'node:child_process';import{readFile,readdir,stat}from'node:fs/promises';import{resolve}from'node:path';
const root=resolve(new URL('..',import.meta.url).pathname);
test('static production build has translated SEO and valid internal links without source documents',async()=>{
 execFileSync(process.execPath,['scripts/build.mjs'],{cwd:root,stdio:'pipe'});
 const files=[];async function walk(dir){for(const entry of await readdir(dir,{withFileTypes:true})){const p=dir+'/'+entry.name;if(entry.isDirectory())await walk(p);else files.push(p);}}await walk(root+'/dist');
 const htmlFiles=files.filter(p=>p.endsWith('.html'));assert.equal(htmlFiles.length,19);
 const canonical=new Set();for(const p of htmlFiles){const html=await readFile(p,'utf8');assert.ok(!html.includes('undefined'));assert.equal((html.match(/<h1[ >]/g)||[]).length,1);const c=html.match(/rel="canonical" href="([^"]+)"/)[1];assert.ok(!canonical.has(c));canonical.add(c);for(const l of ['fr','nl','en'])assert.ok(html.includes(`hreflang="${l}"`));assert.ok(html.includes('Content-Security-Policy'));for(const m of html.matchAll(/(?:href|src)="(\/kevuno\/[^"#]*)/g)){const rel=m[1].slice('/kevuno/'.length),target=root+'/dist/'+(rel.endsWith('/')?rel+'index.html':rel);assert.ok((await stat(target)).isFile(),`${p}: ${target}`);}}
 assert.ok(!files.some(p=>/README|reference\.json|\.map$|\.env|tests/.test(p)));
 const script=await readFile(root+'/dist/assets/app.js','utf8');assert.ok(!script.includes('window.name'));assert.ok(!/https?:\/\//.test(script));assert.equal((script.match(/localStorage.setItem/g)||[]).length,1);
});
