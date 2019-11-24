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

var heading = document.querySelector('h1');
heading.innerHTML = 'My pokedex';

var body = document.querySelector('body');
//console.log(body.innerHTML);

var pokemonNameInput = document.querySelector('#pokemon-name');
var pokemonList = document.querySelector('#pokemon-list');

var submitButton = document.querySelector('#submit-button');
submitButton.addEventListener('click', function () {
    // creating elements using strings
    // var pokemon = '<li>' + pokemonNameInput.value + '</li>';
    // pokemonList.innerHTML += pokemon;

    // creating elements using createElement 

    var pokemonName = pokemonNameInput.value;
    pokemonName = pokemonName.toLowerCase().trim();
    //
    if (!pokemonName) {
        return alert('Please enter a valid pokemon name');
    }

    var pokemonNames = pokemonName.split(' ');

    for(var i = 0; i < pokemonNames.length; i++) {
        createPokemon(pokemonNames[i]);
    }

});

var createPokemon = function (pokemonName) {
    var pokemon = document.createElement('li');
    pokemon.innerText = pokemonName;
    pokemonList.appendChild(pokemon);

    var pokemonImage = document.createElement('img');
    pokemonImage.alt = pokemonName;
    pokemonImage.src = 'https://img.pokemondb.net/artwork/large/' + pokemonName + '.jpg';

    pokemon.appendChild(pokemonImage);
    pokemonNameInput.value = '';
};

