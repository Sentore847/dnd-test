/*!
 * Start Bootstrap - Heroic Features v5.0.6 (https://startbootstrap.com/template/heroic-features)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-heroic-features/blob/master/LICENSE)
 */
// This file is intentionally blank
// Use this file to add JavaScript to your project

// 1. При натисканні кнопки “Call to action”:
const button = document.querySelector(".btn");
const h1 = document.querySelector("h1.display-5.fw-bold");
const p = document.querySelector("p.fs-4");

const colors = [
  "var(--bs-red)",
  "var(--bs-orange)",
  "var(--bs-yellow)",
  "var(--bs-green)",
  "var(--bs-cyan)",
  "var(--bs-blue)",
  "var(--bs-purple)",
];

let isAnimation = false;
button.addEventListener("click", () => {
  if (isAnimation) return;

  isAnimation = true;

  //button
  let randColorFromArray = Math.floor(Math.random() * colors.length);
  let randomColor = colors[randColorFromArray];
  button.style.background = randomColor;
  button.style.border = `1px solid ${randomColor}`;

  //h1
  fetch("https://catfact.ninja/fact")
    .then((response) => response.json())
    .then((data) => {
      h1.textContent = data.fact;
    })
    .catch((error) => console.error("Error fetching data"));

  //text disapperaing animation
  let opacity = 1;
  const fadeOut = setInterval(() => {
    if (opacity <= 0) {
      clearInterval(fadeOut);
      isAnimation = false;
    } else {
      opacity -= 0.1;
      p.style.opacity = opacity;
    }
  }, 100);
});

// 2 Блоки Fresh new layout, Free to download... мають бути «драгабельні»
const cards = document.querySelectorAll(".card-body");
let draggedCard = null;

cards.forEach((card) => {
  const secondColors = [
    "red",
    "orange",
    "black",
    "cyan",
    "teal",
    "yellow",
    "green",
    "purple",
    "pink",
  ];
  const featureDivs = document.querySelectorAll(".feature.bg-primary");
  card.addEventListener("dragstart", (e) => {
    draggedCard = card;
    setTimeout(() => {
      card.style.display = "none";
    }, 0);
  });

  card.addEventListener("dragend", () => {
    setTimeout(() => {
      draggedCard.style.display = "block";
      draggedCard = null;
    }, 0);
  });

  card.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  card.addEventListener("dragenter", (e) => {
    e.preventDefault();
    card.style.border = "2px dashed #000";
  });

  card.addEventListener("dragleave", () => {
    card.style.border = "none";
    featureDivs.forEach((featureDiv) => {
      featureDiv.classList.remove("bg-primary");
      let randColorFromArray = Math.floor(Math.random() * secondColors.length);
      let randomColor = secondColors[randColorFromArray];
      featureDiv.style.background = `${randomColor}`;
    });
  });

  card.addEventListener("drop", () => {
    card.style.border = "none";
    if (draggedCard !== card) {
      const draggedParent = draggedCard.parentNode;
      const targetParent = card.parentNode;
      const draggedCardNext = draggedCard.nextSibling;

      targetParent.insertBefore(draggedCard, card.nextSibling);
      draggedParent.insertBefore(card, draggedCardNext);
    }
  });
});
