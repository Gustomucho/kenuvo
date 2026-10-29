import{initializeContact}from'./contact.js';
import{registerAgentTools}from'./webmcp.js';
import{initializeAdvertising}from'./advertising.js';
const node=document.querySelector('#reference'),identity=document.querySelector('#site-config');
if(node&&identity){const reference=JSON.parse(node.textContent),config=JSON.parse(identity.textContent);registerAgentTools({document,navigator,reference,siteUrl:config.siteUrl,getLanguage:()=>document.documentElement.lang}).then(result=>{document.documentElement.dataset.webmcp=result.supported?(result.failed.length?'partial':'registered'):'unsupported';});}
const ad=document.querySelector('#ad-config');if(ad)initializeAdvertising({config:JSON.parse(ad.textContent),document,window});

initializeContact({document});
