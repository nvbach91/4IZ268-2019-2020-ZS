/* HOMEWORK NUMERO CINCO */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */

var person = {
  name: "Pepa",
  age: 21,
} 

var printInfo = function(p){
  return "Osoba jménem " + p.name + " je stará " + p.age + " let.";
}

console.log(printInfo(person));

/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */

temperatureInC = 10;
temperatureInF = 50;

var printConvertedT = function(c, f){
  return c + "°C = " + (c * 9 / 5 + 32).toFixed(2) + "°F \n" 
       + f + "°F = " + ((f - 32) * 5 / 9).toFixed(2) + "°C \n";
} 

console.log(printConvertedT(temperatureInC, temperatureInF));


 /**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */

 /**
  * Převede teplotu zadanou ve Fahrenheiht na Celsius
  * 
  * @param {*} f teplota ve Fahrenheiht
  */
 var convertToC = function(f){
  if(isNaN(f)){
    return "Musíte zadat číslo.";
  } 
  c = ((f - 32) * 5 / 9).toFixed(2);

  return f + "°F = " + c + "°C";
} 

/**
* Převedu tepletu zadanou v Celsius na Fahrenheint
* 
* @param {*} c teplota ve Celsius 
*/

var convertToF = function(c){
  if(isNaN(c)){
    return "Musíte zadat číslo." 
  } 

  f = (c * 9 / 5 + 32).toFixed(2);
  return c + "°C = " + f + "°F";
}

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 */

var division = function(a, b){
  if(isNaN(a) || isNaN(b)){
    return "zadejte čísla!";
  } 
  
  if(b === 0){
    return "Nelze dělit nulou."
  } 
  
  return a + " je " + (a / (b / 100)).toFixed(2) + "% z " + b;   
} 


/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla 
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste 
 * je párkrát zavolat v kódu a výsledky uložit do proměnných. 
 */

 var biggerNumber = function(a, b){
   if(isNaN(a) || isNaN(b)){
     return "Musíte zadat čísla";
   }

   if(a === b){
     return "Čísla se rovnají";
   }

   return Math.max(a,b);
 }

 /**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for loop. 
 */

 var currentNumber = 0;
 var nasobky = "Násobky 13: ";
 for(var i = 0;; i++){
  
   currentNumber = i * 13;

   if(currentNumber > 730){
     break;
   }

   if(i == 0){
     nasobky += currentNumber;
   } else {
    nasobky += ", "+ currentNumber;
   }

 }

 console.log(nasobky);

 /**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 */

var circleVolume = function(r){
  if(isNaN(r)){
    return "Musíte zadat číslo.";
  }

  if(r <= 0){
    return "Poloměr by měl být větší jak 0";
  }

  return (Math.PI * Math.pow(r, 2)).toFixed(2);

}

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 */

 var coneVolume = function(h, r){
   if(isNaN(r) || isNaN(r)){
     return "Oba argumenty musí být čísla.";
   }

   if(r <= 0 || h <= 0){
     return "Výška i poloměr musí být větší jak 0.";
   }

   return (1/3 * Math.PI * Math.pow(r,2) * h).toFixed(2);
 }

 /** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no. 
 */

 var isTriangle = function(a,b,c){
   if(isNaN(a) || isNaN(b) || isNaN(c)){
     return "Musíte zadat čísla.";
   }

   if(a <= 0 || b <= 0 || c <= 0){
     return "Delky stran musí být větší jak 0.";
   }
   
   if( !((a + b) > c)){ return false; }
   if( !((a + c) > b)){ return false; }
   if( !((b + c) > a)){ return false; }

   return true;
  
 }

 /**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, 
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze, 
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt() 
 */

var triangleVolume = function(a,b,c){


  if(!(isTriangle(a,b,c) == true)){
    return "Ujistěte se, že jste zadali délky stran, které mohou utvořit trojúhelník.";
  }

  /* half circuit */
  var hc = (a + b + c) / 2;
  
  return ( Math.sqrt(hc * (hc - a) * (hc - b) * (hc - c)) ).toFixed(2);
 
}


