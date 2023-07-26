
var dealerSum = 0;
var yourSum = 0;

var dealerAceCount = 0;
var yourAceCount = 0; 

var hidden; // line 43
var deck; // line 22

var canHit = true; //allows the player (you) to draw while yourSum <= 21

window.onload = function() {
    buildDeck(); // line 19 to line 30
    shuffleDeck(); // line 32 to line 40
    startGame(); // line 42 to line 72
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = []; // line 9

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]); //A-C -> K-C, A-D -> K-D
        }
    }
     //console.log(deck);
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length); // (0-1) * 52 => (0-51.9999)
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

function startGame() {
    hidden = deck.pop(); // line 8
    dealerSum += getValue(hidden); // line 122
    dealerAceCount += checkAce(hidden); // line 135
    //console.log(hidden);
    //console.log(dealerSum);
    while (dealerSum < 17) {
        //<img src="./cards/4-C.png">
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    console.log(dealerSum);

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
    }

    console.log(yourSum);
    document.getElementById("hit").addEventListener("click", hit); // line 74 to line 90
    document.getElementById("stay").addEventListener("click", stay); // line 92 to line 120

}

function hit() { // line 69
    if (!canHit) { // line 11
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);

    if (reduceAce(yourSum, yourAceCount) > 21) { // line 142 to line 148 == //A, J, 8 -> 1 + 10 + 8
        canHit = false;
    }

}

function stay() { // line 70
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";

    let message = "";
    if (yourSum > 21) {
        message = "You Lose!";
    }
    else if (dealerSum > 21) {
        message = "You win!";
    }
    //both you and dealer <= 21
    else if (yourSum == dealerSum) {
        message = "Tie!";
    }
    else if (yourSum > dealerSum) {
        message = "You Win!";
    }
    else if (yourSum < dealerSum) {
        message = "You Lose!";
    }

    document.getElementById("dealer-sum").innerText = dealerSum; // index.html == line 12
    document.getElementById("your-sum").innerText = yourSum; // index.html == line 18
    document.getElementById("results").innerText = message; // index.html == line 24
}

function getValue(card) { // line 44
    let data = card.split("-"); // "4-C" -> ["4", "C"]
    let value = data[0];

    if (isNaN(value)) { //A, J, Q, K == (NaN = not a number)
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value); // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
}

function checkAce(card) { // line 45
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount) { // line 86
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}


// https://github.com/ImKennyYip/black-jack/tree/master
// https://www.youtube.com/watch?v=bMYCWccL-3U&list=PLrgu_b7U8aQgrzmoqRSuH3KqWXzxaXuW6
