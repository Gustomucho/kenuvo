// Prepared integration, intentionally inactive. Never receives the calculator state.
export function advertisingReadiness(config){const blockers=[];if(!config?.enabled)blockers.push('disabled');if(!/^ca-pub-\d{16}$/.test(config?.clientId||''))blockers.push('publisher_id_missing');if(!/^\d{6,20}$/.test(config?.slotId||''))blockers.push('slot_id_missing');for(const k of ['certifiedCmpIntegrated','siteApproved','adsTxtRootVerified','privacyNoticeReviewed'])if(config?.[k]!==true)blockers.push(k);if(config?.placement!=='editorial-only')blockers.push('editorial_pages_only');return {ready:blockers.length===0,blockers};}
export async function initializeAdvertising({config,consentAdapter,document:doc,window:win}){
 const readiness=advertisingReadiness(config);if(!readiness.ready)return {...readiness,loaded:false};
 // Activation additionally requires a real certified CMP adapter, implemented during account onboarding.
 if(typeof consentAdapter?.requestAdPermission!=='function')return {loaded:false,blockers:['cmp_adapter_missing']};
 if(doc.querySelector('#calculator')||!doc.querySelector('[data-ad-placement="editorial"]'))return {loaded:false,blockers:['no_editorial_slot']};
 const permission=await consentAdapter.requestAdPermission();if(permission?.allowed!==true)return {loaded:false,blockers:['no_ad_permission']};
 if(doc.querySelector('script[data-kenuvo-adsense]'))return {loaded:true,alreadyLoaded:true};
 const slot=doc.querySelector('[data-ad-placement="editorial"]'),ad=doc.createElement('ins');ad.className='adsbygoogle';ad.style.display='block';ad.dataset.adClient=config.clientId;ad.dataset.adSlot=config.slotId;ad.dataset.adFormat='auto';ad.dataset.fullWidthResponsive='true';slot.replaceChildren(ad);
 const script=doc.createElement('script');script.async=true;script.crossOrigin='anonymous';script.dataset.kenuvoAdsense='true';script.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client='+encodeURIComponent(config.clientId);
 script.onload=()=>{(win.adsbygoogle=win.adsbygoogle||[]).push({});};doc.head.append(script);return {loaded:true};
}
