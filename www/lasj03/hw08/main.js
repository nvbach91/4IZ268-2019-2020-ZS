/* HOMEWORK NUMERO CINCO */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
var date = new Date();
var year = date.getFullYear();
var PepasBirthdayYear = 1990;
var PepasAge = year - PepasBirthdayYear;
var vysledek1 = "Pepa is " + PepasAge.toString() + " years old.";
console.log(vysledek1);

/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */
// Solution here
console.log("10 °C je " + (((10 * 9) / 5) + 32).toString() + " °F");
console.log("50 °F je " + (((50 - 32) * 5) / 9).toString() + " °C");

/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */
// Solution here

function temperature(a, b) {
    if (a == 1) {
        var vysledek = (b.toString() + " °C je " + (((b * 9) / 5) + 32).toString() + " °F");
        //console.log(vysledek);
    } else if (a == 2) {
        var vysledek = (b.toString() + " °F je " + (((b - 32) * 5) / 9).toString() + " °C");
    } else {
        var vysledek = "Nepodporovaný vstup";
    }
    console.log(vysledek);
    return vysledek;
}
temperature(1, 10);
temperature(2, 50);

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 */
// Solution here

function zaokrouhleni(a, b) {
    if (b == 0) {
        return null;
    } else {
        var vysledek = ((a / b).toFixed(2)) * 100;
        console.log(vysledek + "%");
        return vysledek;
    }
}
zaokrouhleni(2, 0);

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla 
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste 
 * je párkrát zavolat v kódu a výsledky uložit do proměnných. 
 */
// Solution here
function comparer(a, b) {
    if (a === b) {
        console.log("rovnají se");
    } else if (a > b) {
        console.log(a + " je vetší než " + b);
    } else {
        console.log(b + " je vetší než " + a);
    }
}

comparer(2, 3);

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for loop. 
 */
// Solution here
function pattern() {
    for (var i = 0; i * 13 <= 730; i++) {
        console.log(i * 13);
    }
}
//pattern();

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 */
// Solution here
function kruznice(a) {
    var vysledek = a * a * 3.14;
    console.log(vysledek);
    return vysledek;
}
kruznice(1);

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 */
// Solution here

function kuzel(vyska, polomer) {
    var vysledek = 1 / 3 * 3.14 * polomer * polomer * vyska;
    console.log(vysledek);
    return vysledek;
}
kuzel(1, 1);



/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no. 
 */
// Solution here
function trojuhelnik(a, b, c) {
    if (a + b > c && a + c > b && b + c > a) {
        console.log("yes");
        return true;
    } else {
        console.log("no");
        return false;
    }
}
trojuhelnik(1, 1, 10);

/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, 
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze, 
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt() 
 */
// Solution here

function trojuhelnik2(a, b, c) {
    if (a + b > c && a + c > b && b + c > a) {
        var s = (a + b + c) / 2;
        var vysledek = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        console.log(vysledek);
        return vysledek;
    } else {
        console.log("no");
        return null;
    }
}
trojuhelnik2(1, 1, 1);