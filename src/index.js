import "./styles.css";
const board = document.querySelector(".game");
const holes = document.querySelectorAll(".hole");

//const moles = document.querySelectorAll(".mole");
let vie = 5;
let lvl = 1;
let lastHole;
let timeUp;
let vitMin = 1400;
let vitMax = 2800;

//Head Board
document.getElementById("app").innerHTML = `
<h2>Vie(s) &#9825 : <span class="vie"></span></h2><h2>Level: <span class="lvl"></span> </h2>
<button class="start">Start</button><button disabled class="next">Next lvl</button>
`;
//Button
let startButton = document.querySelector(".start");
let nextButton = document.querySelector(".next");

//Sound
let coin = new Audio("src/Coin_Sound.mp3"); // buffers automatically when created
let Bump = new Audio("src/Bump_Sound.mp3");
let startSound = new Audio("src/Mario_Sound_Effect.mp3");
let nextSound = new Audio("src/Woo_Hoo.mp3");
let endSound = new Audio("src/Game_Over.mp3");
//random time
function randTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

//Random trou
function randHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];

  if (hole === lastHole) {
    //si identique au dernier alors on relance
    return randHole(holes);
  }
  lastHole = hole;
  return hole;
}

//vitesse et animation du Mush
function peep() {
  const time = randTime(vitMin, vitMax);
  const hole = randHole(holes);
  hole.classList.add("up");
  //console.log("peep", time, hole);
  setTimeout(() => {
    let vieBoard = document.querySelector(".vie");
    let thend = document.querySelector(".thend");
    if (hole.classList.contains("up")) {
      Bump.play();
      vie = vie - 1;
      vieBoard.innerHTML = vie;
    }
    hole.classList.remove("up");

    if (vie < 0) {
      endSound.play();
      vieBoard.innerHTML = "Game Over";
      thend.style.top = "-90%";
      return;
    }
    console.log(vie);
    if (!timeUp) peep();
  }, time);
}

//gain onelife
function oneLife() {
  const time = randTime(vitMin, vitMax);
  const hole = randHole(holes);
  hole.classList.add("up2");
  //console.log("peep", time, hole);
  setTimeout(() => {
    let vieBoard = document.querySelector(".vie");
    let thend = document.querySelector(".thend");
    if (hole.classList.contains("up2")) {
      Bump.play();
    }
    hole.classList.remove("up2");

    if (vie < 0) {
      endSound.play();
      vieBoard.innerHTML = "Game Over";
      thend.style.top = "-90%";
      return;
    }
    //console.log(vie);
    if (!timeUp) peep();
  }, time);
}
//Start & setup game
startButton.addEventListener("click", () => {
  startSound.playbackRate = 1.2;
  startSound.play();
  startButton.disabled = true;
  const lvlBoard = document.querySelector(".lvl");
  let vieBoard = document.querySelector(".vie");
  let thend = document.querySelector(".thend");

  vieBoard.innerHTML = 5;
  thend.style.top = "90%";
  timeUp = false;
  vie = 5;
  lvl = 1;
  vitMin = 1400;
  vitMax = 2200;
  lvlBoard.innerHTML = lvl;
  // oneLife();
  peep();

  setTimeout(function () {
    oneLife();
  }, randTime(1500, 8000));

  setTimeout(() => {
    timeUp = true;
    startButton.disabled = false;
    if (vie >= 0) {
      lvl = lvl + 1;
      startButton.disabled = true;
      nextButton.disabled = false;
      lvlBoard.innerHTML = lvl;
    }
  }, 10000);
});

//Next LVL
nextButton.addEventListener("click", () => {
  const lvlBoard = document.querySelector(".lvl");
  nextSound.play();
  nextButton.disabled = true;
  timeUp = false;

  peep();
  setTimeout(function () {
    oneLife();
  }, randTime(1500, 8000));

  vitMax = vitMax / 1.2;
  vitMin = vitMin / 1.2;
  setTimeout(() => {
    timeUp = true;
    startButton.disabled = false;
    if (vie >= 0) {
      lvl = lvl + 1;
      startButton.disabled = true;
      nextButton.disabled = false;
      lvlBoard.innerHTML = lvl;
    }
  }, 10000);
});
//ecoute des events Plateau
board.addEventListener("click", (e) => {
  let vieBoard = document.querySelector(".vie");
  let thend = document.querySelector(".thend");
  // console.log(e.target.parentElement.classList);
  if (
    e.target.classList.contains("mole") &&
    e.target.parentElement.classList.contains("up")
  ) {
    coin.playbackRate = 2.2;
    coin.play();
    e.target.parentElement.classList.remove("up");
  } else if (
    e.target.classList.contains("mole") &&
    e.target.parentElement.classList.contains("up2")
  ) {
    coin.playbackRate = 2.2;
    coin.play();
    //console.log("vie", e.target.parentElement);
    vie = vie + 1;
    vieBoard.innerHTML = vie;
    e.target.parentElement.classList.remove("up2");
  } else {
    //console.log("Noooooo!");
    Bump.play();
    vie = vie - 1;
    vieBoard.innerHTML = vie;
    //console.log(vie);
  }
  if (vie < 0) {
    endSound.play();
    vieBoard.innerHTML = "Game Over";
    thend.style.top = "-90%";
  }
});
