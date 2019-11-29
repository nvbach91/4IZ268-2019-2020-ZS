/* HOMEWORK NUMERO CINCO */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
// Solution here

var printPepaAge = function(p){
    var today = new Date();
    var pepaAge = today.getFullYear()-p.birthday;
    console.log("Jmenuju se "+p.name+". A je mi "+pepaAge+".");
};

var person = {
    name: "Pepa",
    birthday: 1998
};

printPepaAge(person);

/** Second solution from input*/

var printPepaAgeV2 = function(a){
    var today = new Date();
    var pepaAge = today.getFullYear()-a;
    console.log("Jmenuju se Pepa. A je mi "+pepaAge);
}

/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */
// Solution here

var cToF = function(a){
    return a*9/5+32;
};

var fToC = function(a){
    return (a-32)*5/9;
};


/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */
// Solution here

var printInfo = function(a, b){ //** Need '' as input for b*/
    var today = new Date();
    var age = today.getFullYear()-a;
    
    console.log("Jmenuju se "+ b +". A je mi "+age+".");
};


var printTempFar = function(a){
    var far = a*9/5+32;
    console.log(a+'°C bude se rovnat '+far+'°F')
};

var printTempCel = function(a){
    var far = (a-32)*5/9;
    console.log(a+'°F bude se rovnat '+far+'°C')
};


/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 */
// Solution here


var divideNum = function (a,b){

    var c = a/b*100;

    if(b===0){
        console.log('Sorry, we can not divide by 0')
    }else{
        console.log(a+' je '+c.toFixed()+'%'+' z '+ b)
    }
}; 


/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla 
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste 
 * je párkrát zavolat v kódu a výsledky uložit do proměnných. 
 */
// Solution here


var isBigger = function(a, b){
    if(a > b){
        console.log(a+' is bigger than '+b)
    }if(b > a){
        console.log(b+' is bigger than '+a)
    }if(a === b){
        console.log('čísla se rovnají')
    }
}
/** Second solution */

var isBiggerV2 = function(a,b){
    if(a === b){
        console.log('čísla se rovnají')}
        if(a > b){
            var c = a}if(b > a){
                var c = b;
            }
    console.log(c);
}


/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for loop. 
 */
// Solution here



var list = function(){
    for (var i = 0; i*13 < 730; i++){
        console.log(i+'*13 = '+i*13);
    }
};


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 */
// Solution here

var circle = function(a){
    var b = Math.PI * Math.pow(a, 2);
    console.log('Obsah kružnice je '+b+' cm^2');
}



/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 */
// Solution here

var cone = function(a, b){
    var c = 1/3*Math.PI*Math.pow(a, 2)*b
    console.log('Objem kuželu je '+c+' cm^3');
}



/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no. 
 */
// Solution here

var triangle = function(a, b, c){
    if(a+b>c&&a+c>b&&b+c>a){
        return true;
    }else{
        return false;
    }
}



/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, 
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze, 
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt() 
 */
// Solution here

var heroicTriangle = function(a, b ,c){
    if(a+b>c&&a+c>b&&b+c>a){
        p = (a+b+c)/2
        result = Math.sqrt(p*(p-a)*(p-b)*(p-c));
        console.log('Obsah trojúhelníka je '+result+'cm^2');
    }else{
        console.log('No');
    }
}


/** second */

var heroicTriangleV2 = function(a, b, c){
    if (triangle(a, b, c)==true){
        p = (a+b+c)/2
        result = Math.sqrt(p*(p-a)*(p-b)*(p-c));
        console.log('Obsah trojúhelníka je '+result+'cm^2');
    }else{
        console.log('No');
    }
}