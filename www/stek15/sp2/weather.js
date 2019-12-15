$(document).ready(function () {
    $("#submitCity").click(function () {
        return getWeather();
    });
});

function getWeather() {
    var city = $("#city").val();

    if (city != '') {

        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=metric" + "&APPID=ba11d8c2645a2ac14a994dd3c477fe67",
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

    } else {
        $("#error").html("<div class='alert alert-danger' id='errorCity'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>Pole nesmí být prázdné</div>");
    }
}

function showResults(data) {
    return '<h3>Aktuální počasí ve městě ' + data.name + ', ' + data.sys.country + '</h3>' +
        "<p>Počasí: " + data.weather[0].main + "</p>" +
        "<p>Popis počasí: " + data.weather[0].description + "</p>" +
        "<p>Teplota: " + data.main.temp + " &deg;C</p>" +
        "<p>Tlak: " + data.main.pressure + " hpa</p>" +
        "<p>Vlhkost: " + data.main.humidity + "%</p>" +
        "<p>Minimální teplota: " + data.main.temp_min + " &deg;C</p>" +
        "<p>Maximální teplota: " + data.main.temp_max + " &deg;C</p>" +
        "<p>Rychlost větru: " + data.wind.speed + "m/s</p>" +
        "<p>Směr větru: " + data.wind.deg + " &deg;</p>";
}