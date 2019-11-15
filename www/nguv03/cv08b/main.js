console.log('tohle se spustilo z main.js');

// variable declaration + initialization
var age = 15;
var isMarried = false;
var name = 'David';

var abc;

var blank = null;

name = 'Bill';

//let 

//const PI = 3.14;

var add = function (a, b) {
    return a + b;
};

add(10, 20);

// deklarace pole
var cities = ['London', 'Prague', 'Lisbon'];

var list = function (array) {
    for (var i = 0; i < array.length; i++) {
        console.log(array[i]);
    }
};

// pristup k poli pomoci indexu
cities[0];
cities[1];
// deklarace objektu
var person = {
    name: 'Franta',
    age: 15,
    address: 'Prague',
    isMarried: false,
};

// ziskavani hodnot z objektu
person.age;


/*
a++ // a = a + 1
a-- // a = a - 1
6
var a = true;
var b = false;
a && b
a || b
!a
!b
*/

var printInformation = function (p) {
    var sentence = 'Ahoj, ja jsem ' + p.name + '. Je mi ' + p.age + '.';
    console.log(sentence);
  
};

var person = {
    name: 'David',
    age: 24,
    school: 'VSE',
};

printInformation(person);










