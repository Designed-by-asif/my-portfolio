const textElement = document.getElementById("typing-text");
const phrases = ["Graphic Designer", "UI/UX Designer"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentPhrase = phrases[phraseIndex];
    let typeSpeed = isDeleting ? 50 : 150;

    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 600;
    }
    setTimeout(type, typeSpeed);
}

let lastScrollY = window.scrollY;
const header = document.getElementById("main-header");

window.addEventListener("scroll", () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
        header.classList.add("nav-hidden");
    } else {
        header.classList.remove("nav-hidden");
    }
    lastScrollY = window.scrollY;
});

document.addEventListener("DOMContentLoaded", type);
// Fade-in animation for sections
const sections = document.querySelectorAll('section');

const observerOptions = {
  threshold: 0.1
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target); // animate only once
    }
  });
}, observerOptions);

sections.forEach(section => {
  sectionObserver.observe(section);
});