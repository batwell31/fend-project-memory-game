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

timer.addEventListener('secondsUpdated', function (evt) {
    timerElement.innerHTML = timer.getTimeValues().toString();
});

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

//creates the HTML that makes up the Game Deck
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

//this changes the stars based on how many moves(clicks) you make!
function starRating() {
    let star1 = document.querySelector('#star1');
    let star2 = document.querySelector('#star2');
    let star3 = document.querySelector('#star3');
    if (moves >= 40) {
        star1.className = 'fa fa-star';
        star2.className = 'fa fa-star-o';
        star3.className = 'fa fa-star-o';
    }
    else if (moves >= 25) {
        star1.className = 'fa fa-star';
        star2.className = 'fa fa-star';
        star3.className = 'fa fa-star-o';
    }
    else {
        star1.className = 'fa fa-star';
        star2.className = 'fa fa-star';
        star3.className = 'fa fa-star';
    }
}

//changes the stars based on moves(clicks) for the modal popup window.
function endStarRating() {
    if (moves >= 40) {
        endStar1.className = 'fa fa-star';
        endStar2.className = 'fa fa-star-o';
        endStar3.className = 'fa fa-star-o';
    }
    else if (moves >= 25) {
        endStar1.className = 'fa fa-star';
        endStar2.className = 'fa fa-star';
        endStar3.className = 'fa fa-star-o';
    }
    else {
        endStar1.className = 'fa fa-star';
        endStar2.className = 'fa fa-star';
        endStar2.className = 'fa fa-star';
    }
}

//resets star rating when you press the restart button!
function resetStarRating() {
    star1.className = 'fa fa-star';
    star2.className = 'fa fa-star';
    star3.className = 'fa fa-star';
}

//will listen for a click on the restart(refresh) icon on screen
//and call these functions.
restart.addEventListener('click', function (evt) {
    const restart = document.querySelector('#restart');
    clearHtml();
    createHtml(true);
    timer = new Timer();
    timerElement.innerHTML = "00:00:00";
    matches_found = 0;
    resetStarRating();
    selectedCard1 = null;
    selectedCard2 = null;
});

function setSelectedCard(card) {
    if (!selectedCard1) {
        selectedCard1 = card;
        selectedCard1.className = "card open show";
    }
    else if (!selectedCard2) {
        selectedCard2 = card;
        selectedCard2.className = "card open show";
    }
}

function checkClickValidity(card) {
    if (card.nodeName !== 'LI') {
        return false;
    }

    if (card.className.includes("match")) {
        return false;
    }

    if (clickLock) {
        return false;
    }
    return true;
}

function updateMoves(increment, clear) {
    if (increment) {
        moves++;
        starRating();
        endStarRating();
    }
    if (clear) {
        moves = 0;
    }

    movesElement.innerHTML = moves;
}