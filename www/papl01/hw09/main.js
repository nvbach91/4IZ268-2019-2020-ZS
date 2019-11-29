function cipher() {
    var text_area = document.querySelector(`.text_area`).value;
    var number_area = Number(document.querySelector(`.number_area`).value);
    var output = document.getElementById(`output`);
    var goodNumber_area = number_area % 26;
    output.innerHTML = "";

    for (var i = 0; i < text_area.length; i++) {
        var numberOfLetter = text_area.charCodeAt(i);

        if (numberOfLetter > 96 && numberOfLetter < 123) {
            var diference = numberOfLetter - goodNumber_area;
            if (diference <= 96) {
                diference += 26;
            }
            output.innerHTML += String.fromCharCode(diference);
        } else if (numberOfLetter > 64 && numberOfLetter < 91) {
            var diference = numberOfLetter - goodNumber_area;
            if (diference <= 64) {
                diference += 26;
            }
            output.innerHTML += String.fromCharCode(diference);
        } else {
            output.innerHTML += String.fromCharCode(numberOfLetter);
        }


    }

}

document.getElementById(`button`).addEventListener(`click`, function() {

    cipher();

});