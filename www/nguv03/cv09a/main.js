//         0123456789012
/*var str = 'Barrack Obama';

console.log(str.length);

console.log(str.indexOf('Obama'));

console.log(str.lastIndexOf('a'));
console.log(str.slice(2, 4));
console.log(str.slice(2));
console.log(str.slice(-3));

str.replace('rack', 'rock');

console.log(str.replace(/a/, 'x'));

console.log(str.replace(/a/g, 'x'));

'abc'.toUpperCase();

'ABC'.toLowerCase();


str.charAt(2);
str.charAt(9);


str.split(' ');

str.split('a');

var str = ' a  xxx  seqwe  qec     ';
str.trim();



var quote = 'Good, better, best.';

for (var i = 0; i < quote.length; i++) {
    var character = quote.charAt(i);
    if (![' ', ',', '.'].includes(character)) {
       console.log(character);
    }
}
*/



var pokemonInput = document.querySelector('#pokemon-name-input');
var button = document.querySelector('#submit-button');
var pokemonList = document.querySelector('#pokemon-list');

button.addEventListener('click', function () {
    var pokemonName = pokemonInput.value;
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
});













