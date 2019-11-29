/* HOMEWORK NUMERO CINCO */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
// Solution here
var currentTime = new Date();
var currYear = currentTime.getFullYear();
var birthYear = 1995;
var age = currYear - birthYear;

var pepesAge = 'Pepe was born in ' + birthYear + '. That means he is ' + age + ' years old.';
console.log(pepesAge);

/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */
// Solution here

var celsius = 25;
var calcToFahr = (celsius * 9 / 5) + 32;
var celToFahr = celsius + '°C = ' + calcToFahr + '°F';
console.log(celToFahr);

var fahrenheit = 77;
var calcToCel = (fahrenheit - 32) * 5 / 9;
var fahrToCel = fahrenheit + '°F = ' + calcToCel + '°C';
console.log(fahrToCel);

/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */
// Solution here


function pepesAge(yearOfBirth) {
    var year = yearOfBirth;
    var currentTime = new Date();
    var currYear = currentTime.getFullYear();
    var age = currYear - year;
    var message = 'Pepe was born in ' + year + '. That means he is either ' + (age - 1) + ' or ' + age + ' years old.';
    console.log(message);
}
function celToFahr(celsius) {
    var tempInCel = celsius;
    var calculation = (tempInCel * 9 / 5) + 32;
    var result = celsius + '°C = ' + calculation + '°F';
    console.log(result)
}
function fahrToCel(fahrenheit) {
    var tempInFahr = fahrenheit;
    var calculation = (tempInFahr - 32) * 5 / 9;
    var result = fahrenheit + '°F = ' + calculation + '°C';
    console.log(result)
}


/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 */
// Solution here

function percentage(firstNumber, secondNumber) {
    if (secondNumber !== 0) {
        var calculation = (firstNumber / secondNumber * 100).toFixed(2);
        var result = firstNumber + ' je ' + calculation + ' % z ' + secondNumber + '.';
        console.log(result);
    } else {
        window.alert('Your trying to divide number with 0!!! Try again.');
    }
}



/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste
 * je párkrát zavolat v kódu a výsledky uložit do proměnných.
 */
// Solution here

function greaterThan(firstNumber, secondNumber) {
    if (firstNumber > secondNumber) {
        return firstNumber;
    } else if (firstNumber < secondNumber) {
        return secondNumber;
    } else {
        var result = firstNumber + ' a ' + secondNumber + ' si jsou rovny.';
        return result;
    }
}

var a = greaterThan(36,25);
var b = greaterThan(0.563,1.562);
var c = greaterThan(15/163,8/156);
console.log(a,b,c);

/**
 * 6) I can clearly see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for loop.
 */
// Solution here
function multiples() {
    var i;
    var multiple = 0;
    for (i = 1; multiple <= 730; i++) {
        console.log(multiple);
        multiple = i * 13;
    }
}



/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 */
// Solution here

function contentOfCircle(radius) {
    var S = Math.PI * (Math.pow(radius, 2));
    S = S.toFixed(2);
    console.log(S);
}


/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 */
// Solution here

function volumeOfCone(height, radius) {
    var V = (Math.PI * Math.pow(radius, 2) * height) / 3;
    console.log(V);
}



/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no.
 */
// Solution here


function triangleTest(a, b, c) {
    if ((a + b) > c & (b + c) > a & (a + c) > b) {
        return true;
    } else {
        return false;
    }
}



/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce,
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze,
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt()
 */
// Solution here

function contentOfTriangle(a, b, c) {
    if ((a + b) > c & (b + c) > a & (a + c) > b) {
        var s = (a+b+c)/2;
        var S = Math.sqrt(s*(s-a)*(s-b)*(s-c));
        console.log(S);
    } else {
        window.alert('These values will never make a triangle.');
    }
}


