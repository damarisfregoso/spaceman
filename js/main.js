	/*----- constants -----*/
const secretWords = ['SPACEMAN', 'STARS', 'GALAXY', 'ALIENS', 'MILKYWAY', 'SPACESHIP', 'ASTRONAUT', 'PLANETS', 'BIG DIPPER', 'MULTIVERSE', 'SHOOTING STARS', 'ROCKET'];
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
const imgEl = document.querySelector('img');
const msgEl = document.getElementById('subhead');
const playAgainBtn = document.getElementById('play-again');
const letterBtns = document.querySelectorAll('#letters > button');
const wordDisplay = document.getElementById('word-display');
const displayGuesses = document.getElementById('displayGuesses');

/*----- event listeners -----*/
bgCheckbox.addEventListener('change', renderMusic);
document.getElementById('letters').addEventListener('click', handleBtnClick);
playAgainBtn.addEventListener('click', init);

/*----- functions -----*/
init();

function init() {
  winner = null;
  wordSelected = secretWords[Math.floor(Math.random() * secretWords.length)];
  wrongGuessed = [];
  let word = wordSelected.split('');
  guess = word.map(ltr => ltr === ' ' ? ' ' : '_').join('');
  render();
}

function render() {
  renderMusic();
  renderControls();
  renderButtons();
  renderGuessesLeft();
  renderMesssage();
  const imgPath = `imgs/spaceman-${wrongGuessed.length}.png`;
  imgEl.src = imgPath;
  wordDisplay.innerHTML = guess;
}

function renderMesssage() {
  if (winner === 'W') {
    msgEl.innerHTML = 'You Guessed It Correct!';
  } else if (winner === 'L') {
    msgEl.innerHTML = `The word was ${wordSelected}!`;
  } else {
    msgEl.innerHTML = 'Guess A Letter!';
  }
}

function renderGuessesLeft() {
  if (winner === null) {
    displayGuesses.innerHTML = `${maxGuesses - wrongGuessed.length} Guesses Left!`;
  } else if (winner === 'L') {
    displayGuesses.innerHTML = 'Sorry you are all out turns!';
  } else {
    displayGuesses.innerHTML = `You got it with ${maxGuesses - wrongGuessed.length} Guesses Left!`;
  }
}

function renderControls() {
  playAgainBtn.style.visibility = winner ? 'visible' : 'hidden';
}

function renderButtons() {
  letterBtns.forEach(function(btn) {
    letter = btn.innerHTML;
    if (guess.includes(letter)) {
      btn.style.backgroundColor = 'black';
      btn.style.color = 'rgb(131, 255, 134)';
    } else if (wrongGuessed.includes(letter)) {
      btn.style.backgroundColor = 'black';
      btn.style.color = 'rgb(255, 131, 131)';
    } else {
      //resets for play again 
      btn.style.backgroundColor = 'rgb(199, 199, 255)';
      btn.style.color = 'black';
    }
  })
}

function renderMusic() {
  bgCheckbox.checked ? bgPlayer.play() : bgPlayer.pause();
}

function handleBtnClick(evt) {
  //get the clicked letter 
  const letter = evt.target.innerText;
  //guard to determine whether to proceed with the function 
  if (evt.target.tagName !== 'BUTTON' || guess.includes(letter) || wrongGuessed.includes(letter) || winner) return;
  if (wordSelected.includes(letter)) {
    //correct guess update the guess with the newly guessed letters
    let newGuess = '';
    //this allows an iterable to be into it's own indiviual element 
    const wordArr = [...wordSelected];
    wordArr.forEach(function(char, charIdx) {
      if (char === letter) {
        newGuess += letter; //appends the letter to the newGuess string
      } else {
        newGuess += guess.charAt(charIdx); // keep the exisiting guessed letters 
      }
    });
    guess = newGuess; // updated guess to the newly constructed string
  } else {
    //incorrect guess
    wrongGuessed.push(letter);
  }
  winner = getWinner()
  render();
}

function getWinner() {
  if (guess === wordSelected) return 'W';
  if (wrongGuessed.length === maxGuesses) return 'L';
  return null;
}