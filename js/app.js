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
let clickLock = false;

//Adds an EventListener to the timer to get the time values!
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

//Clears out the HTML from the Game Deck!
function clearHtml() {
    deck.innerHTML = '';
    updateMoves(false, true);
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

//checks validity of the cards so you're not clicking on cards 
//that are matched or open!
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

deck.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (!checkClickValidity(evt.target)) {
        return;
    }

    if (timer.getTimeValues().seconds === 0) {
        timer.start()
    }
    updateMoves(true, false);
    var card = evt.target;
    setSelectedCard(card);
    if (selectedCard1 && selectedCard2) {
        var cardType1 = selectedCard1.children[0];
        var cardType2 = selectedCard2.children[0];
        if (cardType1.className === cardType2.className) {
            //we have a match don't reset
            cardType1.className = cardType1.className + " match";
            cardType2.className = cardType2.className + " match";
            matches_found++;
            if (matches_found === 8) {
                winCondition();
            }

            selectedCard1 = null;
            selectedCard2 = null;
        }
        else {
            //we don't have a match
            clickLock = true;
            setTimeout(function () {
                selectedCard1.className = "card";
                selectedCard2.className = "card";
                selectedCard1 = null;
                selectedCard2 = null;
                clickLock = false;
            }, 650);
        }
    }
});

//function to be ran when you find all 8 matches!!
function winCondition() {
    let winDiv = document.querySelector('#modal-footer');
    let endTime = document.querySelector('#endTime');
    let endMoves = document.querySelector('#endMoves');
    const endRestart = document.querySelector('#endRestart');
    modal.style.display = "block";
    endTime.innerHTML = timer.getTimeValues().seconds;
    timer.stop();
    endMoves.innerHTML = moves;
    endRestart.addEventListener('click', function (evt) {
        modal.style.display = "none";
        clearHtml();
        createHtml(true);
        timerElement.innerHTML = "00:00:00";
        timer = new Timer();
        matches_found = 0;
        resetStarRating();
        selectedCard1 = null;
        selectedCard2 = null;
    });
}
