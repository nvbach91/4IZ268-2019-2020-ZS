/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 */

var cities = ['Prague', 'Madrid', 'Toronto', 'New York', 'Berlin',
    'Rome', 'Moscow', 'Barcelona', 'Tokyo', 'Seoul'];
cities = cities.concat(cities);
cities.sort(() => {
    return 0.5 - Math.random();
});

var points = document.querySelector('#points');
var board = document.querySelector('#game-field');

var currentPoints = 0;
var cardsTurned = [];
var numberOfTurnedCards = 0;
var pairsGuessed = 0;
var delay = 1000;

var createCard = function (text) {
    var card = document.createElement('div');
    card.classList.add('card');
    card.innerText = text;
    board.appendChild(card);
    card.addEventListener('click', function () {
        if (numberOfTurnedCards == 2) {
            return false;
        }
        if (card.classList.contains('revealed')) {
            return false;
        }
        if (cardsTurned[0] && cardsTurned[1]) {
            return false;
        }
        card.classList.add('revealed');
        cardsTurned[numberOfTurnedCards] = this;
        numberOfTurnedCards++;
        if (numberOfTurnedCards == 2 && cardsTurned[0].innerText == cardsTurned[1].innerText) {
            points.innerText++;
            numberOfTurnedCards = 0;
            pairsGuessed += 2;
            cardsTurned[0] = null;
            cardsTurned[1] = null;
            if (pairsGuessed == cities.length) {
                setTimeout(function () {
                    alert('Congratulations ! Your result: ' + points.innerText + ' points');
                }, delay);
            }
        }
        if ((numberOfTurnedCards == 2) && (cardsTurned[0].innerText != cardsTurned[1].innerText)) {
            if (points.innerText != 0) {
                points.innerText--;
            }
            numberOfTurnedCards = 0;
            setTimeout(function () {
                cardsTurned[0].classList.remove('revealed');
                cardsTurned[1].classList.remove('revealed');
                cardsTurned[0] = null;
                cardsTurned[1] = null;
            }, delay)
        }
    });
};

for (i = 0; i < cities.length; i++) {
    createCard(cities[i]);
}