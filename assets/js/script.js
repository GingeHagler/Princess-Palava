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
