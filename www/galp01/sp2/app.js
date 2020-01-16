
$(document).ready(function(){
    $("#day").replaceWith("Today");
        if("geolocation" in navigator){
            navigator.geolocation.getCurrentPosition(function(position){
                long = position.coords.longitude;
                lat = position.coords.latitude;
                const proxy=`https://cors-anywhere.herokuapp.com/`;
                const api= `${proxy}https://api.darksky.net/forecast/d74da5e758733f58f5e39d0e6a9f6de4/${lat},${long}?units=auto`;
                $.get(api, 
                    function (data){
                        $(".location-timezone").html(data.timezone);
                        $(".temperature-degree").html(data.currently.temperature + "°C");
                        $(".temperature-description").html(data.hourly.summary);
                        icon12= data.currently.icon;
                        var createIcon = function (colorStr, str, icon) {
                            var skycons = new Skycons({
                                "color": colorStr
                            });
                            skycons.add("icon1", icon);
                            skycons.play();
                        };
                        var skyconAnimate = function (colorStr, str) {
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
                        };
                        skyconAnimate("black", icon12);
                        switch (icon12) {
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
                );
                var d = new Date();
                var weekday = new Array(8);
                weekday[1] = "Monday";
                weekday[2] = "Tuesday";
                weekday[3] = "Wednesday";
                weekday[4] = "Thursday";
                weekday[5] = "Friday";
                weekday[6] = "Saturday";
                weekday[7] = "Sunday";
                var x = weekday[d.getDay()+1];
                $("#day2").replaceWith(x)
            
            

                var unixt = Date.now() ;
                date = (unixt/1000+24*60*60);
                date=Math.round(date);
                const api2= `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/d74da5e758733f58f5e39d0e6a9f6de4/${lat},${long},${date}?units=auto`;    
                    $.get(api2, 
                        function (data){
                            $(".location-timezone2").html(data.timezone);
                            $(".temperature-degree2").html(data.currently.temperature + "°C");
                            $(".temperature-description2").html(data.hourly.summary);
                            icon12= data.currently.icon;
                            var createIcon = function (colorStr, str, icon) {
                                var skycons = new Skycons({
                                    "color": colorStr
                                });
                                skycons.add("icon2", icon);
                                skycons.play();
                            };
                            
                            var skyconAnimate = function (colorStr, str) {
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
                            };
                            skyconAnimate("black", icon12);
                            switch (icon12) {
                                case "partly-cloudy-day":
                                    $("#wear2").replaceWith("You won't need sunglasses");
                                    break;
                                case "clear-day":
                                    $("#wear2").replaceWith("Better take those sunglasses with you");
                                    break;
                                case "clear-night":
                                    $("#wear2").replaceWith("No umbrella needed");
                                    break;
                                case "fog":
                                    $("#wear2").replaceWith("Yellow lenses preferably");
                                    break;
                                case "partly-cloudy-night":
                                    $("#wear2").replaceWith("You won't see the stars, but umbrella is still unnecessary");
                                    break;
                                case "cloudy":
                                    $("#wear2").replaceWith("Take an umbrella, just to be sure");
                                    break;
                                case "sleet":
                                    $("#wear2").replaceWith("Take umbrella and also some good pair of boots");
                                    break;
                                case "snow":
                                    $("#wear2").replaceWith("Put your winter jacket and good pair of boots on");
                                    break;
                                case "wind":
                                    $("#wear2").replaceWith("Take some windreaker and nice sweater");
                                    break;
                                case "rain":
                                    $("#wear2").replaceWith("Umbrella is a must have for today");
                                    break;            
                            }
                        })  
                        var weekday = new Array(9);                        
                        weekday[2] = "Tuesday";
                        weekday[3] = "Wednesday";
                        weekday[4] = "Thursday";
                        weekday[5] = "Friday";
                        weekday[6] = "Saturday";
                        weekday[7] = "Sunday";
                        weekday[8] = "Monday";
                        var x = weekday[d.getDay()+2];
                        $("#day3").replaceWith(x);
                        var unixt = Date.now();
                        date = (unixt/1000+48*60*60);
                        date =Math.round(date);
                        const api3= `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/d74da5e758733f58f5e39d0e6a9f6de4/${lat},${long},${date}?units=auto`;               
                        $.get(api3, 
                            function (data){
                                $(".location-timezone3").html(data.timezone);
                                $(".temperature-degree3").html(data.currently.temperature + "°C");
                                $(".temperature-description3").html(data.hourly.summary);
                                icon12= data.currently.icon;
                                var createIcon = function (colorStr, str, icon) {
                                    var skycons = new Skycons({
                                        "color": colorStr
                                    });
                                skycons.add("icon3", icon);
                                skycons.play();
                                };
                            
                            var skyconAnimate = function (colorStr, str) {
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
                            };
                            
                            skyconAnimate("black", icon12);   

                            switch (icon12) {
                                    case "partly-cloudy-day":
                                        $("#wear3").replaceWith("You won't need sunglasses");
                                        break;
                                    case "clear-day":
                                        $("#wear3").replaceWith("Better take those sunglasses with you");
                                        break;
                                    case "clear-night":
                                        $("#wear3").replaceWith("No umbrella needed");
                                        break;
                                    case "fog":
                                        $("#wear3").replaceWith("Yellow lenses preferably");
                                        break;
                                    case "partly-cloudy-night":
                                        $("#wear3").replaceWith("You won't see the stars, but umbrella is still unnecessary");
                                        break;
                                    case "cloudy":
                                        $("#wear3").replaceWith("Take an umbrella, just to be sure");
                                        break;
                                    case "sleet":
                                        $("#wear3").replaceWith("Take umbrella and also some good pair of boots");
                                        break;
                                    case "snow":
                                        $("#wear3").replaceWith("Put your winter jacket and good pair of boots on");
                                        break;
                                    case "wind":
                                        $("#wear3").replaceWith("Take some windreaker and nice sweater");
                                        break;
                                    case "rain":
                                        $("#wear3").replaceWith("Umbrella is a must have for today");
                                        break;            
                            }
                        });
            });
        }
});
