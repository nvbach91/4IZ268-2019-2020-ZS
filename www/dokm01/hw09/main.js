var button = document.querySelector('#decipher');
var result = document.querySelector('#result');

button.addEventListener('click', function decipher(cipher, key) {
    var cipher = ((document.querySelector('#cipher')).value);
    var key = ((document.querySelector('#key')).value);
    var code = '';
    var text = '';

    if (key.length == 0 || cipher.length == 0) {
        alert('Please fill in both, cipher and key.');
        result.innerText = '';
    }
    if (key % 1 !== 0) {
        alert('Key must be an integer number.');
        result.innerText = '';
    }
    if (key > 26 || key < 0 || key == 0) {
        alert('Minimum key value is 1 and maximum key value is 26. Please fill in key according to this condition');
        result.innerText = '';

    }
    else {
        for (i = 0; i <= cipher.length - 1; i++) {

            if (cipher.charCodeAt(i) < 65 || 65 > cipher.charCodeAt(i) > 90 || cipher.charCodeAt(i) < 65 || cipher.charCodeAt(i) > 122) {
                text += cipher.charAt(i);
            }
            else {
                if (cipher.charCodeAt(i) - key < 65) {
                    var diff = key - (cipher.charCodeAt(i) - 65);
                    var end = 'Z';
                    code = (end.charCodeAt(0) + 1) - diff;
                    text += String.fromCharCode(code);
                }
                else {
                    code = cipher.charCodeAt(i) - key;
                    text += String.fromCharCode(code);
                }
            }

        };
        result.innerText += text;
    }
})

