
const App = {};

App.init = () => {

    App.pokemonSelect = $('#pokemon-select');
    App.pokemonInputWanted = $('#pokemon-wanted-name-input');
    App.submitButtonWanted = $('#submit-button-wanted');
    App.pokemonInputAcquired = $('#pokemon-acquired-name-input');
    App.submitButtonAcquired = $('#submit-button-acquired');
    App.pokemonInputCard = $('#pokemon-card-name-input');
    App.submitButtonCard = $('#submit-button-card');
    App.pokemonGen1 = [];
    App.gameArea = $('#game-area');
    App.result = $('#result');
    App.wantedPokemon = $('#wanted-pokemon');
    App.bidPokemon = $('#bid-pokemon');
    App.pokemonGuessArea = $('#pokemon-guess-area');
    App.guessSelect;
    App.scoreArea = $('#score-area');
    App.statsArea = $('#stats-area');
    App.pokemonCollection = $('#pokemon-collection');
    App.cardCollection = $('#card-collection');
    App.controlls = $('#controlls');
    App.gameStartButton = $('#gameStartButton');
    App.gameRestartButton = $('#gameRestartButton');
    App.soundMuteButton = $('#soundMuteButton');
    App.soundUnmuteButton = $('#soundUnmuteButton');
    App.loadButtonYes = $('#loadData-yes');
    App.loadButtonNo = $('#loadData-no');
    App.tutorialButton = $('#tutorialButton');
    App.scrollLeft = $('#scroll-left');
    App.scrollRight = $('#scroll-right');
    App.guessedTotal = 0;
    App.missedTotal = 0;
    App.pokemonsTotal = 0;
    App.cardsTotal = 0;
    App.timeLimit = $('#countdown');
    App.timeSet = 0; //Helper variable to check if timeout function have been already called.
    App.guess = 3;
    App.correctGuess = 0;
    App.pokemonGuessList = [];
    App.pokemonCardList = [];
    App.acquiredPokemons = [];
    App.sound = new Howl({ src: ['sound.mp3'], loop: true });
    App.missedTotalText = $('#missed-total'); //*new*
    App.guessedTotalText = $('#guessed-total'); //*new*
    App.pokemonsTotalText = $('#pokemons-total'); //*new*
    App.cardsTotalText = $('#cards-total'); //*new*

};
App.checkStorage = () => { //retrieves stored data and loads application to last saved state
    App.acquiredPokemons = JSON.parse(localStorage.getItem('acquiredPokemons'));
    /* if (App.acquiredPokemons.length === 0) {
        App.acquiredPokemons = [];
    } */
    /* else { */
    var pokemons = []; //*new* created list to put pokemons to to appendem all at once after cycle
    App.acquiredPokemons.forEach(item => {
        var pokemon = $(App.pokemonSelect).children(`img[alt=${item}]`); // '#pokemon-select'
        pokemon.removeClass('pokemon');
        pokemon.addClass('pokemon-in-collection');
        pokemons.push(pokemon);
        //App.pokemonCollection.prepend(pokemon);

    });
    App.pokemonCollection.prepend(pokemons); //*new* appending list after cycle
    /* } */
    App.pokemonCardList = JSON.parse(localStorage.getItem('pokemonCards'));
    /* if (App.pokemonCardList.length === 0) {
        App.pokemonCardList = [];

    } */
    /* else { */
    App.pokemonCardList.forEach(item => {
        /* $.get(`https://api.pokemontcg.io/v1/cards?id=${item.pokemonCardId}`).done((resp) => {
            var pokemonCardImgURL = resp.cards[0].imageUrlHiRes;
            var pokemonName = item.pokemonName //resp.cards[0].name; // card names might contain special chars, therefore it is needed to to store not only id but also pokemon name without special chars in object
            var pokemonCardId = resp.cards[0].id;
            App.createCard(pokemonCardImgURL, pokemonName.toLowerCase(), pokemonCardId);

        }); */
        var pokemonName = item.pokemonName;
        var pokemonCardId = item.pokemonCardId;
        var pokemonCardImgURL = item.pokemonCardImgURL;
        var cardName = item.cardName;
        var cardType = item.cardType;
        var cardSubtype = item.cardSubtype;
        var cardHP = item.cardHP;
        var cardRarity = item.cardRarity;
        App.createCard(pokemonCardImgURL, pokemonName.toLowerCase(), pokemonCardId, cardName, cardType, cardSubtype, cardHP, cardRarity);

    });
    /* } */
    App.missedTotal = JSON.parse(localStorage.getItem('missedTotal'));
    App.missedTotalText.text(App.missedTotal); //*new* selector $('#missed-total') replaced with global variable

    App.guessedTotal = JSON.parse(localStorage.getItem('guessedTotal'));
    App.guessedTotalText.text(App.guessedTotal); //*new* selector $('#guessed-total') replaced with global variable

    App.pokemonsTotal = JSON.parse(localStorage.getItem('pokemonsTotal'));
    App.pokemonsTotalText.text(App.pokemonsTotal); //*new* selector $('#pokemons-total') replaced with global variable

    App.cardsTotal = JSON.parse(localStorage.getItem('cardsTotal'));
    App.cardsTotalText.text(App.cardsTotal); //*new* selector $('#cards-total') replaced with global variable
}
App.gameStart = () => { //actions inicialized after game start button is clicked
    App.restartGuess();
    App.gameStartButton.addClass('hidden');
    App.gameRestartButton.addClass('hidden');
    App.timeSet = 0;
    App.setTimeout();
    App.result.text('');
    var soundActive = App.sound.playing(App.sound);
    if (soundActive === false) {
        App.sound.play();
    }


};
App.setTimeout = () => { //sets timeout to 15s, App.timeSet prevents from multiple calls of gameOver function
    let time = new Date().getTime() + 15000;
    App.timeLimit.countdown(time, { elapse: false })
        .on('update.countdown', function (event) {
            $(this).html(event.strftime('To end: %S'));
        })
        .on('finish.countdown', function () {
            $(this).html('To end: 00');
            if (App.timeSet === 0) { // if 0 then call gameOver, else do nothing
                App.result.text('Time expired! You have lost pokemon you bid.');
                App.gameOver();
            }

        });

};
App.createGuess = () => { //generates random picture of pokemon to guess along with three choices to select from. Evaluates user selection and finel round score
    const pokemonName = $('#pokemon-in-game-wanted').attr('alt'); //*new* puvodne bylo img[id="pokemon-in-game-wanted"]
    App.pokemonGuessList = [];
    let pokemonToGuess = App.pokemonGen1[Math.floor(Math.random() * App.pokemonGen1.length)];
    App.pokemonGuessList.push(pokemonToGuess);

    App.guessSelect = $('<div id="guess-select" class="guess-select">');
    const pokemonToGuessImg = $('<img>')
        .addClass('pokemon-to-guess')
        .attr('id', 'pokemon-to-guess'); //*new* chaining
    if (pokemonToGuess === 'nidoranf') {
        pokemonToGuess = 'nidoran-f';
    }
    if (pokemonToGuess === 'nidoranm') {
        pokemonToGuess = 'nidoran-m';
    }
    pokemonToGuessImg.attr('src', `https://img.pokemondb.net/artwork/${pokemonToGuess.toLowerCase()}.jpg`);
    App.pokemonGuessArea.append(pokemonToGuessImg);
    App.pokemonGuessArea.append(App.guessSelect);


    while (App.pokemonGuessList.length < 3) {
        let randomPokemon = App.pokemonGen1[Math.floor(Math.random() * App.pokemonGen1.length)];
        if (App.pokemonGuessList.includes(randomPokemon)) {
            randomPokemon = App.pokemonGen1[Math.floor(Math.random() * App.pokemonGen1.length)];
        }
        else {
            App.pokemonGuessList.push(randomPokemon);
        }
    }
    App.pokemonGuessList.sort(() => { return 0.5 - Math.random(); });

    App.pokemonGuessList.forEach(guess => {
        const pokemonGuess = $(`<button id="guess" label=${guess}>${guess.toUpperCase()}</button>`);
        pokemonGuess.click(() => { //evaluation of user selection

            const guessedPokemon = pokemonGuess.attr('label');
            if (guessedPokemon === pokemonToGuess) {
                App.result.text('Correct guess!');
                App.correctGuess++;
                App.guessedTotal++;
                localStorage.setItem('guessedTotal', JSON.stringify(App.guessedTotal));
                App.guessedTotalText.text(App.guessedTotal);
                App.guess--;



            }
            else {
                App.result.text('Too bad');
                if (App.guess > 0) {
                    App.guess--;
                    App.missedTotal++;
                    localStorage.setItem('missedTotal', JSON.stringify(App.missedTotal));
                    App.missedTotalText.text(App.missedTotal); //*new* selector $('#missed-total') replaced with global variable


                }
            }
            App.restartGuess();

        });

        App.guessSelect.append(pokemonGuess);
    });
    if (App.guess === 0) { //evaluation of total round score
        if (App.correctGuess <= 1) {
            App.gameOver();
            App.result.text('You have lost pokemon you bid.');

        }
        if (App.correctGuess === 2) {
            App.result.text(`You have acquired pokemon: ${pokemonName}`);
            App.gameWin();
        }
        if (App.correctGuess === 3) {
            App.result.text(`You have acquired pokemon: ${pokemonName} and one of his cards as a bonus!`);
            App.getCard(pokemonName);
            App.gameWin();
        }


    }

};
App.restartGuess = () => { //restarts generation of pokemon to guess [2x]
    App.pokemonGuessList = [];
    if ($('#pokemon-to-guess')) {
        $('#pokemon-to-guess').remove();
    }
    if (App.guessSelect) {
        App.guessSelect.remove();
    }
    App.createGuess();

};

