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
    var cryptedCharIndex = alphabet.indexOf(c);
    if (cryptedCharIndex != -1) {
        var decryptedCharIndex = cryptedCharIndex - shift;
        if (decryptedCharIndex < 0) {
            decryptedCharIndex += 26;
        }
        var decryptedChar = alphabet.charAt(decryptedCharIndex);
        return decryptedChar;

    } else {
        return c;
    }
};
var shiftString = function (str, shift) {
    var decryptedMessage = "";
    for (var i = 0; i < str.length; i++) {
        decryptedMessage += shiftChar(str[i], shift);
    }
    return decryptedMessage;
};
var caesarDecipher = function (cipherText, usedKey) {
    return shiftString(cipherText, usedKey);
};

var decipherBtn = document.querySelector("button");

decipherBtn.onclick = function () {
    var messageInput = document.querySelector("textarea").value;
    var cipherInput = document.querySelector("textarea[id=key]").value;
    document.querySelector("span").innerText = caesarDecipher(messageInput, cipherInput);
};

// albert einstein
caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19);

// john archibald wheeler
caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5);

// charles darwin
caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12);