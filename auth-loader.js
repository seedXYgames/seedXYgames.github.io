// Account tools load when the Passport approaches, or immediately on an account action.
let pending;
const ensureAccount=()=>pending??=(import('./seedxy-auth.js'));
for(const button of document.querySelectorAll('[data-account-action]'))button.addEventListener('click',async()=>{
 const label=button.textContent;button.disabled=true;button.setAttribute('aria-busy','true');
 try{await ensureAccount();await window.SeedXY?.[button.dataset.accountAction]?.()}
 catch{button.textContent='Connessione non disponibile. Riprova.';setTimeout(()=>button.textContent=label,3000);pending=null}
 finally{button.disabled=false;button.removeAttribute('aria-busy')}
});
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){ensureAccount().catch(()=>{pending=null});observer.disconnect()}},{rootMargin:'250px'});observer.observe(document.querySelector('#passport'))}
else ensureAccount().catch(()=>{pending=null});
