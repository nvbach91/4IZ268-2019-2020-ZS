//         0123456789012
/*var str = "Barrack Obama";

console.log("the string has " + str.length + " characters");

console.log(str.indexOf('k'));

console.log(str.indexOf('a'));
console.log(str.lastIndexOf('a'));
console.log(str.search('a'));

str.slice(2, 4);

str.slice(8);
str.slice(-5);


str.replace('rack', 'rock');
str.replace(/a/g, 'x');

str.toLowerCase();
str.toUpperCase();

str.charAt(8);

str.split(' ').join();

var str2 = '   kjqwe dkjwhe     qkwuehqkjh    ';
str2.trim();

var sentence = 'Pikachu are a species of Pokémon, fictional creatures that appear in an assortment of video games, animated television shows and movies, trading card games, and comic books licensed by The Pokémon Company, a Japanese corporation.';

for (var i = 0; i < sentence.length; i++) {
    var char = sentence.charAt(i);
    if (![',', ' ', '.'].includes(char)) {
        console.log(char);
    }
}
*/
/*
var heading = document.querySelector('h1');
heading.innerHTML = 'My pokedex';

var body = document.querySelector('body');*/
//console.log(body.innerHTML);














const pokemonNameInput = document.querySelector('#pokemon-name');
const pokemonList = document.querySelector('#pokemon-list');
const submitButton = document.querySelector('#submit-button');


submitButton.addEventListener('click', () => {
    // creating elements using strings
    // var pokemon = '<li>' + pokemonNameInput.value + '</li>';
    // pokemonList.innerHTML += pokemon;

    // creating elements using createElement 

    let pokemonName = pokemonNameInput.value;
    pokemonName = pokemonName.toLowerCase().trim();
    //
    if (!pokemonName) {
        return alert('Please enter a valid pokemon name');
    }

    const pokemonNames = pokemonName.split(',');

    for(let i = 0; i < pokemonNames.length; i++) {
        const pokemonName = pokemonNames[i].trim();
        // check if pokemon already exists
        const existingPokemons = pokemonList.children;
        for (let j = 0; j < existingPokemons.length; j++) {
            const existingPokemon = existingPokemons[j];
            const existingPokemonName = existingPokemon.getAttribute('data-name');
            if (existingPokemonName === pokemonName) {
                alert('this pokemon ' + pokemonName + ' already exists');
                return false;
            }
        }

        // create the pokemon and add it to the page
        createPokemon(pokemonName);
    }

});

const createPokemon = (pokemonName) => {
    const pokemon = document.createElement('li');
    pokemon.setAttribute('data-name', pokemonName);
    pokemon.innerText = pokemonName;
    pokemonList.appendChild(pokemon);

    const pokemonImage = document.createElement('img');
    pokemonImage.alt = pokemonName;
    pokemonImage.src = `https://img.pokemondb.net/artwork/large/${pokemonName}.jpg`;

    pokemon.appendChild(pokemonImage);
    pokemonNameInput.value = '';

    const pokemonDeleteButton = document.createElement('button');
    pokemonDeleteButton.innerText = 'Remove';
    pokemonDeleteButton.addEventListener('click', () => {
        pokemonList.removeChild(pokemon);
    });
    pokemon.appendChild(pokemonDeleteButton);


};

