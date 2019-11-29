/* HOMEWORK NUMERO CINCO */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození,
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou
 * angličtinu.
 */

var person = {
    name: 'Pepa',
    year: 1985
};

var task1 = function (p) {
    var today = new Date();
    var pepesAge = today.getFullYear() - p.year;
    var sentence = p.name + ' je ' + pepesAge + ' let starý.'
    console.log(sentence)
};

task1(person);

/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak.
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32.
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou.
 */

var fahrenheit = function (a) {
    return a * 9 / 5 + 32;
};

console.log('20°C = ' + fahrenheit(20) + '°F');

var celsius = function (a) {
    return (a - 32) * 5 / 9;
};

console.log('68°F = ' + celsius(68) + '°C');

/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce,
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli.
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce.
 */

var ageInfo = function (name, year) {
    var today = new Date();
    var age = today.getFullYear() - year;
    console.log(name + " je " + age + " let starý.");
};

var fahrenheit = function (a) {
    var transfer = a * 9 / 5 + 32;
    console.log(a + '°C = ' + transfer + '°F')
};

var celsius = function (a) {
    var transfer = (a - 32) * 5 / 9;
    console.log(a + '°F = ' + transfer + '°C')
};

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou!
 */

var task4 = function (a, b) {
    var c = a / b * 100;
    if (b !== 0) {
        console.log(a + ' je ' + c.toFixed() + '%' + ' z ' + b)
    } else {
        console.log('Dělit 0 nelze!')
    }
};

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste
 * je párkrát zavolat v kódu a výsledky uložit do proměnných.
 */

var task5 = function (a, b) {
    if (a > b) {
        console.log(a);
    }
    else if (b > a) {
        console.log(b);
    }
    else {
        console.log('čísla se rovnají');
    }
};

var task5Test = function (p) {
    if (p.a > p.b) {
        console.log(p.a);
    }
    else if (p.b > p.a) {
        console.log(p.b);
    }
    else {
        console.log('čísla se rovnají');
    }
};

var test1 = {
    a: 5,
    b: 2
};

var test2 = {
    a: 2.001,
    b: 2.00001
};

var test3 = {
    a: 5 / 2,
    b: 2 / 3
};

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for loop.
 */

var task6 = function () {
    for (var i = 0; i * 13 <= 730; i++) {
        console.log(i * 13);
    }
};

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 */

var task7 = function (a) {
    var b = Math.PI * Math.pow(a, 2);
    console.log('S = ' + b);
};

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 */

var task8 = function (a, b) {
    var c = 1 / 3 * Math.PI * Math.pow(a, 2) * b
    console.log('V = ' + c);
};

/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no.
 */

var task9 = function (a, b, c) {
    if (a + b > c && a + c > b && b + c > a) {
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

var task10 = function (a, b, c) {
    if (task9(a, b, c) == true) {
        s = (a + b + c) / 2
        area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        console.log('S = ' + area);
    }
    else {
        console.log('Takový trojúhelník neexistuje.');
    }
}