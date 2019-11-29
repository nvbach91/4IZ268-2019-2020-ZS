var input = document.querySelector("#text");
var key = document.querySelector("#key");
var output = document.querySelector("#output");
var submitButton = document.querySelector("#submit");

submitButton.addEventListener('click', function () {

  output.innerHTML = caesarDecipher( input.value,  key.value );

});

/* LOGIKA */

var analphabet ="A B C D E F G H I J K L M N O P Q R S T U V W X Y Z";
var analphabetArray = analphabet.split(" ");


/**
 * Základní metoda, která ošetřuje vstupy a vrací dešifrovaný text
 * 
 * @param {vstup} string 
 * @param {posun} key 
 */
var caesarDecipher = function(string, key){


  if(string === ""){
    return "Zadali jste prázdný řetězec.";
  }
  if(isNaN(key)){
    return "Klíč musí být číslo.";
  }
  if(key <= 0){
    return "Zadejte kladné číslo jako klíč.";
  }

  key = Math.round(key);
  // kdyby někdo zadal lowercase
  string = string.toUpperCase();

  return getFinalString(string, key);

}

/**
 * Vrací index znaku v abecedě
 * 
 * @param {znak ze vstupního řetězce} char 
 */
var getIndex = function(char){

  if( !/[A-Z]/.test(char) ){
    return -1;
  }

  return analphabetArray.indexOf(char);

}

/**
 * Vrací index nového znaku
 * 
 * @param {index znaku v abecedě ze vstupu} index 
 * @param {posun} key 
 */
var getNewIndex = function(index, key){

  return ( (index - key + analphabetArray.length) % analphabetArray.length) ;

}

/**
 * Skládá finální řětězec
 * 
 * @param {vstup} string 
 * @param {posun} key 
 */
var getFinalString = function(string, key){

  var finalString = "";

  for(var i = 0; i < string.length; i++){
    
    if( getIndex( string.charAt(i) ) === -1){
      finalString += string.charAt(i);
      continue;
    }
    
    finalString += analphabetArray[ getNewIndex( getIndex(string.charAt(i)), key ) ];

  }
  
  return finalString;

}

// albert einstein
console.log(caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19));

// john archibald wheeler
console.log(caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5));

// charles darwin
console.log(caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12));











