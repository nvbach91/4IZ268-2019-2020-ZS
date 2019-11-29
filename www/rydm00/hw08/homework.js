/* HOMEWORK NUMERO CINCO */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
var yearOfBirth = new Date('1998');
var today = new Date();
var age = today.getFullYear() - yearOfBirth.getFullYear();
var sentencePepa = 'Jsem Pepa, narodil jsem se v roce ' + yearOfBirth.getFullYear() + ' a je mi ' + age + ' let.';
console.log(sentencePepa);

/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak.
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32.
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou.
 */
// Solution here
var temperatureF = 100;
var temperatureC = 100;
var calculationFtoC = (temperatureF - 32) * 5 / 9;
var calculationCtoF = (temperatureC * 9 / 5) + 32;
var sentenceFtoC = temperatureF + '°F = ' + calculationFtoC + '°C';
var sentenceCtoF = temperatureC + '°C = ' + calculationCtoF + '°F';
console.log(sentenceFtoC);
console.log(sentenceCtoF);

/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce,
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli.
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce.
 */
// Solution here
var getAge = function (year) {
    var yearOfBirth = new Date();
    yearOfBirth.setFullYear(year);
    var today = new Date();
    var myAge = today.getFullYear() - yearOfBirth.getFullYear();
    var sentenceAge = 'Rok narozeni: ' + yearOfBirth.getFullYear() + '. Vek: ' + myAge + ' let.';
    return sentenceAge;
};

var convertFahrenheitToCelsius = function (temperature) {
    var resultFtoC = (temperature - 32) * 5 / 9;
    var sentenceResultFtoC = temperature + '°F = ' + resultFtoC + '°C';
    return sentenceResultFtoC;
};

var convertCelsiusToFahrenheit = function (temperature) {
    var resultCtoF = (temperature * 9 / 5) + 32;
    var sentenceResultCtoF = temperature + '°C = ' + resultCtoF + '°F';
    return sentenceResultCtoF;
};

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou!
 */
// Solution here
var getRatio = function (numA, numB) {
    if (numB == 0) {
        return 'Deleni nulou. Neplatny vstup.';
    } else {
        var ratio = numA / numB * 100;
        var sentenceRatio = numA + ' je ' + ratio.toFixed(2) + ' % z ' + numB;
        return sentenceRatio;
    }
};

/**
 * 5) Kdo z koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste
 * je párkrát zavolat v kódu a výsledky uložit do proměnných.
 */
// Solution here
var getBigger = function (numA, numB) {
    if (numA === numB) {
        return 'Cisla jsou si rovna';
    }
    else if (numA > numB) {
        return numA;
    }
    else {
        return numB;
    }
};
var biggerNumber = getBigger(127, 214);
console.log(biggerNumber);
var biggerFloat = getBigger(5.12, 4.89);
console.log(biggerFloat);
var biggerFraction = getBigger(3 / 4, 3 / 5);
console.log(biggerFraction);

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for loop.
 */
// Solution here
var getMultiples13 = function () {
    for (var i = 0; i <= 730; i = i + 13) {
        console.log(i);
    }
};

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 */
// Solution here
var getAreaOfCircle = function (radius) {
    var resultArea = Math.PI * Math.pow(radius, 2);
    return resultArea;
};

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 */
// Solution here
var getVolumeOfCone = function (height, radius) {
    var resultVolume = 1 / 3 * Math.PI * Math.pow(radius, 2) * height;
    return resultVolume;
};

/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no.
 */
// Solution here
var isTriangle = function (sideA, sideB, sideC) {
    if ((sideA + sideB) > sideC && (sideB + sideC) > sideA && (sideC + sideA) > sideB) {
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
var getAreaOfTriangle = function (sideA, sideB, sideC) {
    if ((sideA + sideB) > sideC && (sideB + sideC) > sideA && (sideC + sideA) > sideB) {
        var s = (sideA + sideB + sideC) / 2;
        var resultArea = Math.sqrt(s * (s - sideA) * (s - sideB) * (s - sideC));
        return resultArea;
    }
    else {
        return 'Zadane delky netvori trojuhelnik';
    }
};
