var caesarDecipher = function() {
    var cipherText = document.getElementById("cipher-input").value;        //get the input string from the page
    var usedKey = (Number(document.getElementById("key-input").value));   //get the  amount of shift and convert it into a number. This Is IMPORTANT                                    //get the size of the input string
    var decipherText = "";
    var temp = 0;

    for (var i = 0; i < cipherText.length; i++) {  
        temp = cipherText.charCodeAt(i);

        if ((temp >= 65) && (temp <= 90)) {
            temp = (((temp - 90 - usedKey) % 26) + 90);
        }
        decipherText += String.fromCharCode(temp);
    }
    document.getElementById("word_out").innerHTML = decipherText;
};

