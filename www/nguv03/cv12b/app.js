const App = {};

App.init = () => {
    App.pokemonNameInput = $('#pokemon-name');
    App.pokemonList = $('#pokemon-list');
    App.submitButton = $('#submit-button');
};

App.createPokemon = (pokemonName) => {
    
    const pokemon = $('<li>');
    pokemon.attr('data-name', pokemonName);
    pokemon.text(pokemonName);
    App.pokemonList.append(pokemon);

    const pokemonImage = $('<img>');
    pokemonImage.attr('alt', pokemonName);
    pokemonImage.attr('src', `https://img.pokemondb.net/artwork/large/${pokemonName}.jpg`);

    pokemon.append(pokemonImage);
    App.pokemonNameInput.val('');

    const pokemonDeleteButton = $('<button>');
    pokemonDeleteButton.text('Remove');

    pokemonDeleteButton.click(() => {
        pokemon.remove();
    });
    pokemon.append(pokemonDeleteButton);

    //pokemonDeleteButton.appendTo(pokemon);
    const spinner = $('<div class="spinner"></div>');
    pokemon.append(spinner);
    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`,
        method: 'GET',
    }).done((pokemonResp) => {
        console.log(pokemonResp.weight);
        console.log(pokemonResp.name);
        console.log(pokemonResp.id);
        console.log(pokemonResp.height);
        const pokemonInfo = $(`
            <div class="pokemon-info">
                <div class="pi-row">
                    <label>Name</label>
                    <input value="${pokemonResp.name}">
                </div>
                <div class="pi-row">
                    <label>Height</label>
                    <input value="${pokemonResp.height}">
                </div>
                <div class="pi-row">
                    <label>Weight</label>
                    <input value="${pokemonResp.weight}">
                </div>
                <div class="pi-row">
                    <label>ID</label>
                    <input value="${pokemonResp.id}">
                </div>
            </div>
        `);
        pokemon.append(pokemonInfo);
    }).always(() => {
        spinner.remove();
    });

};

$(document).ready(() => {
    App.init();
    App.submitButton.click(() => {
        let pokemonName = App.pokemonNameInput.val();
        pokemonName = pokemonName.toLowerCase().trim();
        if (!pokemonName) {
            return alert('Please enter a valid pokemon name');
        }
        
        const pokemonNames = pokemonName.split(',');
        
        for(let i = 0; i < pokemonNames.length; i++) {
            const pokemonName = pokemonNames[i].trim();
            // check if pokemon already exists

            const existingPokemons =  App.pokemonList.children();
            for (let j = 0; j < existingPokemons.length; j++) {
                const existingPokemon = existingPokemons.eq(j);
                const existingPokemonName = existingPokemon.attr('data-name');
                if (existingPokemonName === pokemonName) {
                    alert('this pokemon ' + pokemonName + ' already exists');
                    return false;
                }
            }

            // create the pokemon and add it to the page
            App.createPokemon(pokemonName);
        }
    });

});

/*
    
// Dynamically building an unordered list from an array
const names = ['Greg', 'Peter', 'Kyle', 'Danny', 'Mark'];
const peopleList = $("ul#pokemon-list");
let peopleItems = '';
names.forEach((name, index) => {
  peopleItems += `<li id="${index}">${name}</li>`;
});
peopleList.append(peopleItems);
});
*/

























/*
// Dynamically building an unordered list from an array
const names = ['Greg', 'Peter', 'Kyle', 'Danny', 'Mark'];
const peopleList = $("ul.people");
let peopleItems = '';
names.forEach((name, index) => {
  peopleItems += `<li id="${index}">${value}</li>`;
});
peopleList.append(peopleItems);


*/