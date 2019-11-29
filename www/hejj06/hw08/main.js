/* HOMEWORK NUMERO CINCO */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
// Solution here

var person = {
    name: "Pepa",
    birthday: new Date('1997-05-04')
};

function _calculateAge(birthday) {
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

console.log("Pepa je " + _calculateAge(person.birthday) + " let starý.");



/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */
// Solution here

var celsius = 20;
var fahrenheiht = 68;

function celsiusToFahrenheiht(c) {
    var fahrenheiht = (c*9)/5 + 32;
    return fahrenheiht;
}

function fahrenheihtToCelsius(f) {
    var celsius = (((f-32)*5)/9);
    return celsius;
}

console.log(celsius + "°C = " +celsiusToFahrenheiht(celsius) + "°F");
console.log(fahrenheiht + "°F = " + fahrenheihtToCelsius(fahrenheiht) + "°C");


/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */
// Solution here


function _calculateAge2(birthday) {
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return console.log("Pepa je " + Math.abs(ageDate.getUTCFullYear() - 1970) + " let starý.");
}

_calculateAge2(person.birthday);


var c1 = 20;
var c2 = 30;
var c3 = 40;
var f1 = 68;
var f2 = 90;
var f3 = 104;

function celsiusToFahrenheiht2(c) {
    var fahrenheiht = (c*9)/5 + 32;
    return console.log(c +  "°C = " + fahrenheiht +  "°F");
}

function fahrenheihtToCelsius2(f) {
    var celsius = (((f-32)*5)/9);
    return console.log(f +  "°F = " + celsius +  "°C");
}

celsiusToFahrenheiht2(c1);
celsiusToFahrenheiht2(c2);
celsiusToFahrenheiht2(c3);
fahrenheihtToCelsius2(f1);
fahrenheihtToCelsius2(f2);
fahrenheihtToCelsius2(f3);


/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 */
// Solution here

function percentage(a, b){
    if (b === 0){
        return console.log("Nulou dělit nelze!");
    }
    var p = (a/b) * 100;
    return console.log(a + " je " + p.toFixed(2) + "% z " + b);
}

percentage(21,42);


/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla 
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste 
 * je párkrát zavolat v kódu a výsledky uložit do proměnných. 
 */
// Solution here

function biggerOne(a, b){
    if (a === b){
        return console.log(a + " = " + b);
    }
    if(a > b){
        return a;
    }
    else{
        return b;
    }
}

biggerOne(6,6);

var a = biggerOne(6,10);
var b = biggerOne(10,6);
var c = biggerOne(5.8,3.3);
var d = biggerOne(5/8,6/8);

console.log(a);
console.log(b);
console.log(c);
console.log(d);



/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for loop. 
 */
// Solution here


function loop13(){
    for(i=0;i<=730;i = i + 13){
        console.log(i);
    }
}

loop13();

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 */
// Solution here

function areaOfACircle(r){
    var s = Math.PI*(r*r);
    return console.log("Obsah kruhu je " + s.toFixed(2) + " cm².");
}

areaOfACircle(10);

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 */
// Solution here

function volumeOfCone(v, r){
    var volume = (1/3) * Math.PI * (r*r) * v;
    return console.log("Objem kuželu je " + volume.toFixed(2) + " cm³");
}

volumeOfCone(5,9);

/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no. 
 */
// Solution here

function isItTriangle(a,b,c){
    if ((a+b)>c && (b+c)>a && (a+c)>b){
        console.log(true);
    }
    else{
        console.log(false);
    }
}

isItTriangle(3,3,3);
isItTriangle(3,5,7);
isItTriangle(3,6,3);
isItTriangle(3,20,3);


/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, 
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze, 
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt() 
 */
// Solution here

function heronsFormula(a,b,c){
    if ((a+b)>c && (b+c)>a && (a+c)>b){
        var s = (a+b+c)/2;
        var area = Math.sqrt(s*(s-a)*(s-b)*(s-c))
        console.log("Obsah trojúhelníka je " + area);
    }
    else{
        console.log("Nelze sestavit trojúhelnik.");
    }
}

heronsFormula(3,3,3);
heronsFormula(10,5,6);
heronsFormula(3,6,3);
