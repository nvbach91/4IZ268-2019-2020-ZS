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
//              01234567890123456789012345
var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

var textInput = document.querySelector('#encrypted-text-input');
var keyInput = document.querySelector('#encryption-key-input');
var decipherButton = document.querySelector('#decipher-button');
var result = document.querySelector('.result');

decipherButton.addEventListener('click', function() {
    result.innerText = caesarDecipher(textInput.value, keyInput.value);
});

keyInput.addEventListener('keypress', function(k) {
    if (k.key === 'Enter') {
        result.innerText = caesarDecipher(textInput.value, keyInput.value);
    }
});


var shiftChar = function (c, shift) {
    // a helper function to shift one character inside the 
    // alphabet based on the shift value and return the result
    var charCode = c.charCodeAt(0);
    
    var result = String.fromCharCode(((charCode - 90 - eval(shift)) % alphabet.length) + 90);

    // var position = alphabet.indexOf(c);
    // var newPosition = ((pos - 25 - eval(shift)) % alphabet.length) + 25;
    // var result = alphabet.charAt(newPosition);
    
    return result;
};

var shiftString = function (str, shift) {
    // a helper function to shift one entire string inside the 
    // alphabet based on the shift value and return the result
};

var caesarDecipher = function (cipherText, usedKey) {
    // your implementation goes here
    // good to know: 
    //    str.indexOf(c) - returns the index of the specified character in the string
    //    str.charAt(i) - returns the character at the specified index in the string
    //    when the shifted character is out of bound, it goes back to the beginning and count on from there
    
    var output = '';
    
    for (var i = 0; i < cipherText.length; i++) {
        var char = cipherText[i];

        if (alphabet.includes(char)) {            
            output += shiftChar(char, usedKey);
        } else {
            output += char;
        }
    }
    
    console.log(output);
    return output;
};


// albert einstein
caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19);

// john archibald wheeler
caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5);

// charles darwin
caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12);