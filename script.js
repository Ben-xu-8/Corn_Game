import { setGround, updateGround } from './ground.js';
import { setCorn, updateCorn, getCornRect, setChickenLose } from './corn.js';
import { setChicken, updateChicken, getChickenRect } from './chicken.js';

const width = 100;
const height = 30;
const speed_increase = 0.00001;

const worldElem = document.querySelector('[data-world]');
const scoreElem = document.querySelector('[data-score]');
const startElem = document.querySelector('[data-startgame]');

setPixelScaleWorld();
window.addEventListener('resize', setPixelScaleWorld);
document.addEventListener('keydown', handleStart, { once: true });

let lastTime;
let scale;
let score;
function update(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }
  const delta = time - lastTime;
  updateGround(delta, scale);
  updateScale(delta);
  updateScore(delta);
  updateChicken(delta, scale);
  updateCorn(delta, scale);

  if (checkLose()) return handleLose();

  lastTime = time;
  window.requestAnimationFrame(update);
}

function checkLose() {
  const cornRect = getCornRect();
  return getChickenRect().some((rect) => isCollide(rect, cornRect));
}

function updateScale(delta) {
  scale += delta * speed_increase;
}

function updateScore(delta) {
  score += delta * 0.001;
  scoreElem.textContent = Math.floor(score);
}

function setSong() {
  var audio = new Audio('/img/itscorn.mp3');
  audio.play();
}

function handleStart() {
  lastTime = null;
  scale = 1;
  score = 0;
  setSong();
  setGround();
  setCorn();
  setChicken();
  startElem.classList.add('hide');
  window.requestAnimationFrame(update);
}

function handleLose() {
  setChickenLose();
  setTimeout(() => {
    document.addEventListener('keydown', handleStart, { once: true });
    startElem.classList.remove('hide');
  }, 100);
}

function isCollide(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
}

function setPixelScaleWorld() {
  let setPixelScaleWorld;
  if (window.innerWidth / window.innerHeight < width / height) {
    setPixelScaleWorld = window.innerWidth / width;
  } else {
    setPixelScaleWorld = window.innerHeight / height;
  }
  worldElem.style.width = `${width * setPixelScaleWorld}px`;
  worldElem.style.height = `${height * setPixelScaleWorld}px`;
}
