	/*----- constants -----*/
const secretWords = ['SPACEMAN', 'STARS', 'GALAXY', 'ALIENS', 'MILKYWAY', 'SPACESHIP', 'ASTRONAUT', 'PLANETS'];
const maxGuesses = 6;
/*----- state variables -----*/
let winner;
let wordSelected;
let wrongGuessed;
let guess; //correct guesses

/*----- cached elements  -----*/
const bgPlayer = document.getElementById('bg-player');
const bgCheckbox = document.querySelector('input[type="checkbox"]');
bgPlayer.volume = .1;
// const btnEls = [...document.querySelectorAll('#btns-container > button')];

const imgEl = document.querySelector('img');
const msgEl = document.getElementById('subhead');
const playAgainBtn = document.getElementById('play-again');
const letterBtns = document.querySelectorAll('#letters > button');
const wordDisplay = document.getElementById('word-display');
const displayGuesses = document.getElementById('displayGuesses')

/*----- event listeners -----*/
bgCheckbox.addEventListener('change', renderMusic);
// document.getElementById('btns-container').addEventListener('click', handleBtnClick);
document.getElementById('letters').addEventListener('click', handleBtnClick);
playAgainBtn.addEventListener('click', init);
/*----- functions -----*/
init();

function init() {
  winner = null;
  wordSelected = secretWords[Math.floor(Math.random() * secretWords.length)];
  wrongGuessed = [];
  guess = "_".repeat(wordSelected.length);
  render();
}


function render() {
  renderMusic();
  renderControls();
  renderButtons();
  renderGuessesLeft();
  const imgPath = `imgs/spaceman-${wrongGuessed.length}.jpg`;
  imgEl.src = imgPath;
  wordDisplay.innerHTML = guess;
}

function renderGuessesLeft() {
  if (wrongGuessed.length) {
    maxGuesses = maxGuesses 
  }
}

function renderControls() {
  playAgainBtn.style.visibility = winner ? 'visible' : 'hidden';
}

function renderButtons() {
  letterBtns.forEach(function(btn) {
    letter = btn.innerHTML;
    if (guess.includes(letter)) {
      btn.style.backgroundColor = 'green';
      // btn.style.color = 'rgb(131, 255, 134)'
    } else if (wrongGuessed.includes(letter)) {
      btn.style.backgroundColor = 'red';
      // btn.style.color = 'rgb(255, 131, 131)'
    } else {
      //resets for play again 
      btn.style.backgroundColor = 'rgb(199, 199, 255)';
    }
  })
}

function renderMusic() {
  bgCheckbox.checked ? bgPlayer.play() : bgPlayer.pause();
}

function handleBtnClick(evt) {
  const letter = evt.target.innerText;
  if (evt.target.tagName !== 'BUTTON' || guess.includes(letter) || wrongGuessed.includes(letter) || winner) return;
  if (wordSelected.includes(letter)) {
    //correct guess
    let newGuess = '';
    const wordArr = [...wordSelected];
    wordArr.forEach(function(char, charIdx) {
      if (char === letter) {
        newGuess += letter;
      } else {
        newGuess += guess.charAt(charIdx);
      }
    });
    guess = newGuess;
  } else {
    //incorrect guess
    wrongGuessed.push(letter);
  }
  winner = getWinner()
  render();
}

function getWinner() {
  if (guess === wordSelected) return 'W';
  if (wrongGuessed.length === maxGuesses) return 'L'
  return null;
}