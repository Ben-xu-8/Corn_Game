import {
  incrementCustomProperty,
  getCustomProperty,
  setCustomProperty,
} from './updateProperty.js';

const cornElem = document.querySelector('[data-corn]');

const jumpSpeed = 0.35;
const gravity = 0.001;
const cornFrameCount = 4;
const frameTime = 120;

let isJump;
let cornFrame;
let currentFrameTime;
let yVelocity;
export function setCorn() {
  isJump = false;
  cornFrame = 0;
  currentFrameTime = 0;
  yVelocity = 0;
  setCustomProperty(cornElem, '--bottom', 0);
  document.removeEventListener('keydown', onJump);
  document.addEventListener('keydown', onJump);
}

export function updateCorn(delta, scale) {
  handleRun(delta, scale);
  handleJump(delta);
}

function handleRun(delta, scale) {
  if (isJump) {
    cornElem.src = 'img/corn0.png';
    return;
  }
  if (currentFrameTime >= frameTime) {
    cornFrame = (cornFrame + 1) % cornFrameCount;
    cornElem.src = `img/corn${cornFrame}.png`;
    currentFrameTime -= frameTime;
  }
  currentFrameTime += delta * scale;
}

function handleJump(delta) {
  if (!isJump) return;

  incrementCustomProperty(cornElem, '--bottom', yVelocity * delta);

  if (getCustomProperty(cornElem, '--bottom') <= 0) {
    setCustomProperty(cornElem, '--bottom', 0);
    isJump = false;
  }
  yVelocity -= gravity * delta;
}

export function getCornRect() {
  return cornElem.getBoundingClientRect();
}

export function setChickenLose() {
  cornElem.src = 'img/corn1.png';
}

function onJump(e) {
  if (e.code !== 'Space' || isJump) return;
  yVelocity = jumpSpeed;
  isJump = true;
}
