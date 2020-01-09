$(document).ready(function () {

    $("#submitForecastRequest").click(function () {
        return getForecast();
    });

});

//umoznuje vkladat enterem
$("#days").keyup(function (event) {
    if (event.keyCode === 13) {
        $("#submitForecastRequest").click();
    }
});

function getForecast() {

    //nacteni vstupu a osetreni diakritiky
    var city = $("#city").val();
    city.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    var days = $("#days").val();
    days.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

    if (city != '' && days != '') {

        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/forecast/?q=' + city + "&units=metric&lang=cz&cnt=" + days + "&APPID=ba11d8c2645a2ac14a994dd3c477fe67",
            type: "GET",
            dataType: "jsonp",
            success: function (data) {

                var table = '';

                var header = '<h2 style="font-weight:bold; font-size: 30px; margin-top: 20px;">Předpověď počasí ve městě ' + data.city.name + ', ' + data.city.country + ' na příštích ' + days + ' dní:' + '</h2>'

                // prochazeni listu z OWM
                for (var i = 0; i < data.list.length; i++) {
                    // generovani radku tabulky
                    table += "<tr>";
                    table += "<td>" + (i + 1) + "</td>";
                    table += "<td><img src='http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png'></td>";
                    table += "<td>" + data.list[i].weather[0].description + "</td>";
                    table += "<td>" + data.list[i].main.temp + "&deg;C</td>";
                    table += "<td>" + data.list[i].main.temp_max + "&deg;C</td>";
                    table += "<td>" + data.list[i].main.temp_min + "&deg;C</td>";
                    table += "<td>" + data.list[i].main.pressure + "hpa</td>";
                    table += "<td>" + data.list[i].main.humidity + "%</td>";
                    table += "<td>" + data.list[i].wind.speed + " m/s</td>";
                    table += "</tr>";
                }

                // naplnovani
                $("#forecastWeather").html(table);
                $("#header").html(header);

                // clear
                $("#city").val('');
                $("#days").val('');

            }

        });

        //ulozeni do cookies
        document.cookie = document.getElementById("city").value;

    } else {
        $("#error").html("<div class='alert alert-danger' id='errorCity'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>Žádné pole nesmí být prázdné</div>");
    }

}

// predvyplneni vracejicim se uzivatelum
var cookieCutter = document.cookie.split(';')[1];
if (cookieCutter != "") {
   $("#city").val(cookieCutter);
}