App.gameRestart = () => { //restarts game round
    const pokemonInGame = $('img[id="pokemon-in-game-wanted"]');
    pokemonInGame.attr('id', 'pokemon')
    pokemonInGame.removeClass('pokemon-in-game-wanted');
    App.wantedPokemon.remove(pokemonInGame);
    App.pokemonSelect.prepend(pokemonInGame);

    const pokemonBid = $('img[id="pokemon-in-game-bid"]');
    pokemonBid.attr('id', 'pokemon');
    pokemonBid.removeClass('pokemon-in-game-bid');
    App.bidPokemon.remove(pokemonBid);
    App.pokemonCollection.append(pokemonBid);

    App.gameRestartButton.addClass('hidden');
    App.gameStartButton.addClass('hidden');

    App.guess = 3;
    App.correctGuess = 0;
    App.pokemonGuessList = [];
    $('#pokemon-to-guess').remove();
    App.guessSelect.remove();

};
App.gameOver = () => { //called when user looses round
    App.timeSet = 1; // 1 = gameOver already executed once [to prevent multiple executions of function gameOver]
    const pokemonInGame = $('img[id="pokemon-in-game-wanted"]');
    pokemonInGame.attr('id', 'pokemon')
    pokemonInGame.removeClass('pokemon-in-game-wanted');
    App.wantedPokemon.remove(pokemonInGame);
    App.pokemonSelect.prepend(pokemonInGame);

    const pokemonBid = $('img[id="pokemon-in-game-bid"]');
    const pokemonBidIndex = App.acquiredPokemons.indexOf($('#pokemon-in-game-bid').attr('alt'));
    pokemonBid.attr('id', 'pokemon');
    pokemonBid.removeClass('pokemon-in-game-bid');
    pokemonBid.removeClass('pokemon-in-collection');
    pokemonBid.addClass('pokemon');
    App.bidPokemon.remove(pokemonBid);
    App.pokemonSelect.prepend(pokemonBid);
    App.acquiredPokemons.splice(pokemonBidIndex, 1);
    localStorage.setItem('acquiredPokemons', JSON.stringify(App.acquiredPokemons));
    App.pokemonsTotal--;
    App.pokemonsTotalText.text(App.pokemonsTotal);
    localStorage.setItem('pokemonsTotal', JSON.stringify(App.pokemonsTotal));

    App.gameRestartButton.addClass('hidden');
    App.gameStartButton.addClass('hidden');

    App.guess = 3;
    App.correctGuess = 0;
    App.pokemonGuessList = [];
    $('#pokemon-to-guess').remove();
    App.guessSelect.remove();
    App.timeLimit.countdown('stop');

};
App.gameWin = () => { // called when user wins round
    const pokemonInGame = $('img[id="pokemon-in-game-wanted"]');
    pokemonInGame.attr('id', 'pokemon');
    pokemonInGame.removeClass('pokemon-in-game-wanted');
    pokemonInGame.removeClass('pokemon');
    pokemonInGame.addClass('pokemon-in-collection');
    App.wantedPokemon.remove(pokemonInGame);

    const pokemonBid = $('img[id="pokemon-in-game-bid"]');
    pokemonBid.attr('id', 'pokemon');
    pokemonBid.removeClass('pokemon-in-game-bid');
    App.bidPokemon.remove(pokemonBid);

    App.acquiredPokemons.push(pokemonInGame.attr('alt'));
    App.pokemonCollection.append(pokemonInGame);
    App.pokemonCollection.append(pokemonBid);
    App.timeLimit.countdown('stop');
    localStorage.setItem('acquiredPokemons', JSON.stringify(App.acquiredPokemons));
    App.pokemonsTotal++;
    App.pokemonsTotalText.text(App.pokemonsTotal);
    localStorage.setItem('pokemonsTotal', JSON.stringify(App.pokemonsTotal));

    App.gameRestart();
};
App.getCard = (pokemonName) => { //gets random pokemon card from api and adds it to collection
    const spinner = $('<div class="spinner"></div>');
    App.cardCollection.append(spinner);
    $.get(`https://api.pokemontcg.io/v1/cards?name=${pokemonName}`).done((resp) => {
        const cardList = resp.cards;
        const randomCard = Math.floor(Math.random() * (cardList.length - 0) + 0);
        const pokemonCardImgURL = resp.cards[randomCard].imageUrlHiRes;
        const pokemonCardId = resp.cards[randomCard].id;

        //*new* added more const for other info to store in local storage so that api wont be overloaded with requests for detail info on card
        const cardName = resp.cards[randomCard].name;
        const cardType = resp.cards[randomCard].types[0];
        const cardSubtype = resp.cards[randomCard].subtype;
        const cardHP = resp.cards[randomCard].hp;
        const cardRarity = resp.cards[randomCard].rarity;
        console.log(cardName, cardType, cardSubtype, cardHP, cardRarity);

        App.pokemonCardList.push({ pokemonCardId, pokemonName, pokemonCardImgURL, cardName, cardType, cardSubtype, cardHP, cardRarity });

        localStorage.setItem('pokemonCards', JSON.stringify(App.pokemonCardList));
        App.cardsTotal++;
        App.cardsTotalText.text(App.cardsTotal);
        localStorage.setItem('cardsTotal', JSON.stringify(App.cardsTotal));

        App.createCard(pokemonCardImgURL, pokemonName.toLowerCase(), pokemonCardId, cardName, cardType, cardSubtype, cardHP, cardRarity);

    }).always(() => {
        spinner.remove();
    });



};
App.createCard = (pokemonCardImgURL, pokemonName, pokemonCardId, cardName, cardType, cardSubtype, cardHP, cardRarity) => { //generates card and handles click event on card
    //const card = $(`<img id= ${pokemonCardId} class="card" alt=${pokemonName} src=${pokemonCardImgURL}>`); 
    const card = $('<img>')
        .addClass('card')
        .attr('id', pokemonCardId)
        .attr('alt', pokemonName)
        .attr('src', pokemonCardImgURL); //*new* uprava + chaining


    card.click(() => {
        $('.pokemon-active').removeClass('pokemon-active');
        $('.card-active').removeClass('card-active');
        card.addClass('card-active');

        /* if ($('.spinner')) { 
            $('.spinner').remove();
        }
        const spinner = $('<div class="spinner"></div>'); */ //*new* no longer needed

        if ($('.card-detail')) {
            $('.card-detail').remove();
        }
        if ($('.pokemon-detail')) {
            $('.pokemon-detail').remove();
        }
        if ($('.detail-info')) {
            $('.detail-info').remove();
        }
        if ($('.pokemon-info')) {
            $('.pokemon-info').remove();
        }

        const cardDetailImg = $('<img>');
        cardDetailImg.attr('src', pokemonCardImgURL);
        cardDetailImg.attr('alt', pokemonName.toLowerCase());
        cardDetailImg.attr('class', 'card-detail');
        App.statsArea.append(cardDetailImg);

        //*new* now transfering detail info for card as parameters of function so that api is not overloaded with requests and loading of card info is also faster
        const cardInfo = $(`<div class="detail-info">
            <label><strong>Details for card:</strong></label>
            <div class="detail-info-name">
                <label><strong>Name:</strong> ${cardName}</label>
            </div>
            <div class="detail-info-type">
                <label><strong>Type:</strong> ${cardType}</label> 
            </div>
            <div class="detail-info-subtype">
                <label><strong>Subtype:</strong> ${cardSubtype}</label>
            </div>
            <div class="detail-info-id">
                <label><strong>ID:</strong> ${pokemonCardId}</label>
            </div>
            <div class="detail-info-hp">
                <label><strong>HP:</strong> ${cardHP}</label>
            </div>
            <div class="detail-info-rarity">
                <label><strong>rarity:</strong> ${cardRarity}</label>
            </div>
        </div>`);

        App.statsArea.append(cardInfo);

        /* App.statsArea.append(spinner);
        $.get(`https://api.pokemontcg.io/v1/cards?name=${pokemonName}`).done((resp) => {
            const cardInfo = $(`<div class="detail-info">
            <label><b>Details for card:</b></label>
            <div class="detail-info-name">
                <label><b>Name:</b> ${resp.cards[0].name}</label>
            </div>
            <div class="detail-info-type">
                <label><b>Type:</b> ${resp.cards[0].types[0]}</label> 
            </div>
            <div class="detail-info-subtype">
                <label><b>Subtype:</b> ${resp.cards[0].subtype}</label>
            </div>
            <div class="detail-info-id">
                <label><b>ID:</b> ${resp.cards[0].id}</label>
            </div>
            <div class="detail-info-hp">
                <label><b>HP:</b> ${resp.cards[0].hp}</label>
            </div>
            <div class="detail-info-rarity">
                <label><b>rarity:</b> ${resp.cards[0].rarity}</label>
            </div>
        </div>`);

            App.statsArea.append(cardInfo);

        }).always(() => {
            spinner.remove();
        }); */
    });
    App.cardCollection.append(card);

};

