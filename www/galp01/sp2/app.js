
$(document).ready(function(){
    navigator.geolocation.getCurrentPosition(function(position){
        long = position.coords.longitude;
        lat = position.coords.latitude;
        
        $("#select").change(function(){
            const days = $("#select").children("option:selected").val();

            for (let i = 0; i < days; i++) {

               
                $("div").empty();                
               // $("body").append('<div class="days'+i+'">'+x+"<div>");
                

                var unixt = Date.now();
                date = (unixt/1000+i*24*60*60);
                
                date =Math.round(date);
                const api= `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/d74da5e758733f58f5e39d0e6a9f6de4/${lat},${long},${date}?units=auto`;                               
                
                $.get(api,
                    function (data){
                        timezone = (data.timezone);
                        temperature = (data.currently.temperature + "°C");
                        summary = 
                        (data.hourly.summary);
                        icon= data.currently.icon;
                        
                        var d = new Date();
                        console.log(d)
                        var weekday = new Array(16);
                        weekday[0] = "Sunday";
                        weekday[1] = "Monday";
                        weekday[2] = "Tuesday";
                        weekday[3] = "Wednesday";
                        weekday[4] = "Thursday";
                        weekday[5] = "Friday";
                        weekday[6] = "Saturday";
                        weekday[7] = "Sunday";
                        weekday[8] = "Monday";
                        weekday[9] = "Tuesday";
                        weekday[10] = "Wednesday";
                        weekday[11] = "Thursday";
                        weekday[12] = "Friday";
                        weekday[13] = "Saturday";
                        weekday[14] = "Sunday";
                        x = weekday[d.getDay()+i];

                        $('.things').append(`<div id="forecast">
                                <div class="location">
                                    <h1 class="location-timezone">`+timezone+`</h1>
                                    <h2 id="day">`+x+`</h2>
                                </div>
                                <div class="temperature">
                                    <canvas id="ic`+i+`on"></canvas>
                                    <h2 class="temperature-degree">`+temperature+`</h2>
                                    <div class="temperature-description">`+summary+`</div>
                                </div>
                                <p id="wear"></p>
                            </div>`)

                        console.log(icon);
                        var createIcon = function (colorStr, str, icon) {
                            var skycons = new Skycons({
                                "color": colorStr
                            });
                            skycons.add("ic"+i+"on", icon);
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
                        skyconAnimate("black", icon);
                       
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


            })
             
            
    
          

        
    
    
    
       
        }})
})
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    })
