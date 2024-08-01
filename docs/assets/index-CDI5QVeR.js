(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const c of n)if(c.type==="childList")for(const a of c.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function o(n){const c={};return n.integrity&&(c.integrity=n.integrity),n.referrerPolicy&&(c.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?c.credentials="include":n.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(n){if(n.ep)return;n.ep=!0;const c=o(n);fetch(n.href,c)}})();const d="data:image/svg+xml,%3csvg%20width='25'%20height='25'%20viewBox='0%200%2025%2025'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M6.02286%2018.0689L18.0688%206.02295'%20stroke='%23545454'%20stroke-width='2.52379'/%3e%3cpath%20d='M6.02286%206.02286L18.0688%2018.0688'%20stroke='%23545454'%20stroke-width='2.52379'/%3e%3c/svg%3e",m="data:image/svg+xml,%3csvg%20width='18'%20height='18'%20viewBox='0%200%2018%2018'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='9'%20cy='9'%20r='7.66667'%20stroke='%23F2EBD3'%20stroke-width='2.66667'/%3e%3c/svg%3e",B=document.getElementById("user-score"),x=document.getElementById("pc-score"),p=document.getElementById("startmove"),v=document.getElementById("popup"),C=document.getElementById("popup-message"),A=document.querySelectorAll(".button"),k=document.getElementById("popup-ok-button"),s=Array(9).fill(null),h=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];let E=0,w=0,i=null,l=!0;const S=()=>{B.textContent=E,x.textContent=w},u=()=>{l?p.textContent=i==="user"?"Es tu turno":"Es el turno del ordenador":p.textContent="Partita terminata"},y=e=>{C.innerHTML=e,v.classList.remove("d-none")},O=()=>{v.classList.add("d-none")},f=e=>{setTimeout(()=>{let t="";e==="user"?(t=`
        <div class="popup-content">
          <img src="${d}" class="popup-image-cross" alt="Cross">
          <div class="winner-message">¡GANADOR!</div>
        </div>
      `,E++):e==="pc"?(t=`
        <div class="popup-content">
          <img src="${m}" class="popup-image" alt="Circle">
          <div class="winner-message">¡GANADOR!</div>
        </div>
      `,w++):t=`
        <div class="popup-content tie">
          <img src="${m}" class="popup-image" alt="Circle">
          <img src="${d}" class="popup-image-cross" alt="Cross">
        </div>
        <div class="tie-message">¡EMPATE!</div>
      `,y(t),S(),l=!1,u(),toggleRestartButton(!0)},100)},I=()=>h.some(([e,t,o])=>s[e]&&s[e]===s[t]&&s[e]===s[o]),T=()=>s.every(e=>e!==null),g=e=>{for(const[t,o,r]of h){if(s[t]===e&&s[o]===e&&s[r]===null)return r;if(s[t]===e&&s[r]===e&&s[o]===null)return o;if(s[o]===e&&s[r]===e&&s[t]===null)return t}return null},G=()=>Math.random()<.6,M=()=>{I()?f(i):T()?f(null):D()},R=(e,t)=>{!l||s[t]||i!=="user"||(L(e,t,"cross"),M())},$=e=>{const t=document.querySelector(`span[data-pos='${e}']`);t&&(L(t,e,"circle"),M())},L=(e,t,o)=>{e.classList.add(o),s[t]=o},D=()=>{i=i==="user"?"pc":"user",u(),i==="pc"&&setTimeout(P,1e3)},P=()=>{if(!l||i!=="pc")return;let e=g("circle");if(e===null&&G()&&(e=g("cross")),e===null){const t=s.map((o,r)=>o===null?r:null).filter(o=>o!==null);t.length&&(e=t[Math.floor(Math.random()*t.length)])}e!==null&&$(e)},b=()=>{s.fill(null),A.forEach(e=>{e.classList.remove("cross","circle")}),i=Math.random()<.5?"user":"pc",l=!0,u(),toggleRestartButton(!1),O(),i==="pc"&&setTimeout(P,1e3)},N=()=>b();document.addEventListener("click",e=>{const t=e.target;if(t.classList.contains("button")){const o=t.dataset.pos;l?R(t,o):y("Partida terminada. Reinicia el juego!")}});k.addEventListener("click",N);b();
