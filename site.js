import {loadProduct} from './assets/objects/product-render/build.js';
const host=document.querySelector('#seed-render');
let controller;
try { const product=await loadProduct(host.dataset.product); controller=product.mount(host,{place:'stage',mode:'auto',color:'listen',params:{turn:1,interactive:0}}); } catch(error) { console.warn('Seed render:',error); }
let first='listen',second='wait',nonce=0;
const words={listen:'Ascolta',explore:'Esplora',wait:'Aspetta',act:'Agisci'};
const variants={listenwait:'listen',listenact:'mixed',explorewait:'explore',exploreact:'wait'};
function mix(){
 let hash=2166136261; for(const c of `${first}:${second}:${nonce}`){hash^=c.charCodeAt(0);hash=Math.imul(hash,16777619);}
 const seed=(hash>>>0)%1000001;
 document.querySelector('#seed-value').textContent=String(seed).padStart(6,'0');
 document.querySelector('#seed-note').textContent=`${words[first]} × ${words[second]}. Un nuovo punto di partenza.`;
 for(const [id,game] of [['seed-dark','the-dark-seed'],['seed-hospital','the-hospital-seed']]) document.getElementById(id).href=`https://seedxygames.github.io/${game}/?seed=${seed}`;
 const color=variants[first+second]; controller?.setColor(color);
 host.setAttribute('aria-label',`Semi 3D: ${words[first]} e ${words[second]}`);
}
for(const button of document.querySelectorAll('[data-choice]'))button.addEventListener('click',()=>{
 const group=button.dataset.choice;
 for(const peer of document.querySelectorAll(`[data-choice="${group}"]`))peer.setAttribute('aria-pressed',String(peer===button));
 if(group==='a')first=button.value;else second=button.value;
 mix();
});
document.querySelector('#remix').addEventListener('click',()=>{nonce++;mix()});
// The illustration mixes impulses; the game receives only its supported numeric seed.
mix();
