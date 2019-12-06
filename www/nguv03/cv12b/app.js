const App = {};

App.init = () => {
    App.pokemonNameInput = $('#pokemon-name');
    App.pokemonList = $('#pokemon-list');
    App.submitButton = $('#submit-button');
};

App.createPokemon = () => {
    
    const pokemon = $('<li>');
    pokemon.attr('data-name', pokemonName);
    pokemon.text(pokemonName);
    pokemonList.append(pokemon);

    const pokemonImage = $('<img>');
    pokemonImage.attr('alt', pokemonName);
    pokemonImage.attr('src', `https://img.pokemondb.net/artwork/large/${pokemonName}.jpg`);

    pokemon.append(pokemonImage);
    pokemonNameInput.val('');

    const pokemonDeleteButton = $('<button>');
    pokemonDeleteButton.text('Remove');

    pokemonDeleteButton.click(() => {
        pokemon.remove();
    });
    pokemon.append(pokemonDeleteButton);
    //pokemonDeleteButton.appendTo(pokemon);

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

            const existingPokemons = pokemonList.children();
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




    
// Dynamically building an unordered list from an array
const names = ['Greg', 'Peter', 'Kyle', 'Danny', 'Mark'];
const peopleList = $("ul#pokemon-list");
let peopleItems = '';
names.forEach((name, index) => {
  peopleItems += `<li id="${index}">${name}</li>`;
});
peopleList.append(peopleItems);
});


























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