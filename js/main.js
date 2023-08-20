	/*----- constants -----*/
const secretWords = ['SPACEMAN', 'STARS', 'GALAXY', 'ALIENS', 'MILKYWAY', 'SPACESHIP', 'ASTRONAUT', 'PLANETS'];
const maxGuesses = 6;
/*----- state variables -----*/
let winner;
let word;
let lettersGuessed;

/*----- cached elements  -----*/
const bgPlayer = document.getElementById('bg-player');
const bgCheckbox = document.querySelector('input[type="checkbox"]');
bgPlayer.volume = .1;
const btnEls = [...document.querySelectorAll('#btns-container > button')];
// const imgPath = `imgs/spaceman-0${wrongGuesses.length}`;
const msgEl = document.querySelector('h1');
const playAgainBtn = document.querySelector('button');
const letters = document.querySelectorAll('#letters > div')

/*----- event listeners -----*/
bgCheckbox.addEventListener('change', renderMusic);
document.getElementById('btns-container').addEventListener('click', handleBtnClick);
// document.getElementById('letters').addEventListener('click', handleLetter);
playAgainBtn.addEventListener('click', init);
/*----- functions -----*/
init();

function init() {
  winner = null;
  render();
}


function render() {
  renderMusic();
  renderControls();

}

function renderControls() {
  playAgainBtn.style.visibility = winner ? 'visible' : 'hidden';
}

function selectWord() {
word = Math.floor(Math.random() * secretWords.length);
console.log(word);
}
selectWord();

function renderMusic() {
  bgCheckbox.checked ? bgPlayer.play() : bgPlayer.pause();
}

function handleBtnClick(evt) {
  const btn = evt.target;
  // Ensure that a button was clicked
  if (!btnEls.includes(btn)) return;
  curFrame = parseInt(btn.textContent);
  render();
}