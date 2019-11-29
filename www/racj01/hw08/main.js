/* HOMEWORK NUMERO CINCO */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
// Solution here

var person/*Pepa*/ = {
    name: "Pepe",
    birthDate: new Date(1997, 7, 4),
};
var age = new Date().getFullYear() - person.birthDate.getFullYear();
console.log(person.name + " oslaví tento rok " + age + ". " + "narozeniny.");

/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak.
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32.
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou.
 */
// Solution here

var tmp = 20;
var fahr = (tmp * 9) / 5 + 32;
console.log(tmp + "°C = " + fahr + "°F");
console.log(fahr + "°F = " + tmp + "°C");



/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce,
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli.
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce.
 */
// Solution here

var calcAge = function (person) {
    var today = new Date();
    var age = today.getFullYear() - person.birthDate.getFullYear();
    return console.log(person.name + " oslaví tento rok " + age + ". " + "narozeniny.");
};

var person1 = {
    name: "Jožo",
    birthDate: new Date(1993, 7, 4),
};

var person2 = {
    name: "Tom",
    birthDate: new Date(1968, 7, 4),
};

calcAge(person);
calcAge(person1);
calcAge(person2);

var temperature = function (temperature) {
    if (temperature.includes("°C")) {
        var i = 0;
        var temp = []
        while (temperature[i] != "°") {
            temp[i] = temperature[i];
            i++;
        }
        var celsius = temp.join("");
        var fahren = ((celsius * 9) / 5) + 32;
        fahren = fahren.toFixed(1);
        return console.log(celsius + "°C " + "= " + fahren + "°F");
    }
    else if (temperature.includes("°F")) {
        var i = 0;
        var temp = []
        while (temperature[i] != "°") {
            temp[i] = temperature[i];
            i++;
        }
        var fahren = temp.join("");
        var celsius = ((fahren - 32) * 5) / 9;
        celsius = celsius.toFixed(1);
        return console.log(fahren + "°F" + " = " + celsius + "°C");
    }
    else {
        return console.log("Není teplota.")
    }
};

temperature("20°C");
temperature("68°F");
temperature("30°C");
temperature("100°F");
temperature("0°F");
temperature("0°C");


/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou!
 */
// Solution here

var censored = function (a, b) {
    if (a == 0 || b == 0) {
        return console.log("Jedno ze zadaných čísel je rovno 0.")
    }
    var ratio = ((a / b) * 100);
    var percentage = ratio.toFixed(1);
    return console.log(a + " je " + percentage + "% z " + b);
};

censored(21, 42);
censored(42, 21);
censored(90, 30);
censored(25, 0);
censored(30, 100);
censored(25, 50);

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste
 * je párkrát zavolat v kódu a výsledky uložit do proměnných.
 */
// Solution here

var higherWins = function (a, b) {
    if (a == b) {
        return "Zadané čísla se rovnají."
    }
    else if (a > b) {
        return a;
    }
    else {
        return b;
    }
};

var a = higherWins(2, 5);
var b = higherWins(2 / 3, 5 / 3);
var c = higherWins(2.5, 1.5);
var d = higherWins(3.2, 6 / 3);


/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for loop.
 */
// Solution here

var loop = function () {
    for (i = 13; i <= 730; i += 13) {
        console.log(i);
    }
};



/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 */
// Solution here

var geometry = function (r) {
    return (r * r) * Math.PI;
};



/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 */
// Solution here

var cone = function (v, r) {
    return (1 / 3) * (Math.PI * (r * r) * v);
};



/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no.
 */
// Solution here

var isTriangle = function (a, b, c) {
    if ((a + b > c) && (a + c > b) && (c + b > a)) {
        console.log("True");
        return true;
    }

    console.log("False");
    return false;
};



/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce,
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze,
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt()
 */
// Solution here

var heron = function (a, b, c) {
    if (!isTriangle(a, b, c)) {
        return console.log("Není trojúhelník.")
    }

    var s = (a + b + c) / 2;
    var S = Math.sqrt(s * (s - a) * (s - b) * (s - c));

    return S;

};