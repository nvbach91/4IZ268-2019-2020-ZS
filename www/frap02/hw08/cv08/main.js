/* HOMEWORK NUMERO CINCO */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození,
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou
 * angličtinu.
 */
var year = 1997;

console.log("Pepa se narodil v roce " + year + ", má tedy " + (2019 - year) + " let.");




/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak.
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32.
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou.
 */
var celsius = 30;
var fahrenheiht = 50;

console.log("30°C je " + ((celsius*9/5)+32) +"°F");
console.log("50°F je " + ((fahrenheiht-32)*5/9) +"°C");



/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce,
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli.
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce.
 */
var yearFunction = function (a) {
    console.log("Pepa se narodil v roce " + a + ", má tedy " + (2019 - a) + " let.");
};


var conventorCel = function (a) {
    console.log("30°C je " + ((a*9/5)+32) +"°F");
};

var conventorFar = function (a) {
    console.log("50°F je " + ((a-32)*5/9) +"°C");
};




/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou!
 */
var percent = function (a, b) {
    if (b !== 0) {
        console.log(a + " je " + (a/b*100) + "% z " + b);
    }
    else {
        console.log("Dělení nulou,není definováno.");
    }
};





/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste
 * je párkrát zavolat v kódu a výsledky uložit do proměnných.
 */
var comparison = function (a, b) {
    if (a > b) {
        return a;
    }
    if (a < b) {
        return b;
    }
    else {
        console.log("Čísla se rovnají.")
    }
};




/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for loop.
 */
var array = [];
var multiples = function () {
    for (var i = 0; i <= 730 && i % 13 === 0; i++) {
        console.log(array[i]);
    }
};



/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 */


var area = function (a) {
    var number = a;
    var value = Math.pow(number, 2);
    const PI = 3.14159;
    return value * PI;
};





/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 */
var volume = function (a, b) {
    var height = a;
    var radius = b;
    var value = Math.pow(radius, 2);
    const PI = 3.14159;
    return (PI*value*height)/3;
};





/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no.
 */
var triangle = function (a, b, c) {
    return (a + b) > c && (a + c) > b && (b + c) > a;
};



/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce,
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze,
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt()
 */
var heron = function (a, b, c) {
    if ((a + b) > c && (a + c) > b && (b + c) > a) {
        var s = (a + b + c)/2;
        return Math.sqrt((s*(s-a)*(s-b)*(s-c)));
    }
    else {
        console.log("Trojúhelník není definován.")
    }
};