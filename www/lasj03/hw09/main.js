var inputNumber = document.querySelector('.input-number');
var inputText = document.querySelector('.input-text');
var decText = document.getElementById('dec-text');

function decipher(str, num) {
    decText.innerHTML = "";
    for (var i = 0; i < str.length; i++) {

        if (str.charCodeAt(i) > 96 && str.charCodeAt(i) < 123) {
            var decipheredLetter = str.charCodeAt(i) - (num % 26);

            if (decipheredLetter <= 96) {
                decipheredLetter += 26;
            }
            decText.innerHTML += String.fromCharCode(decipheredLetter);
        } else if (str.charCodeAt(i) > 64 && str.charCodeAt(i) < 91) {
            var decipheredLetter = str.charCodeAt(i) - (num % 26);

            if (decipheredLetter <= 64) {
                decipheredLetter += 26;
            }
            decText.innerHTML += String.fromCharCode(decipheredLetter);
        } else {
            decText.innerHTML += String.fromCharCode(str.charCodeAt(i));
        }


    }
}

document.getElementById("decipher").addEventListener("click", function() {
    decipher(inputText.value, Number(inputNumber.value));
});