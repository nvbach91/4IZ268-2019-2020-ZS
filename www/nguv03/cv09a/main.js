
/*
https://img.pokemondb.net/artwork/bulbasaur.jpg
https://img.pokemondb.net/artwork/charizard.jpg
*/

const pokemonInput = document.querySelector('#pokemon-name-input');
const button = document.querySelector('#submit-button');
const pokemonList = document.querySelector('#pokemon-list');

button.addEventListener('click', () => {
    const pokemonNameValue = pokemonInput.value.trim();
    if (!pokemonNameValue) {
        return alert('Please enter a pokemon name');
    }
    const pokemonNames = pokemonNameValue.split(',');

    pokemonNames.forEach((pokemonName) => {
        const pn = pokemonName.trim();
        for (let i = 0; i < pokemonList.children.length; i++) {
            const existingPokemon = pokemonList.children[i].getAttribute('data-name');
            if (existingPokemon === pn) {
                console.log('This pokemon is already in your collection');
                return false;
            }
        }
        createPokemon(pn);
    });
    // for (let i = 0; i < pokemonNames.length; i++) {
    //     createPokemon(pokemonNames[i].trim());
    //     if () {
    //         break;
    //     }
    // }
    // let sum = 0;
    // for (let i = 0; i < products.length; i++) {
    //     sum += products[i].price;
    // }
    // console.log(sum);
});

const createPokemon = (pokemonName) => {
    // create li items using strings
    // var pokemon = '<li>' + pokemonName + '</li>';
    // pokemonList.innerHTML += pokemon;
    // pokemonList.innerHTML = pokemonList.innerHTML + pokemon;
    // create li items using createElement
    const pokemon = document.createElement('li');
    //created <li></li>
    pokemon.setAttribute('data-name', pokemonName);
    pokemon.innerText = pokemonName;
    // created <li>pikachu</li>
    pokemonList.appendChild(pokemon);

    const pokemonImage = document.createElement('img');
    pokemonImage.classList.add('pokemon-image')
    pokemonImage.alt = pokemonName;
    //pokemonImage.src = 'https://img.pokemondb.net/artwork/' + pokemonName.toLowerCase() + '.jpg';
    pokemonImage.src = `https://img.pokemondb.net/artwork/${pokemonName.toLowerCase()}.jpg`;

    pokemon.appendChild(pokemonImage);

    // create remove Button
    const pokemonRemoveButton = document.createElement('button');
    pokemonRemoveButton.innerText = 'Remove pokemon';
    pokemonRemoveButton.addEventListener('click', () => {
        // const pokemonToBeDeleted = pokemonList.querySelector('[data-name="' + pokemonName + '"]');
        // pokemonList.removeChild(pokemonToBeDeleted);
        pokemonList.removeChild(pokemon);
    });
    pokemon.appendChild(pokemonRemoveButton);


};














