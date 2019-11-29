/**
 * Long live Sparta! Vytvořte funkci, která vyřeší Caesarovu širfu. Funkce dostane 
 * na vstup zašifrovaný text a také hodnotu, která byla použita při šifrování, a pak 
 * vrátí dešifrovaný text. Předpokládejte pouze anglickou abecedu s velkými 
 * písmeny, ostatní znaky ignorujte. Poté v konzoli dešifrujte/dešiftujte následující texty.
 * 
 * key used - encrypted text
 *       19 - MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG
 *        5 - YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW
 *       12 - M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ
 * 
 * Následně vytvořte uživatelské rozhraní, ve kterém bude možné zadat zmíněné dvě 
 * vstupní hodnoty (zašifrovaný text a použitý klíč) a po kliknutí na tlačítko 
 * "Decipher!" se na určeném místě zobrazí dešifrovaný text. Rozhraní také vhodně
 * nastylujte.
 */

// Načítání
var sentence = document.querySelector('#cipher');
var number = document.querySelector('#key');
var button = document.querySelector('#decipher')
var finalSentense = document.querySelector('#result');

// Implementace
//              0123456789...
var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/*var shiftString = function (str, shift) {
    // a helper function to shift one entire string inside the 
    // alphabet based on the shift value and return the result
};*/

var shiftChar = function (c, shift) {
    // a helper function to shift one character inside the 
    // alphabet based on the shift value and return the resul
    var position;
    var newChar;
    position = alphabet.indexOf(c);
    position -= shift;
    while (position < 0) {
        position += 26;
    }
    newChar = alphabet.charAt(position);
    return newChar;
};

var isItAlphabet = function (char) {
    var check = false;
    for (i = 0; i < alphabet.length; i++) {
        if (char === alphabet.charAt(i)) {
            check = true;
        }
    }
    return check;
};

var caesarDecipher = function (cipherText, usedKey) {
    // your implementation goes here
    // good to know: 
    //    str.indexOf(c) - returns the index of the specified character in the string
    //    str.charAt(i) - returns the character at the specified index in the string
    //    when the shifted character is out of bound, it goes back to the beginning and count on from there
    var decipherText = "";
    for (var j = 0; j < cipherText.length; j++) {
        if (isItAlphabet(cipherText.charAt(j))) {
            decipherText += shiftChar(cipherText.charAt(j), usedKey);
        }
        else {
            decipherText += cipherText.charAt(j);
        }
    }
    console.log(decipherText);
    return decipherText;
};

//CAS JSOU PENIZE
// caesarDecipher("FDV MVRX SHQLCH", 3);

// It's morphin' time.
// caesarDecipher("UF'E YADBTUZ' FUYQ.", 12);

// albert einstein
caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19);

// john archibald wheeler
caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5);

// charles darwin
caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12);

button.addEventListener('click', function () {
    finalSentense.innerHTML = caesarDecipher(sentence.value, number.value);
}
);