// Array with objects, containing images for memmory game
const buttonsArray = [
  {
    name: 'hand',
    img: 'images/cards/1.svg',
  },
  {
    name: 'turtle',
    img: 'images/cards/2.svg',
  },
  {
    name: 'drum',
    img: 'images/cards/3.svg',
  },
  {
    name: 'arrow',
    img: 'images/cards/4.svg',
  },
  {
    name: 'bird',
    img: 'images/cards/5.svg',
  },
  {
    name: 'circle',
    img: 'images/cards/6.svg',
  },
  {
    name: 'lizard',
    img: 'images/cards/7.svg',
  },
  {
    name: 'eagle',
    img: 'images/cards/8.svg',
  }
];

// Dublicates buttonsArray and makes one full viariable with 8 pairs of buttons
let fullButtonsArray = buttonsArray.concat(buttonsArray);

// My variables
let clicksCount = 0;
let firstGuess = '';
let secondGuess = '';
let previousButton = null;
let delay = 1000;

// Id "game" is targeted in HTML, that's the place where the game will be created
const game = document.getElementById('game');
const cards = document.createElement('section'); // Section with cards (class="cards") is added
cards.setAttribute('class', 'cards');
game.appendChild(cards);

//My functions
// @description: Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

fullButtonsArray = shuffle(fullButtonsArray); // Runs shuffle function for the created array

/*@description: in order to add pictures in divs to the created section
of cards the code loopes over each item in fullButtonsArray array*/
fullButtonsArray.forEach(item => {
  const button = document.createElement('div');   // Creates a div
  button.classList.add('button'); // Applies a button class to the created div
  button.dataset.name = item.name; //Applies data-name to the created div

  const front = document.createElement('div'); // Creates div with class front
  front.classList.add('front')

  const buttonImage = document.createElement('div'); // Creates next div
  buttonImage.classList.add('button_image'); // Applies button_image class to the created div
  buttonImage.style.backgroundImage = `url(${item.img})`; // Adds the background-image to the second div

  cards.appendChild(button); // Appends the <div class="button"></div> to the <div class="cards"></div>
  button.appendChild(front);
  button.appendChild(buttonImage); // Appends the <div class="button_image"></div> to the <div class="button"></div>
});

/*@description: adds class "match" to the div with class "selected"*/
const match = () => {
  const selected = document.querySelectorAll('.selected');
  selected.forEach(button => {
    button.classList.add('match');
  });
};

const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  clicksCount = 0;
  previousButton = null;

  const selected = document.querySelectorAll('.selected');
  selected.forEach(button => {
    button.classList.remove('selected');
  });
};

/*@description: event listener is applied for the whole game section to wait
for clicks, assign selected classes and look for matches*/
game.addEventListener('click', event => {

  const clicked = event.target;

  if (
    clicked.nodeName === 'SECTION' ||
    clicked === previousButton ||
    clicked.parentNode.classList.contains('selected') ||
    clicked.parentNode.classList.contains('match')
  ) {
    return;
  }

  if (clicksCount < 2) {
    clicksCount++;
    if (clicksCount === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousButton = clicked;
  }

});
