const cards = document.querySelectorAll(".game__card");
let revealedCards = new Array();
let cardNumbers = new Array();
let originalOrder = new Object();
let loopNumber = 0;

function reveal(){
    if(this.classList.contains("turned")){
        return;
    };
    this.classList.toggle("turned");
    revealedCards.push(this);
    if(revealedCards.length === 2) {
        if(revealedCards[0].firstElementChild.classList[1] === revealedCards[1].firstElementChild.classList[1]){
            revealedCards = [];
        } else {
            cards.forEach(cards => cards.removeEventListener("click", reveal));
            setTimeout(function(){
                revealedCards[0].classList.toggle("turned");
                revealedCards[1].classList.toggle("turned");
                revealedCards = [];
                cards.forEach(cards => cards.addEventListener("click", reveal));
            }, 1000);
        };
    };
};

cards.forEach(function(){
    loopNumber += 1;
    cardNumbers.push(loopNumber-1);
    if (loopNumber === 12) {
        loopNumber = 0;
    };
});

cards.forEach(function(){
    loopNumber += 1;
    originalOrder["card"+loopNumber] = cards[loopNumber-1].innerHTML;
    if(loopNumber === 12) {
        loopNumber = 0;
    };
});

cards.forEach(function(){
    loopNumber += 1;
    let randomNumber = cardNumbers[Math.floor(Math.random() * cardNumbers.length)];
    let numberPosition = cardNumbers.indexOf(randomNumber);
    cardNumbers.splice(numberPosition, 1);
    cards[randomNumber].innerHTML = originalOrder[Object.keys(originalOrder)[loopNumber-1]];
});

cards.forEach(cards => cards.addEventListener("click", reveal));