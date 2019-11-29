/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 */

var pokemon = ['pikachu', 'raichu', 'bulbasaur', 'charmander', 'charizard', 'diglett', 'mew', 'mewtwo', 'kabuto', 'charmeleon'];
pokemon = pokemon.concat(pokemon);
pokemon.sort(() => {
    return 0.5 - Math.random();
});

var pointsField = document.querySelector('#points');
var gameField = document.querySelector('#game-field');
var points = 0;

var cardFunction = function (card) {
    card.addEventListener('click', function () {

        if (card.dataset.flipped != 'finished') {

            var flippedArray = gameField.querySelectorAll("div[data-flipped='yes']");

            if (flippedArray.length < 2) {

                card.dataset.flipped = 'yes';

                flippedArray = gameField.querySelectorAll("div[data-flipped='yes']");

                console.log(flippedArray.length);

                var image = 'https://img.pokemondb.net/artwork/' + card.getAttribute("name") + '.jpg';
                card.style.backgroundImage = 'url(' + image + ')';

                if (flippedArray.length == 2) {

                    if (flippedArray[0].getAttribute("name") === flippedArray[1].getAttribute("name")) {
                        console.log('jo');

                        flippedArray[0].dataset.flipped = 'finished';
                        flippedArray[1].dataset.flipped = 'finished';

                        points += 1;

                    } else {
                        if (points > 0) {
                            points -= 1;
                        }
                        setTimeout(function () {
                            console.log('ne');
                            flippedArray[0].style = null;
                            flippedArray[1].style = null;
                            flippedArray[0].dataset.flipped = 'no';
                            flippedArray[1].dataset.flipped = 'no';
                        }, 1000);
                    }
                }
            }

            var finishedArray = gameField.querySelectorAll("div[data-flipped='finished']");

            if (finishedArray.length == 20) {
                alert('you won! Number of points = ' + points);
                points = 0
                pointsField.innerText = points;
                finishedArray.forEach(function (card) {
                    card.style = null;                    
                    card.dataset.flipped = 'no';
                });
            } else {
                pointsField.innerText = points;
            }

        }
    });
}

var cardInsert = function (pokemonName) {
    var card = document.createElement('div');
    card.classList.add('card');
    card.dataset.flipped = 'no';
    card.setAttribute("name", pokemonName);    
    cardFunction(card);
    gameField.appendChild(card);
}

pokemon.forEach(function (card) {
    cardInsert(card)
});