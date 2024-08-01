(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))c(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&c(u)}).observe(document,{childList:!0,subtree:!0});function o(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(s){if(s.ep)return;s.ep=!0;const r=o(s);fetch(s.href,r)}})();const C=document.getElementById("user-score"),I=document.getElementById("pc-score"),d=document.getElementById("startmove"),p=document.getElementById("restart-button"),g=document.getElementById("popup"),T=document.getElementById("popup-message"),O=document.querySelectorAll(".button"),x=document.getElementById("popup-ok-button"),n=Array(9).fill(null),h=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];let E=0,y=0,l=null,i=!0;const A=()=>{C.textContent=E,I.textContent=y},a=()=>{i?d.textContent=l===0?"Turno Player":"Turno PC":d.textContent="Partita terminata"},v=e=>{p.disabled=!e},P=e=>{T.textContent=e,g.classList.remove("d-none")},b=()=>{g.classList.add("d-none")},m=(e,t)=>{setTimeout(()=>{P(e),t==="user"&&E++,t==="pc"&&y++,A(),i=!1,a(),v(!0)},100)},k=()=>h.some(([e,t,o])=>n[e]&&n[e]===n[t]&&n[e]===n[o]),G=()=>n.every(e=>e!==null),f=e=>{for(const[t,o,c]of h){if(n[t]===e&&n[o]===e&&n[c]===null)return c;if(n[t]===e&&n[c]===e&&n[o]===null)return o;if(n[o]===e&&n[c]===e&&n[t]===null)return t}return null},q=()=>Math.random()<.6,L=(e,t)=>{k()?m(e,t):G()?m("Empate!"):R()},w=(e,t)=>{!i||n[t]||l!==0||(M(e,t,"circle"),L("User ha ganado!","user"))},N=e=>{const t=document.querySelector(`span[data-pos='${e}']`);t&&(M(t,e,"cross"),L("PC ha ganado","pc"))},M=(e,t,o)=>{e.classList.add(o),n[t]=o},R=()=>{l=1-l,a(),l===1&&setTimeout(B,500)},B=()=>{if(!i||l!==1)return;let e=f("cross");if(e===null&&q()&&(e=f("circle")),e===null){const t=n.map((o,c)=>o===null?c:null).filter(o=>o!==null);t.length&&(e=t[Math.floor(Math.random()*t.length)])}e!==null&&N(e)},S=()=>{n.fill(null),O.forEach(e=>{e.classList.remove("cross","circle")}),l=Math.floor(Math.random()*2),i=!0,a(),v(!1),b(),l===1&&setTimeout(B,500)},U=()=>S();document.addEventListener("click",e=>{const t=e.target;if(t.classList.contains("button")){const o=t.dataset.pos;i?w(t,o):P("Partida terminada. Reinicia el juego!")}});x.addEventListener("click",b);p.addEventListener("click",U);S();
