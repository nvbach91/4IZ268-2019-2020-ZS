// user will select pokemon to play for and pokemon to bid [in case of no pokemons acquired in collection, he doesnt have to bid]
// user then guesses the pokemon if guesses 2/3 correctly he aquires pokemon he played for
// if he guessess 3/3 he also recieves premium in form of random card
// if he doesnt guess corectly he looses pokemon he bid [in case of no bid he just doesn't win the pokemon he wanted]
// libraries - jquery, sound manipulation library, time countdown library
// api - pokeAPI, pokemon card API

const App = {};

App.init = () => {
    // initialize app
    // start scripting
    /*  App.pokemonInput = $('#pokemon-name-input');
     App.submitButton = $('#submit-button'); */
    App.pokemonSelect = $('#pokemon-select');
    App.pokemonGen1 = [];
    App.gameArea = $('#game-area');
    App.wantedPokemon = $('#wanted-pokemon');
    App.pokemonGuessArea = $('#pokemon-guess-area');
    App.guessSelect;
    App.scoreArea = $('#score-area');
    App.statsArea = $('#stats-area');
    App.pokemonCollection = $('#pokemon-collection');
    App.cardCollection = $('#card-collection');
    App.controlls = $('#controlls');
    App.gameStartButton = $('#gameStartButton');
    App.gameRestartButton = $('#gameRestartButton');
    App.guessedTotal = 0;
    App.missedTotal = 0;
    App.timeLimit = 10;//10s to guess pokemon
    App.guess = 3;
    App.correctGuess = 0;
    App.pokemonGuessList = [];
    App.acquiredPokemons = [];
    App.pokemonCardList=[];



    /* App.prew = $('#prew');
    App.next = $('#next'); */

};
App.gameStart = () => {
    //const pokemonInGame = $("img[id='pokemon-in-game']");
    //const pokemonName = pokemonInGame.attr('alt');
    App.restartGuess(); //App.createGuess(pokemonName)
    App.gameStartButton.hide();
    App.gameRestartButton.hide();



};
App.createGuess = () => { //App.createGuess = (pokemonName) => {
    const pokemonName = $("img[id='pokemon-in-game']").attr('alt');
    App.pokemonGuessList = [];
    let pokemonToGuess = App.pokemonGen1[Math.floor(Math.random() * App.pokemonGen1.length)];
    App.pokemonGuessList.push(pokemonToGuess);

    App.guessSelect = $('<div id="guess-select" class="guess-select">');
    const pokemonToGuessImg = $('<img>');
    pokemonToGuessImg.addClass('pokemon-to-guess');
    pokemonToGuessImg.attr('id', 'pokemon-to-guess');
    if (pokemonToGuess === "nidoranf") {
        pokemonToGuess = "nidoran-f";
    }
    if (pokemonToGuess === "nidoranm") {
        pokemonToGuess = "nidoran-m";
    }
    pokemonToGuessImg.attr('src', `https://img.pokemondb.net/artwork/${pokemonToGuess.toLowerCase()}.jpg`);
    App.pokemonGuessArea.append(pokemonToGuessImg);
    App.pokemonGuessArea.append(App.guessSelect);


    //for (let i = 0; i <= 1; i++) {
        while(App.pokemonGuessList.length<3){
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
        pokemonGuess.click(() => {

            const guessedPokemon = pokemonGuess.attr('label');
            if (guessedPokemon === pokemonToGuess) {
                alert('Correct Guess!');
                App.correctGuess++;
                App.guessedTotal++;
                $('#guessed-total').text(App.guessedTotal);
                App.guess--;
                console.log(App.correctGuess);
                console.log(App.guess);


            }
            else {
                alert('Too bad.');
                if (App.guess > 0) {
                    App.guess--;
                    App.missedTotal++;
                    $('#missed-total').text(App.missedTotal);
                    console.log(App.correctGuess);
                    console.log(App.guess);

                }
                /* else{
                    alert('You have guesed 3 times');
                } */
            }
            App.restartGuess();

        });

        App.guessSelect.append(pokemonGuess);
    });
    if (App.guess == 0) {
        if (App.correctGuess <=1) {
            App.gameRestart();
            alert(`You have lost pokemon you bid.`);

        }
        if (App.correctGuess == 2) {
            alert(`You have aquired pokemon: ${pokemonName}`);
            App.gameWin(); //App.gameWin(pokemonName);
            // on set timeout
        }
        if(App.correctGuess == 3){
            alert(`You have aquired pokemon: ${pokemonName} and one of his cards as a bonus!`);
            App.getCard(pokemonName);
            App.gameWin(); 
        }
        

    }




};
App.restartGuess = () => {
    App.pokemonGuessList = [];
    if ($('#pokemon-to-guess')) {
        $('#pokemon-to-guess').remove();
    }
    if (App.guessSelect) {
        App.guessSelect.remove();
    }

    App.createGuess();

};

