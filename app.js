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
let gameButtonsFull = buttonsArray.concat(buttonsArray);

// Shuffle function from http://stackoverflow.com/a/2450976
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

gameButtonsFull = shuffle(gameButtonsFull);


// Id "game" is targeted in HTML, that's the place where the game will be created
const game = document.getElementById('game');

// section with cards (class="cards") is added
const cards = document.createElement('section');
cards.setAttribute('class', 'cards');
game.appendChild(cards); // Appends the created cards section to the game div as a child

/*@description: in order to add pictures in divs to the created section
of cards the code loopes over each item in buttonsArray*/
gameButtonsFull.forEach(item => {
  const button = document.createElement('div');   // Creates a div
  button.classList.add('button'); // Applies a button class to the created div
  button.dataset.name = item.name; //Applies data-name to the created div
  const buttonImage = document.createElement('div'); // Creates one more div
  buttonImage.classList.add('button_image'); // Applies button_image class to the created div
  buttonImage.style.backgroundImage = `url(${item.img})`; // Adds the background-image to the second div

  cards.appendChild(button); // Appends the <div class="button"></div> to the <div class="cards"></div>
  button.appendChild(buttonImage); // Appends the <div class="button_image"></div> to the <div class="button"></div>
});
