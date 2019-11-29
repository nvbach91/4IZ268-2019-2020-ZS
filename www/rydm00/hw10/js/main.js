/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 */

var cities = ['Prague', 'Reykjavik', 'Stockholm', 'Bratislava', 'Vienna', 'Amsterdam', 'Brussels', 'Copenhagen', 'Athens', 'Budapest'];
cities = cities.concat(cities);
cities.sort(() => {
    return 0.5 - Math.random();
});

var pointsToShow = document.querySelector('#points');
var gameField = document.querySelector('#game-field');
var points = 0;
var turnedCards = 0;
var card1 = null;
var card2 = null;

var play = function (card) {
    card.addEventListener('click', function () {
        if ((card1 != null && card2 != null) || card.classList.contains('turned')) {
            return false;
        }

        card.classList.add('turned');

        if (card1 == null) {
            card1 = card;
            return false;
        } else {
            card2 = card;
        }

        if (card1.innerHTML === card2.innerHTML) {
            card1 = null;
            card2 = null;
            points++;
            turnedCards += 2;

            if (turnedCards === cities.length) {
                pointsToShow.innerText = points;
                alert('Congratulations! Your score is: ' + points + ' points.');
            }
        } else {
            if (points != 0) {
                points--;
            }
            setTimeout(function () {
                card1.classList.remove('turned');
                card2.classList.remove('turned');
                card1 = null;
                card2 = null;
            }, 1000);
        }
        pointsToShow.innerText = points;
    });
};

var makeCard = function (nameCity) {
    var card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = '<img class="images" src="./img/' + nameCity + '.jpg" />';
    play(card);
    gameField.appendChild(card);
};

for (var i = 0; i < cities.length; i++) {
    makeCard(cities[i]);
}