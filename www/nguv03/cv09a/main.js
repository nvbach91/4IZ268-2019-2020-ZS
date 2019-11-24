
/*
https://img.pokemondb.net/artwork/bulbasaur.jpg
https://img.pokemondb.net/artwork/charizard.jpg
*/

var pokemonInput = document.querySelector('#pokemon-name-input');
var button = document.querySelector('#submit-button');
var pokemonList = document.querySelector('#pokemon-list');

button.addEventListener('click', function () {
    var pokemonName = pokemonInput.value.trim();
    if (!pokemonName) {
        return alert('Please enter a pokemon name');
    }
    // create li items using strings
    // var pokemon = '<li>' + pokemonName + '</li>';
    // pokemonList.innerHTML += pokemon;
    // pokemonList.innerHTML = pokemonList.innerHTML + pokemon;
    // create li items using createElement
    var pokemon = document.createElement('li');
    //created <li></li>
    pokemon.innerText = pokemonName;
    // created <li>pikachu</li>
    pokemonList.appendChild(pokemon);

    var pokemonImage = document.createElement('img');
    pokemonImage.classList.add('pokemon-image')
    pokemonImage.alt = pokemonName;
    pokemonImage.src = 'https://img.pokemondb.net/artwork/' + pokemonName.toLowerCase() + '.jpg';

    pokemon.appendChild(pokemonImage);


});













