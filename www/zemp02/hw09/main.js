
function caesarUnshift(text, shift) {
    var result = "";

    for (var i = 0; i <= text.length; i++) {
        var c = text.charCodeAt(i);
        if (c >= 65 && c <= 90) {
            if(text.charCodeAt(c-shift)<65){}
            result += String.fromCharCode((c - 65 - (shift%26) + 26) % 26 + 65);
        }
        else {
            result += text.charAt(i);
        }
    }
    return result;
}


function caesarShift(text, shift) {
    var result = "";

    for (var i = 0; i <= text.length; i++) {
        var c = text.charCodeAt(i);
        if (c >= 65 && c <= 90) {
            result += String.fromCharCode((c - 65 + (shift%26)) % 26 + 65);
        }
        else {
            result += text.charAt(i);
        }
    }
    return result;
}


document.getElementById("submit").addEventListener('click',function(){
    var text = document.getElementById("text").value;
    var shift = document.getElementById("shift").value;
    var result = caesarUnshift(text,shift);
    var resultText = document.getElementById("result");
    resultText.innerHTML= result;


});

document.getElementById("submit2").addEventListener('click',function(){
    var text = document.getElementById("text2").value;
    var shift = document.getElementById("shift2").value;
    var result = caesarShift(text,shift);
    var resultText = document.getElementById("result2");
    resultText.innerHTML= result;


});