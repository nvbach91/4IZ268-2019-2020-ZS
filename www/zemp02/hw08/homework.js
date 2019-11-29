/* HOMEWORK NUMERO CINCO */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
// Solution here

var dateOfBirth = 1990;
var age = new Date().getFullYear() - dateOfBirth;;
console.log('Petrovi je ' + age + ' let.')





/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */
// Solution here
var celsius = 20;
var fahrenheit = 68;

var countFahrenheit = ((celsius * 9) / 5) + 32;

var countCelsius = (fahrenheit - 32) * 5 / 9;

console.log('20°C = ' + countFahrenheit + '°F and 68°F = ' + countCelsius + '°C')



/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce,
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli.
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce.
 */
// Solution here
function countCelsiusFunction(fahrenheit) {
    var celsius = (fahrenheit - 32) * 5 / 9;
    return fahrenheit + '°F = ' + celsius + '°C';
}

function countFahrenheitFunction(celsius) {
    var fahrenheit = ((celsius * 9) / 5) + 32;
    return celsius + '°C = ' + fahrenheit + '°F';
}



/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou!
 */
// Solution here
function percenter(firstNumber, secondNumber) {
    if (secondNumber == 0) {
        return 'impossible to divide by zero.';
    } else {
        var result = firstNumber / secondNumber;
        result.toFixed(2);
        return firstNumber + ' je ' + result * 100 + '%' + ' z ' + secondNumber;
    }
}




/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste
 * je párkrát zavolat v kódu a výsledky uložit do proměnných.
 */
// Solution here

function comparator(a, b) {

    if (a > b) {
        return a;
    }else if (a<b){
        return b;
    }else if (a==b){
        return 'čísla se rovnají';
    }else{
        return 'I have no idea what you did but you broke this';
    }
}

var number = comparator(10,2);
var float = comparator(10.2,10.1);
var fraction = comparator(10/2,10/3);

console.log(number,float,fraction);




/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for loop.
 */
// Solution here
var x="0";
for(i=1;i*13<=730;i++){
    x = x + ', ' + i*13;
    
}
console.log(x);




/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 */
// Solution here

function circleArea (r){
    var S =  Math.PI *  Math.pow(r,2);
    return S.toFixed(2);
}




/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 */
// Solution here

function coneVolume (r,v){
    var S =  Math.PI *  Math.pow(r,2);
    var V = S*v*(1/3);
    return V.toFixed(2);
}



/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no.
 */
// Solution here
function checkForTriangle(a,b,c){
    if(((a+b)>c&&((b+c)>a)&&((a+c)>b))){
        return 'true'
    }else{
        return 'false';
    }
}




/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce,
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze,
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt()
 */
// Solution here

function getTriangleArea(a,b,c){
    if (checkForTriangle(a,b,c)==='true'){
        var s = (a+b+c)/2;
        var S = Math.sqrt(s*(s-a)*(s-b)*(s-c));
        return S;
    }else{
        return 'invalid triangle'
    }
}