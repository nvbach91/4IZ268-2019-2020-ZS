
$(document).ready(function () {
    var i = 0;
    function createIcon (colorStr, str, icon) {
        var skycons = new Skycons({
            "color": colorStr
        });
        skycons.add("ic" + i + "on", icon);
        skycons.play();  
    }
    $(".things").append(`<div class="loader"></div>`);
    function skyconAnimate (colorStr, str) {
        switch (str) {
            case "partly-cloudy-day":
                createIcon(colorStr, str, Skycons.PARTLY_CLOUDY_DAY);
                break;
            case "clear-day":
                createIcon(colorStr, str, Skycons.CLEAR_DAY);
                break;
            case "clear-night":
                createIcon(colorStr, str, Skycons.CLEAR_NIGHT);
                break;
            case "fog":
                createIcon(colorStr, str, Skycons.FOG);
                break;
            case "partly-cloudy-night":
                createIcon(colorStr, str, Skycons.PARTLY_CLOUDY_NIGHT);
                break;
            case "cloudy":
                createIcon(colorStr, str, Skycons.CLOUDY);
                break;
            case "sleet":
                createIcon(colorStr, str, Skycons.SLEET);
                break;
            case "snow":
                createIcon(colorStr, str, Skycons.SNOW);
                break;
            case "wind":
                createIcon(colorStr, str, Skycons.WIND);
                break;
            case "rain":
                createIcon(colorStr, str, Skycons.RAIN);
                break;
            default:
                alert('woops! no icon!');
       }   
    }
    var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    navigator.geolocation.getCurrentPosition(function (position) {
        long = position.coords.longitude;
        lat = position.coords.latitude;

            
        function forecast (days,units,degree) {
            
            var requests = [];
            var responses = [];

            const d = new Date();
            const unixt = Date.now();
            
            
                       
            
            for ( i = 0; i < days; i++) {

                $(".things").empty();

                date = (unixt / 1000 + i * 24 * 60 * 60);

                date = Math.round(date);
                const api = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/d74da5e758733f58f5e39d0e6a9f6de4/${lat},${long},${date}?units=${units}`;

                var request = $.get(api, function (data) { responses.push(data) })
                requests.push(request);

            }
            $(".things").append(`<div class="loader"></div>`);
           

            $.when(...requests).then(function () {
                responses.sort((a, b) => {
                    if (a.currently.time > b.currently.time) return 1
                    if (a.currently.time == b.currently.time) return 0
                    if (a.currently.time < b.currently.time) return -1
                })
                $(".loader").hide();
                for ( i = 0; i < days; i++) {

                    let timezone = responses[i].timezone;
                    let temperature = responses[i].currently.temperature;
                    let summary = responses[i].hourly.summary;
                    let icon = responses[i].currently.icon;

                    
                    let day = weekday[d.getDay() + i];

                    $('.things').append(`<div id="forecast">
                                <div class="location">
                                    <h1 class="location-timezone">`+ timezone + `</h1>
                                    <h2 id="day">`+ day + `</h2>
                                </div>
                                <div class="temperature">
                                    <canvas id="ic`+ i + `on"></canvas>
                                    <h2 class="temperature-degree">`+ temperature + `<span>` + degree +`</h2>
                                    <div class="temperature-description">`+ summary + `</div>
                                </div>
                                <p id="wear"></p>
                            </div>`)

                    skyconAnimate("black", icon,);

                    switch (icon) {
                        case "partly-cloudy-day":
                            $("#wear").replaceWith("You won't need sunglasses");
                            break;
                        case "clear-day":
                            $("#wear").replaceWith("Better take those sunglasses with you");
                            break;
                        case "clear-night":
                            $("#wear").replaceWith("No umbrella needed");
                            break;
                        case "fog":
                            $("#wear").replaceWith("Yellow lenses preferably");
                            break;
                        case "partly-cloudy-night":
                            $("#wear").replaceWith("You won't see the stars, but umbrella is still unnecessary");
                            break;
                        case "cloudy":
                            $("#wear").replaceWith("Take an umbrella, just to be sure");
                            break;
                        case "sleet":
                            $("#wear").replaceWith("Take umbrella and also some good pair of boots");
                            break;
                        case "snow":
                            $("#wear").replaceWith("Put your winter jacket and good pair of boots on");
                            break;
                        case "wind":
                            $("#wear").replaceWith("Take some windreaker and nice sweater");
                            break;
                        case "rain":
                            $("#wear").replaceWith("Umbrella is a must have for today");
                            break;
                    }
                }


            })

        }
        if (localStorage.length == 0) {
        localStorage.setItem("dayDefault",$("#select").children("option:selected").val())
        localStorage.setItem("unitsDefault",$("#units").children("option:selected").val())
        localStorage.setItem("degreeDefault",$("#units").children("option:selected").text())
            
        }
      

        forecast (localStorage.getItem("dayDefault"),localStorage.getItem("unitsDefault"),localStorage.getItem("degreeDefault"));
        $("#run").click(function () {forecast ($("#select").children("option:selected").val(),$("#units").children("option:selected").val(),$("#units").children("option:selected").text())
            localStorage.setItem("dayDefault",$("#select").children("option:selected").val())
            localStorage.setItem("unitsDefault",$("#units").children("option:selected").val())
            localStorage.setItem("degreeDefault",$("#units").children("option:selected").text())
        })

        })

    })

