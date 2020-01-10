$(document).ready(function () {

    renderFavourites();

    $('input[type="checkbox"]').click(function () {
        if ($(this).is(":checked")) {
            getFavourites();
        }
        else {
            var city = $("#city").val();
            rmFavourite(city);
        }
    });

    //umoznuje vkladat enterem
    $("#city").keyup(function (event) {
        if (event.keyCode === 13) {
            $("#submitCity").click();
        }
    });

    $("#submitCity").click(function () {
        return getWeather();
    });

    function getWeather() {
        //nacteni vstupu a osetreni diakritiky
        var city = $("#city").val();
        city.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

        if (city != '') {

            function ajax(options) {
                return new Promise(function (resolve, reject) {
                    $.ajax(options).done(resolve).fail(reject);
                });
            }

            $.ajax({
                url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=metric&lang=cz" + "&APPID=ba11d8c2645a2ac14a994dd3c477fe67",
                type: "GET",
                dataType: "json",

            }).then(
                function fulfillHandler(data) {
                    var widget = showResults(data)

                    $("#showWeather").html(widget);

                    $("#city").val();
                    // $("#favouriteBtn").prop("checked", false);
                },
                function rejectHandler(jqXHR, textStatus, errorThrown) {
                    $("#error").html("<div class='alert alert-danger' id='errorCity'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>Město nenalezeno, překlep?</div>");
                }
            ).catch(function errorHandler(error) {
                $("#error").html("<div class='alert alert-danger' id='errorCity'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>Error</div>");
            });

            //document.cookie = document.getElementById("city").value;

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

    //predvyplneni vracejicim se uzivatelum pomoci cookies
    //var cookieCutter = document.cookie.split(';')[1];
    //if (cookieCutter != "") {
    //zbaveni se uvodni mezery, ktera se z nejakyho duvodu objevuje na zacatku stringu
    //cookieCutter = cookieCutter.replace(/\s/g, '');
    //$("#city").val(cookieCutter.valueOf());
    //}

    function getFavourites() {

        var seznamMest = [];

        seznamMest = JSON.parse(localStorage.getItem("seznamMest") || '[]');

        var city = $("#city").val();

        // kontrola duplikatu
        var jeTam = seznamMest.includes(city);

        if (jeTam == false) {
            seznamMest.push(city);
        }

        //var $dynamicSelectBox = $("#dynamicSelectBox");
        //$dynamicSelectBox.append(`<option value="${seznamMest}"> ${seznamMest} </option>`);

        renderFavourites(seznamMest);

    }

    //vyplneni text input pole na zaklade zvolene hodnoty z drop down listu
    $(function () {
        $("#dynamicSelectBox").change(function () {
            $("#city").val($('#dynamicSelectBox').val())
            $("#submitCity").click()
            $("#favouriteBtn").prop("checked", true);
        });

    });

    function renderFavourites(seznamMest) {

        //pro pouziti v listu
        if (!seznamMest) {
            seznamMest = JSON.parse(localStorage.getItem("seznamMest") || '[]');
        }

        localStorage.setItem("seznamMest", JSON.stringify(seznamMest));

        //naplneni listu
        var $dynamicSelectBox = $("#dynamicSelectBox");

        var seznam = "";

        for (var i = 0; i < (seznamMest.length); i++) {
            console.log(seznamMest[i]);
            seznam += (`<option value="${seznamMest[i]}"> ${seznamMest[i]} </option>`);
        }

        $dynamicSelectBox.empty();
        $dynamicSelectBox.append(seznam);
    }

    function rmFavourite(city) {

        var seznamMest = JSON.parse(localStorage.getItem("seznamMest"));

        seznamMest = seznamMest.filter(function (e) { return e !== city })

        localStorage.setItem("seznamMest", JSON.stringify(seznamMest));

        renderFavourites();
    }

});

