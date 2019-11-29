/* HOMEWORK NUMERO CINCO */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
// Solution here

var task1 = function (name, age) {
    console.log(name + ' je ' + age + ' let starý.');
}
task1('Pepa', 10);

/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */
// Solution here

var task2 = function (input) {
    if (input.slice(0, -1) == 'C') {
        var teperatureC = input.slice(0, -2);
        var teperatureF = teperatureC * 9 / 5 + 32;
        var output = teperatureF + '°F';
    } else if (input.slice(0, -1) == 'F') {
        var teperatureF = input.slice(0, -2);
        var teperatureC = teperatureF - 32 * 5 / 9;
        var output = teperatureC + '°C';
    }
    console.log(input + ' = ' + output);
}
task2('20°C');

/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */
// Solution here

task1('Pepa', 10);
task2('20°C');

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 */
// Solution here

var task4 = function (num1, num2) {
    if (num2 == 0) {
        console.log('NELZE DELIT NULOU :( ')
    } else {
        var frac = num1 / num2;
        var output = frac.toFixed(2) * 100;
        console.log(num1 + ' je ' + output + '% z ' + num2);
    }
}
task4(10, 5);

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla 
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste 
 * je párkrát zavolat v kódu a výsledky uložit do proměnných. 
 */
// Solution here

var task5 = function (num1, num2) {
    if (num1 > num2) {
        console.log(num1);
    } else if (num1 < num2) {
        console.log(num2);
    } else {
        console.log('cisla se rovnaji');
    }
}
//task5(3 / 3, 10 / 1);
task5(2.1, 2.10000000000000001);

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for loop. 
 */
// Solution here

var task6 = function () {
    var numb = 0;
    for (var i = 0; numb < 730; i++) {
        numb = i * 13;
        console.log(numb);
    }
}
task6()

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 */
// Solution here

var task7 = function (radius) {
    var output = Math.PI * Math.pow(radius, 2);
    console.log(output);
}
task7(5);

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 */
// Solution here

var task8 = function (radius, height) {
    var output = (1 / 3) * Math.PI * Math.pow(radius, 2) * height;
    console.log(output);
}
task8(5, 5);

/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no.
 */
// Solution here

var task9 = function (a, b, c) {
    if (a + b > c && a + c > b && b + c > a) {
        console.log(true);
    } else {
        console.log(false);
    }
}
task9(3, 3, 3);

/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce,
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze,
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt()
 */
// Solution here

var task10 = function (a, b, c) {
    if (task9) {
        var s = (a + b + c) / 2;
        var output = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        console.log(output);
    }
}
task10(3, 3, 3);