App.gameRestart = () => {
    //remove pokemon
    const pokemonInGame = $("img[id='pokemon-in-game']");
    pokemonInGame.attr('id', 'pokemon')
    pokemonInGame.removeClass('pokemon-in-game');
    App.wantedPokemon.remove(pokemonInGame);
    App.pokemonSelect.prepend(pokemonInGame);
    App.gameRestartButton.hide();
    App.gameStartButton.hide();
    App.guess = 3;
    App.correctGuess = 0;
    App.pokemonGuessList = [];
    $('#pokemon-to-guess').remove();
    App.guessSelect.remove();

    //reset scores

};
App.gameWin = () => { //App.gameWin = (pokemonName) => {
    const pokemonInGame = $("img[id='pokemon-in-game']");
    pokemonInGame.attr('id', 'pokemon')
    pokemonInGame.removeClass('pokemon-in-game');
    pokemonInGame.removeClass('pokemon');
    pokemonInGame.addClass('pokemon-in-collection');
    App.wantedPokemon.remove(pokemonInGame);

    //const pokemonName = pokemonInGame.attr('alt');
    App.acquiredPokemons.push(pokemonInGame.attr('alt'));
    App.pokemonCollection.append(pokemonInGame);
    App.gameRestart();
};
App.getCard = (pokemonName) => {
    const spinner=$('<div class="spinner"></div>');
    App.cardCollection.append(spinner);
    $.get(`https://api.pokemontcg.io/v1/cards?name=${pokemonName}`).done((resp) => {
        const cardList = resp.cards;
        const randomCard =  Math.floor(Math.random() * (cardList.length - 0) + 0); 
        const pokemonCardImgURL = resp.cards[randomCard].imageUrlHiRes;
        App.createCard(pokemonCardImgURL,pokemonName);
        //const pokemonCardImg = $(`<img class="card" alt=${pokemonName} src=${pokemonCardImgURL}></img>`);
        const pokemonCardId = resp.cards[randomCard].id;
        App.pokemonCardList.push(pokemonCardId);
        //App.cardCollection.append(pokemonCardImg);
    }).always(() => {
        spinner.remove();
    });

};
App.createCard = (pokemonCardImgURL,pokemonName) =>{
    const card = $(`<img class="card" alt=${pokemonName} src=${pokemonCardImgURL}></img>`);
    
    card.click(() => {
        $('.pokemon-active').removeClass('pokemon-active');
        $('.card-active').removeClass('card-active');
        card.addClass('card-active');

            const spinner=$('<div class="spinner"></div>');
           
            if($('.card-detail')){
                $('.card-detail').remove();
            }
            if($('.pokemon-detail')){
                $('.pokemon-detail').remove();
            }
            if($('.detail-info')){
                $('.detail-info').remove();
            }
            
            const cardDetailImg = $('<img>');
            cardDetailImg.attr('src', pokemonCardImgURL);
            cardDetailImg.attr('alt', pokemonName);
            cardDetailImg.attr('class', 'card-detail');
            App.statsArea.append(cardDetailImg);
            App.statsArea.append(spinner);
            $.get(`https://api.pokemontcg.io/v1/cards?name=${pokemonName}`).done((resp) => {
                const cardInfo = $(`<div class="detail-info">
            <div class="detail-info">
                <label>Name: ${resp.cards[0].name}</label>
            </div>
            <div class="detail-info">
                <label>Type: ${resp.cards[0].types[0]}</label>
            </div>
            <div class="detail-info">
                <label>Subtype: ${resp.cards[0].subtype}</label>
            </div>
            <div class="detail-info">
                <label>ID: ${resp.cards[0].id}</label>
            </div>
            <div class="detail-info">
                <label>HP: ${resp.cards[0].hp}</label>
            </div>
            <div class="detail-info">
                <label>rarity: ${resp.cards[0].rarity}</label>
            </div>
        </div>`);
                App.statsArea.append(cardInfo);

            }).always(() => {
                spinner.remove();
            });
    });
    App.cardCollection.append(card);
};
// create list of pokemons from first gen [151 pokemons]
App.createPokemonList = () => {
    App.pokemonSelect.detach();

    /* const spinner=$('<div class="spinner"></div>');
    spinner.appendTo(".pokemon-galery");  */

    for (let i = 1; i <= 151; i++) {
        //str replace - ''

        $.get(`https://pokeapi.co/api/v2/pokemon/${i}`).done((resp) => {
            if (resp.name.includes('-') && !resp.name.includes('mr')) {
                const name = resp.name.replace('-', '');
                App.pokemonGen1.push(name);
                App.createPokemon(name);
            }
            else {
                App.pokemonGen1.push(resp.name);
                App.createPokemon(resp.name);
            }
        });

    };

    App.pokemonSelect.appendTo(".pokemon-galery");
    /* $(".spinner").remove(); */


};
App.createPokemon = (pokemonName) => {
    /* const pokemon = $('<li>');
    pokemon.attr('data-name', pokemonName);
    pokemon.text(pokemonName);
    App.test.push(pokemonName);
    App.pokemonSelect.append(pokemon); */
    const pokemon = $('<img>');
    pokemon.addClass('pokemon');
    pokemon.attr('id', 'pokemon');
    pokemon.attr('alt', pokemonName);
    pokemon.attr('src', `http://www.pokestadium.com/sprites/xy/${pokemonName.toLowerCase()}.gif`);
    pokemon.dblclick(() => {
        if ($("img[id='pokemon-in-game']").length > 0) {
            alert('You have already selected pokemon.');
        }
        /* if(pokemon.attr('class')==='pokemon-in-collection'){
            alert('Pokemon in colection.');
        } */
        else {
            pokemon.attr('id', 'pokemon-in-game')
            pokemon.addClass('pokemon-in-game');
            App.wantedPokemon.append(pokemon);
            //append game start button
            /*  const gameStartButton = $('<button>');
             gameStartButton.text('Start Game'); */
            App.gameStartButton.show();
            App.gameStartButton.click(() => {
                App.gameStart();
            });
            /* const gameRestartButton = $('<button>');
            gameRestartButton.text('Restart Game'); */
            App.gameRestartButton.show();
            App.gameRestartButton.click(() => {
                App.gameRestart();
            });
            /* App.controlls.append(gameStartButton);
            App.controlls.append(gameRestartButton);
 */
            //append game restart button [returns pokemon back to galery], resets scores
        }
    });
    pokemon.click(() => {
        $('.pokemon-active').removeClass('pokemon-active');
        $('.card-active').removeClass('card-active');
        pokemon.addClass('pokemon-active');

            const spinner=$('<div class="spinner"></div>');
           
         //($('.pokemon-detail').attr('alt') !== pokemonName) 
            if($('.pokemon-detail')){
                $('.pokemon-detail').remove();
            }
            if($('.card-detail')){
                $('.card-detail').remove();
            }
            if($('.detail-info')){
                $('.detail-info').remove();
            }
            
            const pokemonDetailImg = $('<img>');
            pokemonDetailImg.attr('src', `https://img.pokemondb.net/artwork/${pokemonName.toLowerCase()}.jpg`);
            pokemonDetailImg.attr('alt', pokemonName);
            pokemonDetailImg.attr('class', 'pokemon-detail');
            App.statsArea.append(pokemonDetailImg);
            App.statsArea.append(spinner);
            $.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`).done((resp) => {
                const pokemonInfo = $(`<div class="pokemon-info">
            <div class="detail-info">
                <label>Name: ${resp.name}</label>
            </div>
            <div class="detail-info">
                <label>Height: ${resp.height}</label>
            </div>
            <div class="detail-info">
                <label>ID: ${resp.id}</label>
            </div>
            <div class="detail-info">
                <label>Weight: ${resp.weight}</label>
            </div>
        </div>`);
                App.statsArea.append(pokemonInfo);

            }).always(() => {
                spinner.remove();
            });
        


    });
    App.pokemonSelect.append(pokemon);

};


$(document).ready(() => {
    App.init();
    App.createPokemonList();
    App.gameRestartButton.hide();
    App.gameStartButton.hide();



    /*  App.prew.click(() => {
         App.pokemonSelect.scroll(-100, 0);
     });
     App.next.click(() => {
         App.pokemonSelect.scroll(100, 0);
     }); */


});

