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


var shiftChar = function (c, shift) {
    if (shift < 0)
        return shiftChar(c, shift + 26);
    for (var i = 0; i <= alphabet.length; i++) {
        if (c === alphabet.charAt(i)) {
            var newLetter = alphabet.charAt((i + shift) % 26);
            return newLetter;
        }
    }


    // a helper function to shift one character inside the 
    // alphabet based on the shift value and return the result
};
var shiftString = function (str, shift) {
    var newString = '';
    for (var i = 0; i < str.length; i++) {
        if (![' ', ',', '.', '-', '―', ':', '\'', '\;','\"'].includes(str.charAt(i))) {
            newString += shiftChar(str.charAt(i), shift);
        }
        else {
            newString += str.charAt(i);
        }
    }
    return newString;
    // a helper function to shift one entire string inside the 
    // alphabet based on the shift value and return the result
};
var caesarDecipher = function (cipherText, usedKey) {
    return shiftString(cipherText, -usedKey);
    // your implementation goes here
    // good to know: 
    //    str.indexOf(c) - returns the index of the specified character in the string
    //    str.charAt(i) - returns the character at the specified index in the string
    //    when the shifted character is out of bound, it goes back to the beginning and count on from there
};

// albert einstein
caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19);

// john archibald wheeler
caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5);

// charles darwin
caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12);

var submitButton = document.querySelector('#submit-button');
var messageInput = document.querySelector('#message-input');
var shiftInput = document.querySelector('#shift-input');
var output = document.querySelector('#quote-list');

submitButton.addEventListener('click', function () {
    var text = document.createElement('li');
    text.innerText = caesarDecipher(messageInput.value, shiftInput.value);
    output.appendChild(text);
});