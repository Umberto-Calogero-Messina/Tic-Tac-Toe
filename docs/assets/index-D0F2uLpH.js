(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const a of c.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function s(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(o){if(o.ep)return;o.ep=!0;const c=s(o);fetch(o.href,c)}})();const d="data:image/svg+xml,%3csvg%20width='25'%20height='25'%20viewBox='0%200%2025%2025'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M6.02286%2018.0689L18.0688%206.02295'%20stroke='%23545454'%20stroke-width='2.52379'/%3e%3cpath%20d='M6.02286%206.02286L18.0688%2018.0688'%20stroke='%23545454'%20stroke-width='2.52379'/%3e%3c/svg%3e",m="data:image/svg+xml,%3csvg%20width='18'%20height='18'%20viewBox='0%200%2018%2018'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='9'%20cy='9'%20r='7.66667'%20stroke='%23F2EBD3'%20stroke-width='2.66667'/%3e%3c/svg%3e",x=document.getElementById("user-score"),k=document.getElementById("pc-score"),p=document.getElementById("startmove"),v=document.getElementById("restart-button"),h=document.getElementById("popup"),S=document.getElementById("popup-message"),I=document.querySelectorAll(".button"),O=document.getElementById("popup-ok-button"),n=Array(9).fill(null),E=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];let y=0,w=0,i=null,l=!0;const T=()=>{x.textContent=y,k.textContent=w},u=()=>{l?p.textContent=i==="user"?"Es el turno de: Player":"Es el turno de: PC":p.textContent="Partita terminata"},M=e=>{v.disabled=!e},P=e=>{S.innerHTML=e,h.classList.remove("d-none")},G=()=>{h.classList.add("d-none")},g=(e,t)=>{setTimeout(()=>{let s="";t==="user"?(s=`
        <div class="popup-content">
          <img src="${d}" class="popup-image-cross" alt="Cross">
          <div class="winner-message">¡HA GANADO!</div>
        </div>
      `,y++):t==="pc"?(s=`
        <div class="popup-content">
          <img src="${m}" class="popup-image" alt="Circle">
          <div class="winner-message">¡HA GANADO!</div>
        </div>
      `,w++):s=`
        <div class="popup-content tie">
          <img src="${m}" class="popup-image" alt="Circle">
          <img src="${d}" class="popup-image-cross" alt="Cross">
        </div>
        <div class="tie-message">¡EMPATE!</div>
      `,P(s),T(),l=!1,u(),M(!0)},100)},$=()=>E.some(([e,t,s])=>n[e]&&n[e]===n[t]&&n[e]===n[s]),D=()=>n.every(e=>e!==null),f=e=>{for(const[t,s,r]of E){if(n[t]===e&&n[s]===e&&n[r]===null)return r;if(n[t]===e&&n[r]===e&&n[s]===null)return s;if(n[s]===e&&n[r]===e&&n[t]===null)return t}return null},H=()=>Math.random()<.6,L=(e,t)=>{$()?g(e,t):D()?g():F()},N=(e,t)=>{!l||n[t]||i!=="user"||(b(e,t,"cross"),L("User ha ganado!","user"))},q=e=>{const t=document.querySelector(`span[data-pos='${e}']`);t&&(b(t,e,"circle"),L("PC ha ganado","pc"))},b=(e,t,s)=>{e.classList.add(s),n[t]=s},F=()=>{i=i==="user"?"pc":"user",u(),i==="pc"&&setTimeout(C,1e3)},C=()=>{if(!l||i!=="pc")return;let e=f("circle");if(e===null&&H()&&(e=f("cross")),e===null){const t=n.map((s,r)=>s===null?r:null).filter(s=>s!==null);t.length&&(e=t[Math.floor(Math.random()*t.length)])}e!==null&&q(e)},A=()=>{n.fill(null),I.forEach(e=>{e.classList.remove("cross","circle")}),i=Math.random()<.5?"user":"pc",l=!0,u(),M(!1),G(),i==="pc"&&setTimeout(C,1e3)},B=()=>A();document.addEventListener("click",e=>{const t=e.target;if(t.classList.contains("button")){const s=t.dataset.pos;l?N(t,s):P("Partida terminada. Reinicia el juego!")}});v.addEventListener("click",B);O.addEventListener("click",B);A();
