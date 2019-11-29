/* HOMEWORK NUMERO CINCO */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
// Solution here
var today = new Date();
var yyyy = today.getFullYear();

var printInformation = function(p) {
    var sentence = "Hello, my name is " + person1.name + " and my age is " + (yyyy - person1.DateOfBirth);
    console.log(sentence)
};

var person1 = {
    name: "Pepe",
    DateOfBirth: 1979,
};

printInformation(person1);


/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */
// Solution here

console.log(20 + "°C = " + (20 * 9 / 5 + 32) + "°F")
console.log(68 + "°F = " + (68 - 32) * 5 / 9 + "°C")

/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */
// Solution here
//1)
var ctf = function(a) {
    return a + "°C = " + (a * 9 / 5 + 32) + "°F";
}
ctf();

var ftc = function(b) {
    return b + "°F = " + (b - 32) * 5 / 9 + "°C";
}
ftc();

//2)
var printInformation = function(n, y) {
    return "Hello, my name is " + n + " and my age is " + (yyyy - y);
};
printInformation();


/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 */
// Solution here
var censored = function(a, b) {
    result = a / b * 100;
    return a + " je " + result.toFixed(2) + "% z " + b;
}
censored();



/**
 * 5) Kdo z koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla 
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste 
 * je párkrát zavolat v kódu a výsledky uložit do proměnných. 
 */
// Solution here

var kzk = function(a, b) {
    if (a === b) {
        return "Čísla A a B se rovnají";
    } else {
        if (a > b) {
            return a + " (číslo A) je větší než " + b + " (číslo B)";
        }
        return b + " (číslo B) je větší než " + a + " (číslo A)";
    }
};



/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for loop. 
 */
// Solution here

var pattern = function() {
    for (var i = 0; i <= 56; i++) {
        console.log(i * 13);
    }
}



/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 */
// Solution here
var circle = function(radius) {
    return "Obsah kružnice dle zadaného poloměru je: " + (radius * radius) * 3.14;
}




/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kužele, pokud dostanete na argumentech výšku a poloměr. 
 */
// Solution here
var cone = function(height, radius) {
    result = (1 / 3) * 3.14 * (radius * radius) * height;
    return "Objem kužele je: " + result.toFixed(2);
}



/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no. 
 */
// Solution here
var triangle = function(a, b, c) {
    if (a + b > c && a + c > b && b + c > a) {
        return true;
    }
    return false;
}



/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, 
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze, 
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt() 
 */
// Solution here
var triangle2 = function(a, b, c) {
    if (a + b > c && a + c > b && b + c > a) {
        var s = (a + b + c) / 2;
        result = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        return "Obsah trojúhelníku dle Heronova vzorce je: " + result.toFixed(2);
    }
    return false + ", při zadaných hodnotách nemůže vzniknout trojúhelník!";
}