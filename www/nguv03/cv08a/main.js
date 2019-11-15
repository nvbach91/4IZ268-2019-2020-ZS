// Numbers
var age = 42;
var height = 1.6;

// Strings
var name = 'Bohuslav';
var color = 'orange';


// Booleans
var isMarried = false;
var hasChildren = false;
var hasLotsOfMoney = true;

isMarried = true;

// constant cannot be changed after declaration
const PI = 3.14;
// cannot re-assign
//PI = 15;

// function
var add = function (a, b) {
    return a + b;
};

// arrays
var cities = ['Prague', 'Moscow', 'London', 'Berlin'];

// object
var person1 = {
    name: 'Fanda',
    age: 18,
    address: 'Vitkova 10a',
    birthday: new Date('2010-10-01'),
};
var person2 = {
    name: 'Lada',
    age: 18,
    address: 'Vitkova 10a',
    birthday: new Date('2010-10-01'),
};


var printInformation = function (p) {
  var sentence = 'Ahoj, jsem ' + p.name + '. Je mi ' + p.age + ' let';
  console.log(sentence);
};

printInformation(person1);
printInformation(person2);

// if you use return
//console.log(printInformation(person1));

var listArray = function (array) {
    for (var i = 0; i < array.length; i++) {
        console.log(array[i]);
    }
};

listArray(cities);
