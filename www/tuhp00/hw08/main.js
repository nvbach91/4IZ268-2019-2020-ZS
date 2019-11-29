/* HOMEWORK NUMERO CINCO */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
// Solution here
var birth = 1997;
var calculation = 2019 - birth;
var sentence = 'Pepe is ' + calculation + ' years old.';
console.log(sentence);

/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */
// Solution here
var celsius = 20;
var fahrenheiht = 68;
var celToFah = ((celsius * 9) / 5) + 32;
var fahToCel = ((fahrenheiht - 32) * 5) / 9;
var sentence1 = celsius + '°C = ' + celToFah + '°F';
var sentence2 = fahrenheiht + '°F = ' + fahToCel + '°C';
console.log(sentence1);
console.log(sentence2);

/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */
// Solution here
var ageFunction = function (rokNarození) {
    var birth = 2019 - rokNarození;
    var sentence = 'Pepe is ' + birth + ' years old.';
    console.log(sentence);
};

var temperatureFunction = function (Celsius, Fahrenheiht) {
    var celToFah = ((Celsius * 9) / 5) + 32;
    var fahToCel = ((Fahrenheiht - 32) * 5) / 9;
    var sentencea = Celsius + '°C = ' + celToFah + '°F';
    var sentenceb = Fahrenheiht + '°F = ' + fahToCel.toFixed(0) + '°C';
    console.log(sentencea);
    console.log(sentenceb);
};


/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 */
// Solution here
var censored = function (a, b) {
    if (b == 0) {
        console.log("Nelze dělit nulou.");
    }
    else {
        var calculation = (a / b) * 100;
        var sentence = a + ' je ' + calculation.toFixed(0) + '% z ' + b;
        console.log(sentence);
    }
};

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla 
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste 
 * je párkrát zavolat v kódu a výsledky uložit do proměnných. 
 */
// Solution here
var comparison = function (a, b) {
    if (a < b) {
        return b;
    }
    if (a > b) {
        return a;
    }
    if (a == b) {
        var sentence = 'Čísla se rovnají';
        console.log(sentence);
    }
}

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for loop. 
 */
// Solution here
console.log("Násobky 13");
for (var i = 0; i <= 730; i += 13) {
    console.log(i);
};

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 */
// Solution here
var circle = function (poloměr) {
    var PI = 3.14;
    var calculation = PI * (poloměr * poloměr);
    var sentence = 'Obsah kružnice s poloměrem ' + poloměr + ' je ' + calculation;
    console.log(sentence);
};

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 */
// Solution here
var cone = function (výška, poloměr) {
    var PI = 3.14;
    var calculation = (PI * (poloměr * poloměr) * výška) / 3;
    var sentence = 'Objem kuželu s výškou ' + výška + ' a poloměrem ' + poloměr + ' je ' + calculation;
    console.log(sentence);
};

/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no. 
 */
// Solution here
var triangle = function (a, b, c) {
    if (a + b > c && a + c > b && b + c > a) {
        return true;
    }
    else {
        return false;
    }
};

/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, 
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze, 
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt() 
 */
// Solution here
var heron = function (a, b, c) {
    if (a + b > c && a + c > b && b + c > a) {
        var s = (a + b + c) / 2
        var calculation = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        var sentence = 'Obsah trojúhelníku podle Heronova vzorce je ' + calculation.toFixed(2);
        console.log(sentence);
    }
    else {
        var sentence = 'Trojúhelník nelze sestavit.';
        console.log(sentence);
    }
};