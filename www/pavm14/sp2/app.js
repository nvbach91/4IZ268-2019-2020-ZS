

$(document).ready(function(){

    $('#button').click(function(){

        var city = $("#city").val();

        if(city.length > 0){
            
           $.ajax({

                url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=metric&APPID=409599d5230d92092be49305bb12ef11",
                type: "GET",
                dataType: "json",
                success: function(data){
                    var widget = show(data)

                    $("#show").html(widget);

                    $("#city").val('');
                }
            });
            

        }else {
            $("#error").html('Field must be full');
        }
    });
});


function show(data){
    return "<h2 style='font-size: 35px; font-weight= bold;' class='text-center'>Weather for " + data.name + "</h2>" +
           "<img src='http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png'>" +
           "<h3>Weather: "+ data.weather[0].main +"</h3>" +
           "<h3>Description: "+ data.weather[0].description +"</h3>" +
           "<h3>Temperature: "+ data.main.temp + " °C</h3>" +
           "<h3>Pressure: "+ data.main.pressure + " hPa</h3>" +
           "<h3>Humidity: "+ data.main.humidity + " %</h3>" +
           "<h3>Min. Temperature: "+ data.main.temp_min + " °C</h3>" +
           "<h3>Max. Temperature: "+ data.main.temp_max + " °C</h3>" +
           "<h3>Wind Speed: "+ data.wind.speed + "m/s</h3>";
           

}
