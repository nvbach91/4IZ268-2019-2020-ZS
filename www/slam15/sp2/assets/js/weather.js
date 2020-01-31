$(document).ready(function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      var api =
        "https://fcc-weather-api.glitch.me/api/current?" +
        "lat=" +
        lat +
        "&lon=" +
        long;
      showWeather(api);
    });
  } else {
    alert("Geolocation is not supported!");
  }

  var tempUnit = 'C';

  function showWeather(key) {
    $.getJSON(key, function (response) {
      $("#showCity").html(response.name + ", ");
      $("#showCountry").html(response.sys.country);

      var tempInCels = response.main.temp;
      $("#showTemp").html(tempInCels + "&deg" + tempUnit);
      $("#showIcon").attr("src", response.weather[0].icon);

      $("#unit").click(function changeUnit() {
        if (tempUnit == 'C') {
          tempUnit = 'F';
          var tempInFahren = parseInt(tempInCels) * 1.8 + 32;
          $("#showTemp").html(tempInFahren.toFixed(2) + "&deg" + tempUnit);
        } else {
          tempUnit = 'C';
          $("#showTemp").html(tempInCels + "&deg" + tempUnit);
        }

      });

    });
  }


});