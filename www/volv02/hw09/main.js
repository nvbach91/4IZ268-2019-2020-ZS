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
var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase();
var alphabet1 = alphabet.split('');
var userText = document.getElementById('input-text');

var userKey = document.getElementById('encrypt-key');
var userKeyN = Number(userKey.value);
var result = document.getElementById('result-text');
var encrypt = document.getElementById('encrypt-btn');
var decrypt = document.getElementById('decrypt-btn');
var reset = document.getElementById('btn-reset');
var OtherSymbols = [' ',',','.',':',';','!','?','-','_','=','+','(',')','[',']','@','`',"'",'"','<','>','|','/','%','$','^','&','*','~'];   
userKey.addEventListener('change', function(){
  userKeyN = Number(this.value);
});
userText.addEventListener('change', function(){
  userTextS = String(this.value);
});

var shiftChar = function (userTextS, userKeyN) { 
  var result = ''; 
  var shiftedAlphabet = alphabet.slice(userKeyN);
    shiftedAlphabet += alphabet.slice(0, userKeyN);
    
    for(i = 0; i < shiftedAlphabet.length; i++){
      var currentNumber = alphabet.indexOf(userTextS[i]);
      result += shiftedAlphabet[currentNumber];
      return result;
    }
  
    // a helper function to shift one character inside the 
    // alphabet based on the shift value and return the result
};
var shiftString = function (userTextS, userKeyN) {
  var result = '';
  var strLow = userTextS.toLowerCase();
  var shiftedAlphabet = alphabet.slice(userKeyN);
  shiftedAlphabet += alphabet.slice(0, userKeyN);
  for(var i = 0; i < userTextS.length; i++){
      var currentNumber = alphabet.indexOf(strLow[i])
      result += shiftedAlphabet[currentNumber];
  }
  return result;
}

    // a helper function to shift one entire string inside the 
    // alphabet based on the shift value and return the result

var caesarDecipher = function (userTextS, userKeyN) {
  var result = '';
  var strLow = userTextS.toLowerCase();
  var key = -userKeyN;
  var shiftedAlphabet = alphabet.slice(key);
  shiftedAlphabet += alphabet.slice(0, key);

  for(var i = 0; i < userTextS.length; i++){
    if(shiftedAlphabet.includes(strLow[i])){
      var currentNumber = alphabet.indexOf(strLow[i])
      result += shiftedAlphabet[currentNumber];
    }
    else{
      result += userTextS[i];
    }
  }
  return result;
    // your implementation goes here
    // good to know: 
    //    str.indexOf(c) - returns the index of the specified character in the string
    //    str.charAt(i) - returns the character at the specified index in the string
    //    when the shifted character is out of bound, it goes back to the beginning and count on from there
};

var caesarEncrypt = function (userTextS, userKeyN) {
  var result = '';
  var strLow = userTextS.toLowerCase();
  var shiftedAlphabet = alphabet.slice(userKeyN);
  shiftedAlphabet += alphabet.slice(0, userKeyN);

  for(var i = 0; i < userTextS.length; i++){
    if(shiftedAlphabet.includes(strLow[i])){
      var currentNumber = alphabet.indexOf(strLow[i])
      result += shiftedAlphabet[currentNumber];
    }
    else{
      result += userTextS[i];
    }
  }
  return result;

};

// albert einstein
caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19);

// john archibald wheeler
caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5);

// charles darwin
caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12);

encrypt.addEventListener('click', function() {
  userTextS = userText.value
  result.value = caesarEncrypt(userTextS, userKeyN);
});

decrypt.addEventListener('click', function() {
  userTextS = userText.value
  result.value = caesarDecipher(userTextS, userKeyN);
});

reset.addEventListener('click', function() {
  userText.value = '';
  result.value = '';
});