/**
 * Game Variables 
 */

const card = document.getElementsByClassName("princess-card");

card.addEventListener("click", flipCard);

function flipCard() {
    card.classList.toggle("flipCard");
}

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockboard) {return};
    if (this === firstCard) {return};

    this.clasList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unFlipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.clasList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    
    }, 1500);
}

function resetBoard() {
    hasFlippedCard = lockBoard = false;
    firstCard = secondCard = null;
}

// shuffle elements
    cards.forEach(card => {
        const randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });

cards.forEach(card => card.addEventListener('click', flipCard));

