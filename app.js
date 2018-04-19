"use strict";
var buttonsArray = [
    { name: "hand", img: "images/cards/1.svg" },
    { name: "turtle", img: "images/cards/2.svg" },
    { name: "drum", img: "images/cards/3.svg" },
    { name: "arrow", img: "images/cards/4.svg" },
    { name: "bird", img: "images/cards/5.svg" },
    { name: "circle", img: "images/cards/6.svg" },
    { name: "lizard", img: "images/cards/7.svg" },
    { name: "eagle", img: "images/cards/8.svg" }
  ],
  game = document.getElementById("game"),
  cards = document.createElement("section");
cards.setAttribute("class", "cards"),
  game.appendChild(cards),
  (document.body.onload = gameStart());
function gameStart() {
  var a = buttonsArray.concat(buttonsArray);
  a.sort(function() {
    return 0.5 - Math.random();
  }),
    a.forEach(function(b) {
      var c = document.createElement("div");
      c.classList.add("button"), (c.dataset.name = b.name);
      var d = document.createElement("div");
      d.classList.add("front");
      var e = document.createElement("div");
      e.classList.add("button_image"),
        (e.style.backgroundImage = "url(" + b.img + ")"),
        cards.appendChild(c),
        c.appendChild(d),
        c.appendChild(e);
    });
}
var starOne = document.getElementById("starOne"),
  starTwo = document.getElementById("starTwo"),
  movesNumber = 0,
  moves = document.querySelector(".moves");
function moveCounter() {
  movesNumber++,
    (moves.innerHTML = movesNumber),
    1 == movesNumber && ((second = 0), (minute = 0), (hour = 0), startTimer()),
    9 < movesNumber && 16 > movesNumber
      ? (starOne.style.opacity = "0")
      : 17 < movesNumber && (starTwo.style.opacity = "0");
}
var second = 0,
  minute = 0,
  hour = 0,
  timer = document.querySelector(".timer"),
  interval = void 0;
function startTimer() {
  interval = setInterval(function() {
    (timer.innerHTML = hour + ":" + minute + ":" + second),
      second++,
      60 == second && (minute++, (second = 0)),
      60 == minute && (hour++, (minute = 0));
  }, 1e3);
}
var clicksCount = 0,
  firstGuess = "",
  secondGuess = "",
  previousButton = null,
  correctMatch = 0,
  modal = document.getElementById("modal"),
  match = function() {
    if ((correctMatch++, console.log(correctMatch), 8 === correctMatch)) {
      clearInterval(interval),
        (finalTime = timer.innerHTML),
        modal.classList.add("visible");
      var a = document.getElementById("modalStarTwo"),
        b = document.getElementById("modalStarOne");
      9 < movesNumber && 16 > movesNumber
        ? (b.style.opacity = "0")
        : 17 < movesNumber &&
          ((a.style.opacity = "0"), (b.style.opacity = "0")),
        (document.getElementById("finalMove").innerHTML = movesNumber),
        (document.getElementById("totalTime").innerHTML = finalTime);
    }
    var c = document.querySelectorAll(".selected");
    c.forEach(function(e) {
      e.classList.add("match");
    });
    var d = document.querySelectorAll(".cursor");
    d.forEach(function(e) {
      e.classList.add("cursor-fixed");
    });
  },
  resetGuesses = function() {
    (firstGuess = ""),
      (secondGuess = ""),
      (clicksCount = 0),
      (previousButton = null);
    var a = document.querySelectorAll(".selected");
    a.forEach(function(c) {
      c.classList.remove("selected");
    });
    var b = document.querySelectorAll(".cursor");
    b.forEach(function(c) {
      c.classList.remove("cursor");
    });
  };
game.addEventListener("click", function(a) {
  var b = a.target;
  "SECTION" === b.nodeName ||
    b === previousButton ||
    b.parentNode.classList.contains("selected") ||
    b.parentNode.classList.contains("match") ||
    (2 > clicksCount &&
      (clicksCount++,
      1 == clicksCount
        ? ((firstGuess = b.parentNode.dataset.name),
          console.log(firstGuess),
          b.parentNode.classList.add("selected"),
          b.classList.add("cursor"))
        : ((secondGuess = b.parentNode.dataset.name),
          console.log(secondGuess),
          b.parentNode.classList.add("selected"),
          b.classList.add("cursor"),
          moveCounter()),
      firstGuess &&
        secondGuess &&
        (firstGuess == secondGuess && setTimeout(match, 1e3),
        setTimeout(resetGuesses, 1e3)),
      (previousButton = b)));
});
function resetAll() {
  (correctMatch = 0),
    (firstGuess = ""),
    (secondGuess = ""),
    (clicksCount = 0),
    (previousButton = null),
    (starOne.style.opacity = "1"),
    (starTwo.style.opacity = "1"),
    (movesNumber = 0),
    (moves.innerHTML = movesNumber),
    (second = 0),
    (minute = 0),
    (hour = 0),
    (timer.innerHTML = hour + ":" + minute + ":" + second),
    (cards.innerHTML = ""),
    gameStart();
}
function closeModal() {
  modal.classList.remove("visible"), resetAll();
}
