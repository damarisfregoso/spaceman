	/*----- constants -----*/
const secretWords = ['Spaceman', 'Stars', 'Galaxy', 'In a world far far away', 'Aliens', 'MilkyWay', 'Shooting Stars', 'Astronaut', 'Big Dipper'];


/*----- state variables -----*/
let winner;
let results;

  
	/*----- cached elements  -----*/
  const bgPlayer = document.getElementById('bg-player');
  const bgCheckbox = document.querySelector('input[type="checkbox"]');
  bgPlayer.volume = .1;
  

	/*----- event listeners -----*/
  bgCheckbox.addEventListener('change', renderMusic);

	/*----- functions -----*/
  function renderMusic() {
    bgCheckbox.checked ? bgPlayer.play() : bgPlayer.pause();
  }