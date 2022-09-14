import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from './updateProperty.js';

const speed = 0.02;
const CHICKEN_INTERVAL_MIN = 1000;
const CHICKEN_INTERVAL_MAX = 4000;
const worldElem = document.querySelector('[data-world]');

let nextChickenTime;
export function setChicken() {
  nextChickenTime = CHICKEN_INTERVAL_MIN;
  document.querySelectorAll('[data-chicken]').forEach((chicken) => {
    chicken.remove();
  });
}
export function updateChicken(delta, scale) {
  document.querySelectorAll('[data-chicken]').forEach((chicken) => {
    incrementCustomProperty(chicken, '--left', delta * scale * speed * -1);
    if (getCustomProperty(chicken, '--left') <= -100) {
      chicken.remove();
    }
  });
  if (nextChickenTime <= 0) {
    createChicken();
    nextChickenTime =
      randomNumber(CHICKEN_INTERVAL_MIN, CHICKEN_INTERVAL_MAX) / scale;
  }
  nextChickenTime -= delta;
}

export function getChickenRect() {
  return [...document.querySelectorAll('[data-chicken]')].map((chicken) => {
    return chicken.getBoundingClientRect();
  });
}

function createChicken() {
  const chicken = document.createElement('img');
  chicken.dataset.chicken = true;
  chicken.src = 'img/chicken.png';
  chicken.classList.add('chicken');
  setCustomProperty(chicken, '--left', 100);
  worldElem.append(chicken);
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
