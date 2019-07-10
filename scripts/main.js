const cards = document.querySelectorAll(".game__card");
let revealedCards = [];

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

cards.forEach(cards => cards.addEventListener("click", reveal));