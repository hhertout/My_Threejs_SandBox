import { gsap } from "../../node_modules/gsap/all.js";

let menuClose = document.querySelector('.close-button');
let menuOpen = document.querySelector('.menu-button');

menuClose.addEventListener('click', () => {
    gsap.to('.menu-display', {
        yPercent: "-=100",
    })
})
menuOpen.addEventListener('click', () => {
    gsap.to('.menu-display', {
        yPercent: "+=100",
    })
})

