const App = {};

App.createPokemon = (pokemonName) => {
    // create li items using strings
    // var pokemon = '<li>' + pokemonName + '</li>';
    // pokemonList.innerHTML += pokemon;
    // pokemonList.innerHTML = pokemonList.innerHTML + pokemon;
    // create li items using createElement
    const pokemon = $('<li>');
    //created <li></li>
    pokemon.attr('data-name', pokemonName);
    pokemon.text(pokemonName);
    // created <li>pikachu</li>
    App.pokemonList.append(pokemon);
    //pokemonList.append(`<li data-name="${pokemonName}">${pokemonName}</li>`);

    const pokemonImage = $('<img>');
    pokemonImage.addClass('pokemon-image');
    pokemonImage.attr('alt', pokemonName);
    //pokemonImage.src = 'https://img.pokemondb.net/artwork/' + pokemonName.toLowerCase() + '.jpg';
    pokemonImage.attr('src', `https://img.pokemondb.net/artwork/${pokemonName.toLowerCase()}.jpg`);

    pokemon.append(pokemonImage);

    // create remove Button
    const pokemonRemoveButton = $('<button>');
    pokemonRemoveButton.text('Remove pokemon');
    pokemonRemoveButton.click(() => {
        pokemon.remove();
    });
    pokemon.append(pokemonRemoveButton);

    const spinner = $('<div class="spinner"></div>');
    pokemon.append(spinner);
    $.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`).done((resp) => {
        // console.log(resp.name);
        // console.log(resp.height);
        // console.log(resp.id);
        // console.log(resp.weight);
        const pokemonInfo = $(`<div class="pokemon-info">
            <div class="pi-row">
                <label>Name</label>
                <input value="${resp.name}">
            </div>
            <div class="pi-row">
                <label>Height</label>
                <input value="${resp.height}">
            </div>
            <div class="pi-row">
                <label>ID</label>
                <input value="${resp.id}">
            </div>
            <div class="pi-row">
                <label>Weight</label>
                <input value="${resp.weight}">
            </div>
        </div>`);
        pokemon.append(pokemonInfo);
    }).always(() => {
        spinner.remove();
    });

};

App.init = () => {
    // initialize app
    // start scripting
    App.pokemonInput = $('#pokemon-name-input');
    App.submitButton = $('#submit-button');
    App.pokemonList = $('#pokemon-list');

};

$(document).ready(() => {
    App.init();

    App.submitButton.click(() => {
        var pokemonNameValue = App.pokemonInput.val();
        if (!pokemonNameValue) {
            return alert('Please enter a pokemon name');
        }
        const pokemonNames = pokemonNameValue.split(',');
        App.pokemonList.detach();
        pokemonNames.forEach((pokemonName) => {
            const pn = pokemonName.trim();
            const existingPokemons = App.pokemonList.children();
            for (let i = 0; i < existingPokemons.length; i++) {
                const existingPokemonName = existingPokemons.eq(i).attr('data-name');
                if (existingPokemonName === pn) {
                    console.log('This pokemon is already in your collection');
                    return false;
                }
            }
            App.createPokemon(pn);
        });
        App.pokemonList.appendTo('body');
        
        /*
        let pokemonElementsHTML = '';
        pokemonNames.forEach((pokemonName) => {
            pokemonElementsHTML += `<li>${pokemonName}</li>`;
        });
        App.pokemonList.append(pokemonElementsHTML);
*/







    });
    
});

