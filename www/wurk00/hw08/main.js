/* HOMEWORK NUMERO CINCO */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
// Solution here

var person = {
    name: "Pepa",
    birtday: new Date(1994, 10, 19),
};
var age = new Date().getFullYear() - person.birthday.getFullYear();
console.log("Hello, my name is " + name + " and I'm " + age + " years old.");


/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */
// Solution here

var fahrenheit = 68;
var celsius = 20;
var calcCelsiusToFahrenheit = ((celsius * 9) / 5) + 32;
var calcFahrenheitToCelsius = ((fahrenheit - 32) * 5) / 9;
var sentenceFromCelToFah = celsius + '°C = ' + calcCelsiusToFahrenheit + '°F';
var sentenceFromFahToCel = fahrenheit + '°F = ' + calcFahrenheitToCelsius + '°C';
console.log(sentenceFromCelToFah);
console.log(sentenceFromFahToCel);


/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */
// Solution here

function age(person) {
    console.log("Pepa is " + (new Date().getFullYear() - person.birthday.getFullYear()) + " y.o.");
}
function cToF(c) {
    console.log((c + "°C = " + (c * 9 /5 + 32) + "°F"));
}
function fToC(f) {
    console.log((f + "°F = " + ((f - 32) * 5 / 9) + "°C"));
}

cToF(5);
cToF(70);
fToC(18);
fToC(19);


/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 */
// Solution here

function calculation (a, b) {
    if (b == 0) {
        return console.log('Cannot be divided by zero'); 
    } 
    else 
    {
        var result = ((a / b)) * 100;
        result.toFixed(2);
        console.log(a + ' is ' + result + '% from ' + b);
    }
}

calculation(125, 38);
calculation(4, 0);


/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla 
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste 
 * je párkrát zavolat v kódu a výsledky uložit do proměnných. 
 */
// Solution here

function compare (a, b) {
    if (a < b) {
        return b;
    }
    else {
        if (a > b) {
            return b;
        }
        else {
            return "Numbers are equal"
        }
    }
}

var test1 = getBigger(33, 66);
var test2 = getBigger(-57, 0);
var test3 = getBigger(99, 99);
var test4 = getBigger(3.14, 28.3);
var test5 = getBigger(2/5, 1/3);


/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for loop. 
 */
// Solution here

var getMultiples13 = function () {
    for (var i = 0; i <= 730; i = i + 13) 
        {
        console.log(i);
        }
}

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 */
// Solution here

function area(r) {
    console.log("Circle area is " + (Math.PI * r * r));
}

area(34);


/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 */
// Solution here

function capacity (v, r) {
    console.log("Cone capacity is " + ((Math.PI * v * r * r )/ 3));
}

capacity(14, 29);


/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no. 
 */
// Solution here

function testTriangle (a, b, c) {
    if ((a + b > c) && (a + c > b) && (b + c > a)) {
        return true;
    } 
    else {
        return false;
    }
}

testTriangle(3, 5, 4);


/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, 
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze, 
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt() 
 */
// Solution here

function triangleArea (a, b, c) {
    if ((triangleArea(a, b, c)) == true) {
        var s = ((a + b + c) / 2);
        var result = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        return result;
    } 
    else {
        return "This triangle does not exist.";
    }
}

triangleArea(13, 11, 8);
triangleArea(7, 11, 2);