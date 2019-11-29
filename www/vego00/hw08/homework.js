/* HOMEWORK NUMERO CINCO */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
// Solution here
var name = 'Pepa';
var yearOfbirth = 1985;
var pepaAge = new Date().getFullYear() - yearOfbirth;
var sentence = 'Ahoj, ja jsem ' + name + '. Je mi ' + pepaAge + ' let.'
alert(sentence);

/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */
// Solution here

var celsus = 20;
var farengeit = celsus * 9 / 5 + 32;

console.log(celsus + '°C=' + farengeit + '°F');



var farengeit = 68;
var celsus = (farengeit - 32) * 5 / 9;

console.log(farengeit + '°F=' + celsus + '°C');


/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */
// Solution here

var printPersonInfo = function (yearOfbirth, name) {
  var today = new Date();
  var personAge = today.getFullYear() - yearOfbirth;
  var sentence = 'Ahoj, ja jsem ' + name + '. Je mi ' + personAge + ' let.'
  console.log(sentence);
};


var calcTempFar = function (celsus) {
  var farengeit = celsus * 9 / 5 + 32;
  console.log(celsus + '°C=' + farengeit + '°F');
};


var calcTempCel = function (farengeit) {
  var celsus = (farengeit - 32) * 5 / 9;
  console.log(farengeit + '°F=' + celsus + '°C');
};




/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 */
// Solution here

var divisionNumb = function (a, b) {
  var c = a / b * 100;
  if (b == 0) {
    return "Pozor na dělení nulou!";
  } else {
    return a + ' je ' + c.toFixed(2) + '% z ' + b;
  }
};


/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla 
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste 
 * je párkrát zavolat v kódu a výsledky uložit do proměnných. 
 */
// Solution here

var bigNum = function (a, b) {
  if (a > b) {
    console.log(a)
  }
  if (a < b) {
    console.log(b)
  }
  if (a == b) {
    console.log('čísla se rovnají')
  }
};

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for loop. 
 */
// Solution here

var numList = function () {
  for (let i = 0; i * 13 < 730; i++) {
    console.log(i * 13);
  }
};
/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 */
// Solution here

var circleAre = function (radius) {
  var s = Math.PI.toFixed(2) * Math.pow(radius, 2);
  console.log('Obsah kružnice je ' + s + ' sm2');
};

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 */
// Solution here
var coneVolume = function (height, radius) {
  var s = Math.PI.toFixed(2) * Math.pow(radius, 2);
  var v = (1 / 3 * s * height).toFixed(2);
  console.log('Objem kuželi je ' + v + ' sm 3');
};

/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no. 
 */
// Solution here

var triangleRule = function (a, b, c) {
  if (a + b > c && a + c > b && b + c > a) {
    return true;
  } else {
    return false;
  }
};

/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, 
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze, 
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt() 
 */
// Solution here

var triangAre = function (a, b, c) {
  if (a + b > c && a + c > b && b + c > a) {
    var p = (a + b + c) / 2;
    return Math.sqrt(p * (p - a) * (p - b) * (p - c)).toFixed(2);
  } else {
    return false;
  }
};


