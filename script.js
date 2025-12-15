/* LOADER */
window.onload = () => document.getElementById("loader").style.display="none";

/* TYPING */
const text="Khadley Wong";
let i=0;
(function type(){
 if(i<text.length){
  document.querySelector(".typing").textContent+=text[i++];
  setTimeout(type,120);
 }
})();

/* FADE */
document.addEventListener("scroll",()=>{
 document.querySelectorAll(".fade").forEach(e=>{
  if(e.getBoundingClientRect().top<window.innerHeight-100)
   e.classList.add("show");
 });
});

/* MODAL */
function openModal(title){
 document.getElementById("modal").style.display="flex";
 document.getElementById("modalTitle").innerText=title;
}
function closeModal(){
 document.getElementById("modal").style.display="none";
}

/* CURSOR */
const cursor=document.querySelector(".cursor");
document.addEventListener("mousemove",e=>{
 cursor.style.left=e.clientX+"px";
 cursor.style.top=e.clientY+"px";
});

/* EMAILJS */
emailjs.init("YOUR_PUBLIC_KEY");
document.getElementById("contactForm").addEventListener("submit",e=>{
 e.preventDefault();
 emailjs.sendForm("SERVICE_ID","TEMPLATE_ID",e.target)
 .then(()=>alert("Message Sent!"));
});

/* THEME */
document.getElementById("themeToggle").onclick=()=>{
 document.body.classList.toggle("light");
 document.body.classList.toggle("dark");
};
