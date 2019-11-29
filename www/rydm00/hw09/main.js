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
var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var input = document.querySelector('#ciphered-text');
var valueOfShift = document.querySelector('#shift-value');
var button = document.querySelector('#submit-button');
var result = document.querySelector('#deciphered-text');

button.addEventListener('click', function () {
    var cipheredText = input.value;
    var shift = valueOfShift.value;

    var decipheredText = '<div>' + caesarDecipher(cipheredText, shift) + '</div>';
    result.innerHTML = decipheredText;
});
var shiftChar = function (c, shift) {
    var resultIndex = alphabet.indexOf(c) - shift;
    if (resultIndex < 0) {
        return alphabet.charAt(resultIndex + 26);
    } else {
        return alphabet.charAt(resultIndex);
    }
};
var shiftString = function (str, shift) {
    var result = '';
    for (var i = 0; i < str.length; i++) {
        var character = str.charAt(i);
        if (!alphabet.includes(character)) {
            result += character;
        } else {
            result += shiftChar(character, shift);
        }
    }
    return result;
};
var caesarDecipher = function (cipherText, usedKey) {
    var result = '';
    var arrayOfWords = cipherText.split(" ");
    for (var i = 0; i < arrayOfWords.length; i++) {
        var word = arrayOfWords[i];
        result += shiftString(word, usedKey) + " ";
    }
    return result;
};