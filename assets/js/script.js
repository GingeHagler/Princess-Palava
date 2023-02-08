/**
 * General Game Variables
 */

const cards = document.querySelectorAll('.princess-card');
const moveContainer = document.querySelector(".moves");
const rules = document.getElementById('rules');
const modal = document.getElementById('modal');
const timeContainer = document.querySelector(".timer");
const MAX_MATCH = 8;
const modalBtn = document.getElementById("modalBtn");
const closeBtn = document.getElementById("closeBtn");

let gameOn = false;
let perfectMatch = 0;
let flippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let finalTime = "";

//events 
cards.forEach(card => card.addEventListener('click', flipcard));
shuffle();

modalBtn.addEventListener('click', showRules);
closeBtn.addEventListener('click', closeRules);


function showRules() {
    rules.style.display = "block";
}

function closeRules() {
    rules.style.display = "none";
}

/*
onclick function for cards 
*/
function flipCard() {
    if (!gameOn) {
        gameOn = true;
        timer();
    }
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!flippedCard) {
        flippedCard = true;
        firstCard = this;

        return;
    }

    secondCard = this;

    checkCardMatch();
}

/*
To check if first card and second card match
*/

function checkCardMatch() {
    let isMatch = firstCard.dataset.image === secondCard.dataset.image;
    if (isMatch) perfectMatch += 1;

    if (isMatch) pairMatch();
    else noMatch();

    if (perfectMatch === MAX_MATCH) winGame();
}

// when cards are paired they can no longer be clicked

function pairMatch() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

// board is locked if no match then cards reset

function noMatch() {
    lockBoard = true;


    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 900);

    addMove();
})

//move counter
moves = 0;
moveContainer.innerHTML = 0;

function addMove() {
    moves++;
    moveContainer.innerHtml = moves;
}

//timer
let time;
let minutes = 0;
let seconds = 0;
let timeStart = false;
timeContainer.innerHTML = "Time " + minutes + " : " + seconds;

function timer() {
    time = setInterval(function) {
        seconds++;
        if (seconds === 59) {
            minutes++;
            seconds = 0;
        }
        timeContainer.innerHTML = "Time " + minutes + " : " + seconds;
    }, 1000);
}

function stopTime() {
    clearInterval(time);
}

//reset all cards after every round

function resetBoard() {
    [flippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function winGame() {
    stopTime();
    showWinMessage();
}

// show winners message

function showWinMessage() {
    modal.style.display = "block";
    finalTime = timeContainer.innerHTML;

    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("totalTime").innerHTML = finalTime;
    reset();
}

window.onClick = function (event) {
    if (event.target.id == 'close') {
        document.getElementById('modal').style.display = "none";
    }
};

// card shuffle

function shuffle() {
    cards.forEach(cards => {
        let randomPosition = Math.floor(Math.random() * 16);
        cards.style.order = randomPosition;
    });
}

// new game button

function reset() {
    setTimeout(() => {
        flippedCard = false;
        [firstCard, secondCard] = [null, null];
        stopTime();
        gameOn = false;
        timeStart = false;
        seconds = 0;
        minutes = 0;
        timeContainer.innerHTML = "Timer 0.00";
        moves = 0;
        moveContainer.innerHTML = 0;
        perfectMatch = 0;
        cards.forEach(cardReset => cardReset.classList.remove('flip'));
        shuffle();
        cards.forEach(card => card.addEventListener('click', flipCard));

    }, 500);
}