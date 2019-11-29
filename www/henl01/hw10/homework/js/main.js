/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 */

var gameField = document.querySelector('#game-field');
var pointsField = document.querySelector('#points');

var cities = ['Prague', 'Moscow', 'London', 'Berlin', 'Madrid', 'Rome', 'Paris', 'Minsk', 'Hamburg', 'Barcelona'];
cities = cities.concat(cities);
cities.sort(() => {
  return 0.5 - Math.random();
});

var points = 0;
var cardsRevealed = 0;
var firstCard = null;
var secondCard = null;

var checkCard = function (card) {
    card.addEventListener('click', function() {

        if (card.classList.contains('revealed')) {
            return false;
        }
        
        if (firstCard && secondCard) {
            return false;
        }
        
        card.classList.add('revealed');

        if (!firstCard) {
            firstCard = card;
            return false;
        } else {
            secondCard = card;
        }

        if (firstCard.innerText === secondCard.innerText) {
            // console.log('Stejné');
            points++;
            firstCard = null;
            secondCard = null;
            cardsRevealed += 2;
            if (cardsRevealed === cities.length) {
                setTimeout( function () {
                    alert('Congrats! Your points: ' + points);
                }, 500);
            }
        } else {
            // console.log('Jiné');
            if (points > 0) {
                points--;
            }
            setTimeout( function () {
                firstCard.classList.remove('revealed');
                secondCard.classList.remove('revealed');
                firstCard = null;
                secondCard = null;
            }, 1000);
        }

        pointsField.innerText = points;
    });
};

var addCard = function (city) {
    var newCard = document.createElement('div');
    newCard.classList.add('card');
    newCard.innerText = city;
    gameField.appendChild(newCard);
    checkCard(newCard);
};

cities.forEach(function (cityName) {
    addCard(cityName);
});




