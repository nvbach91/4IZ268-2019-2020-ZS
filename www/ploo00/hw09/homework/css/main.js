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
var sifraInput = document.getElementById

var caesarForm = document.querySelector('#form');
var cipherTextInput = document.querySelector('#inputString');
var cipherKeyInput = document.querySelector('#inputKey');
var decipheredTextDisplay = document.querySelector('#decipherText');

caesarForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var cipherText = cipherTextInput.value;
    var cipherKey = cipherKeyInput.value;
    // if (!cipherText || !cipherKey) {
    //     alert('Please enter both information');
    //     return false;
    // }
    // console.log(cipherText);
    var decipheredText = caesarDecipher(cipherText, parseInt(cipherKey));
    decipheredTextDisplay.innerHTML = decipheredText;
    document.getElementById("separatorTop").hidden = false;
    document.getElementById("separatorBottom").hidden = false;
});

var shiftChar = function (c, shift) {
    // a helper function to shift one character inside the 
    // alphabet based on the shift value and return the result
};
var shiftString = function (str, shift) {
    // a helper function to shift one entire string inside the 
    // alphabet based on the shift value and return the result
};
var caesarDecipher = function (cipherText, usedKey) {
    var desipher = "";
    for (var i = 0; i<cipherText.length; i++) {
        var c = cipherText.charAt(i);
        var c_code = c.charCodeAt(0);
        if ("A".charCodeAt(0)>c_code||"Z".charCodeAt(0)<c_code) {
            desipher += c;
        }
        else {
            c_code = (c_code + (26 - usedKey)%26 -"A".charCodeAt(0))%26 +"A".charCodeAt(0);
            var new_c = String.fromCharCode(c_code).charAt(0);
            desipher += new_c;
        }
    }
    return desipher;
    

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
