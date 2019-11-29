/* HOMEWORK NUMERO CINCO */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
// Solution here

console.log("***** Úkol 1) *****");
var todayYear = new Date().getFullYear();
var yearOfBirth = 1995;
console.log("Pepovi je " + (todayYear - yearOfBirth) + " let.");


/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */
// Solution here

console.log("***** Úkol 2) *****");
var celsius = 20;
var fahrenheiht = 68;
console.log(celsius + "°C = " + (celsius * 9 / 5 + 32) + "°F resp. " + fahrenheiht + "°F = " + ((fahrenheiht - 32) * 5 / 9) + "°C");


/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */
// Solution here

console.log("***** Úkol 3) *****");
function getAge (year) {
    console.log("Pepovi je " + (todayYear - year) + " let.");    
}

getAge(2000);
getAge(1989);

function convertCelToFar (degree) {
    console.log(degree + "°C = " + (degree * 9 / 5 + 32) + "°F");
}

function convertFarToCel (degree) {
    console.log(degree + "°F = " + ((degree - 32) * 5 / 9) + "°C");
}

convertCelToFar(20);
convertFarToCel(68);
convertCelToFar(-5);
convertFarToCel(41);


/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 */
// Solution here

console.log("***** Úkol 4) *****");
function getRatio (a, b) {
    if (b == 0) {
        console.log("Nulou nelze dělit!");
        return 1;
    } 
    
    var result = (a / b) * 100;

    if (result % 1 != 0) {
        result = result.toFixed(2);
    }

    console.log(a + " je " + result + "% z " + b);
    return result;
}

getRatio(21, 42);
getRatio(30, 42);
getRatio(21, 0);


/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla 
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste 
 * je párkrát zavolat v kódu a výsledky uložit do proměnných. 
 */
// Solution here

console.log("***** Úkol 5) *****");
function getBigger (a, b) {
    if (a % 1 != 0) {
        a = a.toFixed(2);
    }

    if (b % 1 != 0) {
        b = b.toFixed(2);
    }

    if (a > b) {
        console.log("Čísla: " + a + ", " + b + ". Větší je " + a);
        return a;
    }

    if (b > a) {
        console.log("Čísla: " + a + ", " + b + ". Větší je " + b);
        return b;
    }

    if (a == b) {
        console.log("Čísla: " + a + ", " + b + ". Jsou stejná");
        return b;
    }
}

var result_1 = getBigger(60, 50);
var result_2 = getBigger(40, 50);
var result_3 = getBigger(-3, -3);
var result_4 = getBigger(2.59, 5.67);
var result_5 = getBigger(31/4, 25/6);


/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for loop. 
 */
// Solution here

console.log("***** Úkol 6) *****");
for (var i = 0; i <= 730; i*=13) {
    if (i == 0) {
        console.log(i);
        i++;
    }
    console.log(i);
}


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 */
// Solution here

console.log("***** Úkol 7) *****");
function getAreaOfCircle (radius) {
    var result = Math.PI * radius * radius;
    result = result.toFixed(2);
    console.log("Obsah kružnice o poloměru " + radius + " je " + result);
}

getAreaOfCircle(2);


/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 */
// Solution here

console.log("***** Úkol 8) *****");
function getVolumeOfCone (height, radius) {
    var result = (Math.PI * radius * radius * height) / 3;
    result = result.toFixed(2);
    console.log("Objem kužele s výškou " + height + " a poloměrem " + radius + " je " + result);
}

getVolumeOfCone(20, 6);


/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no. 
 */
// Solution here

console.log("***** Úkol 9) *****");
function getTriangle (a, b, c) {
    if ((a + b > c) && (a + c > b) && (b + c > a)) {
        return "Yes";
    } else {
        return "No";
    }
}

var triangle_1 = getTriangle(6, 6, 6);
var triangle_2 = getTriangle(6, 6, 12);
console.log(triangle_1);
console.log(triangle_2);


/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, 
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze, 
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt() 
 */
// Solution here

console.log("***** Úkol 10) *****");
function getAreaOfTriangle (a, b, c) {
    if ((getTriangle(a, b, c)) == "Yes") {
        var s = (a + b + c) / 2;
        var result = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        result = result.toFixed(2);
        console.log(result);
    } else {
        console.log("Ze zadaných stran trojúhelník nelze sestrojit.");
    }
}

getAreaOfTriangle(6, 6, 6);
getAreaOfTriangle(6, 6, 12);

