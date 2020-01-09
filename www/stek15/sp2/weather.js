$(document).ready(function () {
    $("#submitCity").click(function () {
        return getWeather();
    });
});

//umoznuje vkladat enterem
$("#city").keyup(function (event) {
    if (event.keyCode === 13) {
        $("#submitCity").click();
    }
});

function getWeather() {
    //nacteni vstupu a osetreni diakritiky
    var city = $("#city").val();
    city.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

    if (city != '') {

        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=metric&lang=cz" + "&APPID=ba11d8c2645a2ac14a994dd3c477fe67",
            type: "GET",
            dataType: "jsonp",

            success: function (data) {

                //test API volani v konzoli:
                //console.log(data);

                var widget = showResults(data)

                $("#showWeather").html(widget);

                $("#city").val();
            }
        });

        //ulozeni do cookies
        document.cookie = document.getElementById("city").value;

    } else {
        $("#error").html("<div class='alert alert-danger' id='errorCity'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>Pole nesmí být prázdné</div>");
    }

}

function showResults(data) {
    return '<h2 style="font-weight:bold; font-size:30px; padding-top:30px;" class="text-center";>Aktuální počasí ve městě ' + data.name + ', ' + data.sys.country + '</h3>' +
        "<h3 style='padding-left:40px;'><strong>Počasí:</strong><img src='http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png'> " + data.weather[0].description + "<h3>" +
        "<h3 style='padding-left:40px;'><strong>Teplota:</strong> " + data.main.temp + " &deg;C<h3>" +
        "<h3 style='padding-left:40px;'><strong>Tlak:</strong> " + data.main.pressure + " hpa<h3>" +
        "<h3 style='padding-left:40px;'><strong>Vlhkost:</strong> " + data.main.humidity + "%<h3>" +
        "<h3 style='padding-left:40px;'><strong>Minimální teplota:</strong> " + data.main.temp_min + " &deg;C<h3>" +
        "<h3 style='padding-left:40px;'><strong>Maximální teplota:</strong> " + data.main.temp_max + " &deg;C<h3>" +
        "<h3 style='padding-left:40px;'><strong>Rychlost větru:</strong> " + data.wind.speed + " m/s<h3>" +
        "<h3 style='padding-left:40px; padding-bottom:30px;'><strong>Směr větru:</strong> " + data.wind.deg + " &deg;<h3>";
}

//predvyplneni vracejicim se uzivatelum
var cookieCutter = document.cookie.split(';')[1];
if (cookieCutter != "") {
    $("#city").val(cookieCutter);
}