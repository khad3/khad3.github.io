/* Typing Effect */
const text = "Khadley Wong";
let index = 0;

function typeEffect() {
  if (index < text.length) {
    document.querySelector(".typing").textContent += text.charAt(index);
    index++;
    setTimeout(typeEffect, 120);
  }
}
typeEffect();

/* Fade-in on Scroll */
const sections = document.querySelectorAll(".fade-in");

window.addEventListener("scroll", () => {
  sections.forEach(section => {
    const rect = section.getBoundingClientRect().top;
    if (rect < window.innerHeight - 100) {
      section.classList.add("show");
    }
  });
});
