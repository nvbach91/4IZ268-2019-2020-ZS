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


//              0123456789...
var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/*
-----------------------DECIPHER MESSAGE----------------------
*/

var shiftChar = function (c, shift) {
    var charIndex = alphabet.indexOf(c) - shift;
    if (charIndex < 0) {
        charIndex = 26 + charIndex;
    }
    return alphabet.charAt(charIndex);
    //shift one character inside the alphabet based on the shift value
};
var shiftString = function (str, shift, chr) {
    if(shift > str.length-1) return str;
    return str.substr(0,shift) + chr + str.substr(shift+1);
    //shift one entire string inside the alphabet based on the shift value
};
var caesarDecipher = function (cipherText, usedKey) {
    //    str.indexOf(c) - returns the index of the specified character in the string
    //    str.charAt(i) - returns the character at the specified index in the string
    cipherText = cipherText.toUpperCase();
    for (j = 0; j < cipherText.length; j++) {
        var currChar = cipherText.charAt(j);
        if (![',', ' ', '.', ';', ':', "'", '-', '―'].includes(currChar)) {
            var newChar = shiftChar(currChar, usedKey);
            cipherText = shiftString(cipherText, j, newChar);
        }
    }
    console.log(cipherText);
    return cipherText;
};


/*
-----------------------CIPHER MESSAGE----------------------
*/


var shiftCharCipher = function (c, shift) {
    var charIndex = alphabet.indexOf(c) - (-shift);
    if (charIndex > 25) {
        charIndex = charIndex - 26;
    }
    return alphabet.charAt(charIndex);
    //shift one character inside the alphabet based on the shift value
};
var shiftStringCipher = function (str, shift, chr) {
    if(shift > str.length-1) return str;
    return str.substr(0,shift) + chr + str.substr(shift+1);
    //shift one entire string inside the alphabet based on the shift value
};
var caesarCipher = function (cipherText, usedKey) {
    //    str.indexOf(c) - returns the index of the specified character in the string
    //    str.charAt(i) - returns the character at the specified index in the string
    for (j = 0; j < cipherText.length; j++) {
        cipherText = cipherText.toUpperCase();
        var currChar = cipherText.charAt(j);
        if (![',', ' ', '.', ';', ':', "'", '-', '―'].includes(currChar)) {
            var newChar = shiftCharCipher(currChar, usedKey);
            cipherText = shiftStringCipher(cipherText, j, newChar);
        }
    }
    console.log(cipherText);
    return cipherText;
};


var decipherButton = document.querySelector('#decipher-button');
var cipherButton = document.querySelector('#cipher-button');
var outputBox = document.querySelector('#output');
var keyValue = document.querySelector('#key');
var inputValue = document.querySelector('#cipher');

decipherButton.addEventListener('click', function(){
    
    outputBox.innerHTML = caesarDecipher(inputValue.value, keyValue.value);
});

cipherButton.addEventListener('click', function(){
    outputBox.innerHTML = caesarCipher(inputValue.value, keyValue.value);
});

// albert einstein
caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19);

// john archibald wheeler
caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5);

// charles darwin
caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12);