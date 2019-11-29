/* HOMEWORK NUMERO CINCO */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození,
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou
 * angličtinu.
 */
// Solution here

var year = 1993;
var currentYear = new Date().getFullYear()
var age
age = currentYear-year
var statement = "Pepa is " + age + " years old"
statement

/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak.
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32.
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou.
 */
// Solution here

var far = 20
var cel = 90
var solFar = ((cel - 32) * 5) / 9
var solCel = ((far * 9) / 5) + 32
var solution1 = cel + "°C =  " + solFar + "°F"
var solution2 = solCel + "°C =  " + far + "°F"
solution1
solution2

/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce,
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli.
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce.
 */
// Solution here


function myAge(age) {
   var currentYear = new Date().getFullYear()
   return "Pepa is " + (currentYear - age) + " years old"
}

function myTemp(temp, version) {
  var solFar = ((temp - 32) * 5) / 9
  var solCel = ((temp * 9) / 5) + 32
  if (version==1) {
    return temp + "°C =  " + solFar + "°F"
  } else if (version==2) {
    return solCel + "°C =  " + temp + "°F"
  } else {
    return "???"
  }
}

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou!
 */
// Solution here

function myPercent(p1, p2) {
  var solution
  if (p2==0) {
    return "nulou nelze dělit!"
  } else {
    solution = p1/p2*100
    return p1 + " je "+solution.toFixed(2)+"% z "+p2
  }
}

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste
 * je párkrát zavolat v kódu a výsledky uložit do proměnných.
 */
// Solution here

function myFunction5(p1, p2) {
  if (p1>p2) {
    return p1
  } else if (p1<p2) {
    return p2
  } else {
    return "Cisla jsou stejna"
  }
}

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for loop.
 */
// Solution here

function myNasobky() {
   var i;
   var text;
   for (i = 0; i*13 <= 130; i++) {
    text += 13*i +", "
   }
   return text
}

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 */
// Solution here

function myKruznice(r) {
var pi = 3.1415926535
return pi*r*r
}

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 */
// Solution here

function myKuzel(v, p) {
var pi = 3.1415926535
return (1/3)*pi*p*p*v
}

/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no.
 */
// Solution here

function myTrojuhelnik (a, b, c){
   if (a + b > c && a + c > b && c + b > a ){
    return true;
   }
   else {
    return false;
   }
}

/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce,
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze,
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt()
 */
// Solution here

function myHeron (a, b, c){
   if (myTrojuhelnik(a, b, c) == false ){
    return "nemá smysl";
   }
   else {
    var s = (a+b+c)/2
    return Math.sqrt(s*(s-a)*(s-b)*(s-c))
   }
}
