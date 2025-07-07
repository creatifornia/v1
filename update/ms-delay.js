document.addEventListener("DOMContentLoaded",(function(){const e=document.querySelectorAll("[ms-code-delay]"),n=document.getElementById("open");e.forEach((e=>{e.style.visibility="hidden"})),setTimeout((function(){let t=0;e.forEach((i=>{i.style.visibility="visible",i.style.opacity="0",i.style.animation="fadeIn 0.5s",i.addEventListener("animationend",(function o(){i.style.opacity="1",i.removeEventListener("animationend",o),t++,t===e.length&&n&&(console.log("🎯 Todas las animaciones completadas. Haciendo clic en #open..."),n.click())}))}))}),1500)}));