App.createPokemonList = () => { // create list of pokemons from first gen [151 pokemons]
    App.pokemonSelect.detach();
    $('.pokemon-galery').append(`<p class="loading">Pokemons are loading...</p>`);

    var promises = []; //*new* tried with promises but could not make it work
    for (let i = 1; i <= 151; i++) {
        promises.push($.get(`https://pokeapi.co/api/v2/pokemon/${i}`).done((resp) => {
            if (resp.name.includes('-') && !resp.name.includes('mr')) {
                const name = resp.name.replace('-', '');
                App.pokemonGen1.push(name);
                App.createPokemon(name);
            }
            else {
                App.pokemonGen1.push(resp.name);
                App.createPokemon(resp.name);
            }
        }));

    };
    $.when(promises).done(console.log('done')); //*new* I was trying to remove the loading here, console log is for testing purpose. When observing console in browser the 'done' string appears a lot sooner then pokemons are appended to galery and therefore visible => the done action is executed before pokemons are even visible
    $('.loading').remove();
    App.pokemonSelect.appendTo('.pokemon-galery');


};
App.createPokemon = (pokemonName) => { //creates pokemons[gifs]. Handles click and double click events on pokemon
    const pokemon = $('<img>')
        .addClass('pokemon')
        .attr('id', 'pokemon')
        .attr('alt', pokemonName); //*new* chaining

    //had to add another if clause for mr mime
    if (pokemonName === 'mr-mime') {
        pokemonName = 'mrmime';
    }
    pokemon.attr('src', `https://play.pokemonshowdown.com/sprites/xyani/${pokemonName.toLowerCase()}.gif`); //http://www.pokestadium.com/sprites/xy/${pokemonName.toLowerCase()}.gif //needed to change source because of http->https
    pokemon.dblclick(() => { //doubleclick adds pokemon to game
        if ($('img[id="pokemon-in-game-wanted"]').length > 0) {

            if ($('img[id="pokemon-in-game-wanted"]').length > 0 && $('img[id="pokemon-in-game-bid"]').length > 0) {
                App.result.text('You have alredy made your choices.');

            }
            else {
                if ($('img[id="pokemon-in-game-wanted"]').length > 0 && !pokemon.hasClass('pokemon-in-collection')) {
                    App.result.text('You have already choose pokemon to play for.');
                }
                else {
                    App.result.text('You can start the game now.')
                    pokemon.attr('id', 'pokemon-in-game-bid')
                    pokemon.addClass('pokemon-in-game-bid');
                    App.bidPokemon.append(pokemon);

                    App.gameStartButton.removeClass('hidden');
                    App.gameStartButton.click(() => {
                        App.gameStart();
                    });

                    App.gameRestartButton.removeClass('hidden');
                    App.gameRestartButton.click(() => {
                        App.gameRestart();
                    });
                }
            }
        }

        else {
            if (pokemon.hasClass('pokemon-in-collection')) {
                App.result.text('You have to choose pokemon you want to play for, prior to one you want to bid.')

            }
            else {
                pokemon.attr('id', 'pokemon-in-game-wanted')
                pokemon.addClass('pokemon-in-game-wanted');
                App.wantedPokemon.append(pokemon);

                if (App.acquiredPokemons.length === 0) {
                    App.gameStartButton.removeClass('hidden');
                    App.gameStartButton.click(() => {
                        App.gameStart();
                    });
                    App.gameRestartButton.removeClass('hidden');
                    App.gameRestartButton.click(() => {
                        App.gameRestart();
                    });
                }
                else {
                    App.gameRestartButton.removeClass('hidden');
                    App.gameRestartButton.click(() => {
                        App.gameRestart();
                    });
                    App.result.text('You have pokemons in collection. You have to choose one to bid.');

                }
            }
        }
    });
    pokemon.click(() => { //click makes pokemon active in order to show detail info
        $('.pokemon-active').removeClass('pokemon-active');
        $('.card-active').removeClass('card-active');
        pokemon.addClass('pokemon-active');

        if ($('.spinner')) {
            $('.spinner').remove();
        }
        const spinner = $('<div class="spinner"></div>');

        if ($('.pokemon-detail')) {
            $('.pokemon-detail').remove();
        }
        if ($('.pokemon-info')) {
            $('.pokemon-info').remove();
        }
        if ($('.card-detail')) {
            $('.card-detail').remove();
        }
        if ($('.detail-info')) {
            $('.detail-info').remove();
        }

        const pokemonDetailImg = $('<img>')
            .attr('src', `https://img.pokemondb.net/artwork/${pokemonName.toLowerCase()}.jpg`)
            .attr('alt', pokemonName)
            .attr('class', 'pokemon-detail'); //*new* chaining
        App.statsArea.append(pokemonDetailImg);
        App.statsArea.append(spinner);
        $.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`).done((resp) => {
            const pokemonInfo = $(`<div class="pokemon-info">
            <label><strong>Information on pokemon:</strong></label>
            <div class="detail-info-name">
                <label><strong>Name:</strong> ${resp.name}</label>
            </div>
            <div class="detail-info-height">
                <label><strong>Height:</strong> ${resp.height}</label>
            </div>
            <div class="detail-info-weight">
                <label><strong>Weight:</strong> ${resp.weight}</label>
            </div>
            <div class="detail-info-id">
                <label><strong>ID:</strong> ${resp.id}</label>
            </div>
        </div>`);
            App.statsArea.append(pokemonInfo);

        }).always(() => {
            spinner.remove();
        });

    });

    App.pokemonSelect.append(pokemon);

};


$(document).ready(() => { //after DOM is ready...
    App.init();
    App.createPokemonList();

    App.scrollLeft.click(() => { //onclick scroll left, right and animation
        App.pokemonSelect.animate({ //*new* removed reselection $('.pokemon-select')
            scrollLeft: App.pokemonSelect.scrollLeft() - 800,
        }, 600);

    });
    App.scrollRight.click(() => {
        App.pokemonSelect.animate({ //*new* removed reselection $('.pokemon-select')
            scrollLeft: App.pokemonSelect.scrollLeft() + 800,
        }, 600);

    });


    if (localStorage.length === 0) {  //checks if localstorage contains data
        //App.loadButton.hide();
        App.loadButtonYes.addClass('hidden');
        App.loadButtonNo.addClass('hidden');
        App.result.text('Start a new game, by selecting pokemon to play for.');
    }
    else { //in case of data user has option to load or start new game
        $('.pokemon-select').hide();
        $('.container-row-game').hide();
        App.result.text('Do you want to load previous data?');
        App.loadButtonYes.removeClass('hidden');
        App.loadButtonNo.removeClass('hidden');

        App.gameArea.append(App.loadButtonYes);
        App.gameArea.append(App.loadButtonNo);

    }

    App.loadButtonYes.click(() => { //actions to take if load data chosen
        $('.pokemon-select').show();
        App.loadButtonNo.hide();
        App.loadButtonYes.hide();
        $('.container-row-game').show();
        App.result.text('Data loaded. Start by selecting a pokemon to play for.');
        App.checkStorage();

    });
    App.loadButtonNo.click(() => { //actions to take if new game chosen
        $('.pokemon-select').show();
        App.loadButtonNo.hide();
        App.loadButtonYes.hide();
        $('.container-row-game').show();
        localStorage.clear();
        App.result.text('Start a new game, by selecting pokemon to play for.');
    });

    App.soundMuteButton.click(() => { //mutes sound
        App.sound.volume(0);

    });
    App.soundUnmuteButton.click(() => { //unmutes sound
        App.sound.volume(1);

    });

    //autocomplete inputs of search boxes
    $(function () {
        $('.search-response').remove();
        App.pokemonInputWanted.autocomplete({
            source: App.pokemonGen1,
            close: () => {
                App.submitButtonWanted.click();
            }
        });
    });
    $(function () {
        $('.search-response').remove();
        App.pokemonInputAcquired.autocomplete({
            source: App.pokemonGen1,
            close: () => {
                App.submitButtonAcquired.click();
            }
        }); // *source should be App.acquiredPokemons array, but doesn't work..
    });
    $(function () {
        $('.search-response').remove();
        App.pokemonInputCard.autocomplete({
            source: App.pokemonGen1,
            close: () => {
                App.submitButtonCard.click();
            }
        }); // *source should be App.cardList array, but doesn't work..
    });

    //search click events
    App.submitButtonWanted.click(() => { //search for pokemon from search input in pokemon galery [all pokemons that has not been acquired yet]
        $('.search-response').remove();
        var pokemonNameValue = (App.pokemonInputWanted.val()).trim();
        App.pokemonInputWanted.val('');
        if (!pokemonNameValue) {
            $('.search-area-pokemon').append(`<p class="search-response">Please eneter pokemon name.</p>`);
        }
        else {
            var pokemon = $('#pokemon-select').children(`img[alt=${pokemonNameValue.toLowerCase()}]`);
            if (pokemon.length === 0) {
                $('.search-area-pokemon').append(`<p class="search-response">Pokemon: ${pokemonNameValue} does not exist or is alredy in collection.</p>`);
            }
            else {
                if (pokemon.hasClass("pokemon")) {
                    $('.pokemon-select').animate({
                        scrollLeft: 0,
                    }, 500);
                    App.pokemonSelect.prepend(pokemon);
                    pokemon.trigger('click');
                }

            }
        }

    });
    App.submitButtonAcquired.click(() => { //search for pokemon from search input in collection [acquired pokemons]
        $('.search-response').remove();
        var pokemonNameValue = (App.pokemonInputAcquired.val()).trim();
        App.pokemonInputAcquired.val('');
        if (!pokemonNameValue) {
            $('.search-area-pokemon-col').append(`<p class="search-response">Please eneter pokemon name.</p>`);
        }
        else {
            var pokemon = $('#pokemon-collection').children(`img[alt=${pokemonNameValue.toLowerCase()}]`);
            if (pokemon.length === 0) {
                $('.search-area-pokemon-col').append(`<p class="search-response">Pokemon: ${pokemonNameValue} does not exist or not in collection yet.</p>`);
            }
            else {
                if (pokemon.hasClass('pokemon-in-collection')) {
                    $('.pokemon-collection').animate({
                        scrollTop: 0,
                    }, 500);
                    App.pokemonCollection.prepend(pokemon);
                    pokemon.trigger('click');
                }

            }
        }
    });
    App.submitButtonCard.click(() => { //search for pokemon card by pokemon name in card collection
        $('.search-response').remove();
        var pokemonNameValue = (App.pokemonInputCard.val()).trim();
        App.pokemonInputCard.val('');
        if (!pokemonNameValue) {
            $('.search-area-card-col').append(`<p class="search-response">Please eneter pokemon name.</p>`);
        }
        else {
            var card = $('#card-collection').children(`img[alt=${pokemonNameValue.toLowerCase()}]`);
            if (card.length === 0) {
                $('.search-area-card-col').append(`<p class="search-response">No cards for: ${pokemonNameValue} yet.</p>`);
            }
            else {
                if (card.hasClass('card')) {
                    $('#card-collection').animate({
                        scrollTop: 0,
                    }, 500);
                    App.cardCollection.prepend(card);
                    if (card.length >= 2) {
                        card.first().trigger('click');
                    }
                    else {
                        card.trigger('click');
                    }

                }

            }
        }

    });

    App.tutorialButton.click(() => { //displays tutorial
        $('.tutorial').toggle('slow');

    });

});

