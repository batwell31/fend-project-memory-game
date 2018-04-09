const cardList = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
const gameDeck = document.querySelector("#game-deck");
const deck = document.querySelector("#deck");
let movesElement = document.querySelector('#moves');
const restart = document.querySelector('#restart');
const timerElement = document.querySelector('#timer');
const modal = document.getElementById('myModal');
let moves = 0;
let matches_found = 0;
let timer = new Timer();
let selectedCard1, selectedCard2 = null;

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

//calls these functions when the window loads.
window.onload = function () { 
    clearHtml();
    createHtml(true);
};

function createHtml(hide) {
    let shuffledCards = shuffle(cardList);
    for (var index = 0; index < shuffledCards.length; index++) {
        const card = document.createElement('li');
        if (!hide) {
            card.className = 'card open show';
        }
        else {
            card.className = 'card';
        }
        const cardType = document.createElement('i');
        cardType.className = 'fa ' + shuffledCards[index];
        card.appendChild(cardType);
        deck.appendChild(card);
    }
}

function clearHtml() {
    deck.innerHTML = '';
}

