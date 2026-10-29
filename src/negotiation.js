// Keep the original price outside the edited scenario so the slider never shrinks during dragging.
export function priceBounds(anchor,current){const p=Number(current),a=Number(anchor);return {min:1,max:Math.max(1,Number.isFinite(a)?a:0,Number.isFinite(p)?p:0),step:1};}
export function bindPriceControls(container,{onPrice,onReset,onInvalid}){
 const range=container.querySelector('[data-price-range]'),number=container.querySelector('[data-price-number]'),reset=container.querySelector('[data-price-reset]');
 const edit=event=>{const raw=event.target.value,n=Number(raw);if(raw===''||!Number.isFinite(n)||n<1||n>1e9){event.target.setAttribute('aria-invalid','true');onInvalid();return;}event.target.removeAttribute('aria-invalid');onPrice(n);};
 range.addEventListener('input',edit);number.addEventListener('input',edit);reset.addEventListener('click',onReset);
}
