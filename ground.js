import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from './updateProperty.js';

const speed = 0.02;
const groundElems = document.querySelectorAll('[data-ground]');

export function setGround() {
  setCustomProperty(groundElems[0], '--left', 0);
  setCustomProperty(groundElems[1], '--left', 100);
}

export function updateGround(delta, scale) {
  groundElems.forEach((ground) => {
    incrementCustomProperty(ground, '--left', delta * speed * -1 * scale);

    if (getCustomProperty(ground, '--left') <= -100) {
      incrementCustomProperty(ground, '--left', 200);
    }
  });
}
