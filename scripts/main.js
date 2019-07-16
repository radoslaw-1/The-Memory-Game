const cards = document.querySelectorAll(".game__card");
const menu = document.querySelector(".menu");
const buttons = document.querySelectorAll(".button");
const start = document.querySelector(".menu__start");
const game = document.querySelector(".game");
const buttonHard = document.querySelector(".menu__difficulty_hard");
const buttonDogs = document.querySelector(".menu__deck_dogs");
let revealedCards = new Array();
let cardNumbers = new Array();
let originalOrder = new Object();
let loopNumber = 0;
let difficulty;

const deckInfo = {
    dogs: [
        {   "number" : "game__card_1",
            "src" : "img/dog-1.jpg",
            "photographer" : "@reckziegel"
        },
        {   "number" : "game__card_2",
            "src" : "img/dog-2.jpg",
            "photographer" : "@ciabattespugnose"
        },
        {   "number" : "game__card_3",
            "src" : "img/dog-3.jpg",
            "photographer" : "@charlesdeluvio"
        },
        {   "number" : "game__card_4",
            "src" : "img/dog-4.jpg",
            "photographer" : "@erdaest"
        },
        {   "number" : "game__card_5",
            "src" : "img/dog-5.jpg",
            "photographer" : "@kimtheris"
        },
        {   "number" : "game__card_6",
            "src" : "img/dog-6.jpg",
            "photographer" : "@ipet_photo"
        }
    ],
    cats: [
        {   "number" : "game__card_1",
            "src" : "img/cat-1.jpg",
            "photographer" : "@miklevasilyev"
        },
        {   "number" : "game__card_2",
            "src" : "img/cat-2.jpg",
            "photographer" : "@ivanjevtic"
        },
        {   "number" : "game__card_3",
            "src" : "img/cat-3.jpg",
            "photographer" : "@madhatterzone"
        },
        {   "number" : "game__card_4",
            "src" : "img/cat-4.jpg",
            "photographer" : "@nrly"
        },
        {   "number" : "game__card_5",
            "src" : "img/cat-5.jpg",
            "photographer" : "@thesollers"
        },
        {   "number" : "game__card_6",
            "src" : "img/cat-6.jpg",
            "photographer" : "@zoegayah"
        }
    ]
};

function randomizeOrder(){
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
        if(loopNumber === 12) {
            loopNumber = 0;
        };
    });   
};

function select(){
    if(!this.classList.contains("button_selected")){
        this.classList.toggle("button_selected");
        if(this.nextElementSibling !== null){
            this.nextElementSibling.classList.toggle("button_selected");
        } else {
            this.previousElementSibling.classList.toggle("button_selected");
        };
    };
};

function newGame(){
    if(buttonHard.classList.contains("button_selected")){
        cards.forEach(card => {
            card.style.display = "block";
        });
        document.querySelector(".game").style.gridTemplateColumns = "repeat(4,1fr)";
        difficulty = "hard";
    } else {
        cards.forEach(card => {
            card.style.display = "block";
            if(card.firstElementChild.classList.contains("game__card_4") || card.firstElementChild.classList.contains("game__card_5") || card.firstElementChild.classList.contains("game__card_6")){
                card.style.display = "none";
            };
            difficulty = "easy";
        });
        document.querySelector(".game").style.gridTemplateColumns = "repeat(3,1fr)";
    };
    if(buttonDogs.classList.contains("button_selected")){
        cards.forEach(card => {
            Object.keys(deckInfo.dogs).forEach(key => {
                if(card.children[0].classList[1] === deckInfo.dogs[key].number){
                    card.firstElementChild.src = deckInfo.dogs[key].src;
                    card.children[2].innerHTML = deckInfo.dogs[key].photographer;
                };
            });
        });
    } else {
        cards.forEach(card => {
            Object.keys(deckInfo.cats).forEach(key => {
                if(card.children[0].classList[1] === deckInfo.cats[key].number){
                    card.firstElementChild.src = deckInfo.cats[key].src;
                    card.children[2].innerHTML = deckInfo.cats[key].photographer;
                };   
            });
        });
    };
    menu.style.opacity = 0;
    setTimeout(function(){
        menu.style.display = "none";
    }, 500);
};

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
    gameWon();
};

function gameWon(){
    if(difficulty === "hard" && game.children.length === document.querySelectorAll(".turned").length){
        showMenu();
    } else if (difficulty === "easy" && game.children.length/2 === document.querySelectorAll(".turned").length) {
        showMenu();
    };
};

function showMenu(){
    menu.style.display = "grid";
    start.removeEventListener("click", newGame);
    setTimeout(function(){
        menu.style.opacity = 1;
    }, 500);
    setTimeout(function(){
        cards.forEach(card => {
            if(card.classList.contains("turned")){
                card.classList.remove("turned");
            };
        });
        randomizeOrder();
    }, 1000);
    setTimeout(function(){
        start.addEventListener("click", newGame);
    }, 1350);
};

buttons.forEach(buttons => buttons.addEventListener("click", select));

start.addEventListener("click", newGame);

cards.forEach(cards => cards.addEventListener("click", reveal));

randomizeOrder();