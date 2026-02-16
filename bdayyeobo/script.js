/* LOADER */
window.onload = () => {
  document.getElementById("loader").style.display = "none";
};

/* TYPING */
const text = "Khadley Cyle Wong";
let i = 0;
(function type() {
  if (i < text.length) {
    document.querySelector(".typing").textContent += text[i++];
    setTimeout(type, 120);
  }
})();

/* FADE */
window.addEventListener("scroll", () => {
  document.querySelectorAll(".fade").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
});

/* CURSOR */
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});


