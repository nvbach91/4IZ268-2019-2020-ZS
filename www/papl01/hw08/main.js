/* HOMEWORK NUMERO CINCO */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
// Solution here

var PepasBirthdaysYear = 1998;
var date = new Date();
var currentYear = date.getFullYear()
var PepasAge = currentYear - PepasBirthdaysYear;
console.log('Pepas age is ' + PepasAge + '.');



/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */
// Solution here

console.log('20 degrees Celsius is ' + (((20 * 9) / 5) + 32).toString() + ' ' + 'Fahrenheiht');
console.log('68 degrees Fahrenheiht is ' + (((68 - 32) * 5) / 9).toString() + ' ' + 'Celsius');


/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */
// Solution here

function HowOldIsPerson(a) {
    var date = new Date();
    var currentYear = date.getFullYear()
    if (a > currentYear) { console.log('Person was not born yet') } else {
        var age = currentYear - a;
        console.log('Person is ' + age + ' years old')

    }
}

HowOldIsPerson(2020)
HowOldIsPerson(1952)

function FahrToCelsius(x) {
    var vysledek = ((x - 32) * 5) / 9;
    console.log(x + ' degrees Fahrenheiht is ' + vysledek);
}

function CelsiusToFarh(y) {
    var vysledek = ((y * 9) / 5) + 32;
    console.log(y + ' degrees Fahrenheiht is ' + vysledek);
}

FahrToCelsius(50);
CelsiusToFarh(10);



/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 */
// Solution here

function rounding(a, b) {
    if (b == 0) { console.log('Cannot be divided by zero'); } else {
        var vysledek = ((a / b)) * 100;
        vysledek.toFixed(2);
        console.log(a + ' is ' + vysledek + '% from ' + b);
    }
}
rounding(20, 40);


/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla 
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste 
 * je párkrát zavolat v kódu a výsledky uložit do proměnných. 
 */
// Solution here

function whatIsBigger(a, b) {
    if (a > b) {
        console.log(a.toFixed(2) + ' is bigger than ' + b.toFixed(2));
    } else if (a < b) {
        console.log(a.toFixed(2) + ' is smaller than ' + b.toFixed(2));
    } else {
        console.log(a.toFixed(2) + ' is as big as ' + b.toFixed(2));
    }
}

whatIsBigger(10, 20);


/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for loop. 
 */
// Solution here

function multiples() {
    for (i = 0; i * 13 <= 730; i++) {
        console.log(i * 13);
    }
}


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 */
// Solution here

function areaOfTheCircle(a) {
    const PI = 3.14;
    var vysledek = (a * a * PI);
    console.log('Area of the circle is ' + vysledek);
}

areaOfTheCircle(10)

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 */
// Solution here

function volumeOfTheCone(r, v) {
    const PI = 3.14;
    var vysledek = (1 / 3 * PI * r * r * v);
    console.log('Volume of the cone is ' + vysledek);
}

volumeOfTheCone(2, 3);



/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no. 
 */
// Solution here

function isTriangle(a, b, c) {
    if (a + b >= c && a + c >= b && c + b >= a) {
        console.log('True');
    } else {
        console.log('False');
    }
}

isTriangle(1, 1, 2)



/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, 
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze, 
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt() 
 */
// Solution here.

function areaOfTheTriangle(a, b, c) {
    if (a + b >= c && a + c >= b && c + b >= a) {
        var polovicniPolomer = ((a + b + c) / 2);
        var vysledek = Math.sqrt(polovicniPolomer * (polovicniPolomer - a) * (polovicniPolomer - b) * (polovicniPolomer - c))
        console.log('Area of the triangle by Herons Formula is ' + vysledek)
    } else {
        console.log('False');
    }
}

areaOfTheTriangle(2, 2, 2)