/* HOMEWORK NUMERO CINCO */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození,
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou
 * angličtinu.
 */
// Solution here

function calculateAge(birthday) {
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}





/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak.
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32.
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou.
 */
// Solution here


function celsiaToFahre(celsia) {
    var temp;
    temp = (((celsia * 9) / 5) + 32);
    console.log(celsia.toString() + "°C = " + temp.toString() + "°F");
}

function fahreToCelsia(fahren) {
    var temp;
    temp = (((fahren - 32) * 5) / 9);
    console.log(fahren.toString() + "°F = " + temp.toString() + "°C");
}

function celsiaORfahre(temper, number) {
    if (temper == "C") {
        celsiaToFahre(number);
    }
    else if (temper == "F") {
        fahreToCelsia(number);
    }
    else {
        console.log("toto neni ani ceslia ani fahreint");
    }


}


celsiaORfahre("C", 20);



/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce,
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli.
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce.
 */
// Solution here





console.log(calculateAge(new Date(1997, 12, 12)).toString());
console.log(calculateAge(new Date(1954, 12, 12)).toString());
console.log(calculateAge(new Date(1961, 12, 12)).toString());
console.log(calculateAge(new Date(1912, 12, 12)).toString());





celsiaORfahre("C", 20);


celsiaORfahre("F", 650);


celsiaORfahre("C", 210);


celsiaORfahre("F", 20);


celsiaORfahre("dasgb", 20);





/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou!
 */
// Solution here
function minCalc(num1, num2) {
    var division;
    if (num2 == 0) {
        division = "Nulou nelze delit";
    } else {
        division = num1 / num2;
        division = division * 100;
        division = "cislo " + num1 + " je " + division.toFixed(3) + "% z " + num2;


    }
    return division;
}

console.log(minCalc(2, 10));
console.log(minCalc(2, 0));
console.log(minCalc(2, 540));
console.log(minCalc(321, 10));



/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste
 * je párkrát zavolat v kódu a výsledky uložit do proměnných.
 */
// Solution here


function larger(num1, num2) {
    if (num1 > num2) {
        return num1;
    }
    if (num1 < num2) {
        return num2;
    }
    if (num1 === num2) {
        return "cisla se rovnaji";
    }

}


console.log("vetsi cislo je ? " + larger(10, 20));
console.log("vetsi cislo je ? " + larger(40, 20));
console.log("vetsi cislo je ? " + larger(0, 0));
console.log("vetsi cislo je ? " + larger(0.21, 0.454));
console.log("vetsi cislo je ? " + larger(6 / 2, 5 / 3));




/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for loop.
 */
// Solution here


function sort() {

    for (i = 0; i < 60; i++) {
        if ((13 * i) <= 730) {
            console.log(i);
        }
    }

}


sort();

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 */
// Solution here



function content(radius) {
    return Math.PI * (radius * radius);

}

console.log(content(5));



/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 */
// Solution here


function cone(height, radius) {
    return 1 / 3 * Math.PI * (radius * radius) * height;

}

console.log(cone(10, 10));

/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no.
 */
// Solution here

function triangle(a, b, c) {
    if (((a + b) > c) && ((a + c) > b) && ((b + c) > a)) {
        return true;
    }
    else {
        return false;
    }

}

console.log(triangle(5, 4, 3));
console.log(triangle(5, 1, 1));







/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce,
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze,
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt()
 */
// Solution here

function heroinFormula(a, b, c) {
    if (triangle(a, b, c)) {
        var product;
        var s;
        s = (a + b + c) / 2;
        product = s * (s - a) * (s - b) * (s - c);
        product = Math.sqrt(product);
        return product;
    } else {
        return "Neni to trojuhelnik";
    }

}

console.log(heroinFormula(5, 4, 3));
console.log(heroinFormula(5, 1, 1));




