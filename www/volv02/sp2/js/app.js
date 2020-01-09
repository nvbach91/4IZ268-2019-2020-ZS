const apiKey = '21f6de551a459859c11aa47bc21a1d33';
window.addEventListener('load', () => {
  let long;
  let lat;
  let timeZone = document.querySelector('.timeZone')
  let nextDayInfo = document.querySelector('.fiveDayInfo');
  let iconWether = document.querySelector('.icon_main');
  let iconDescription = document.querySelector('.icon_text');
  var api = '';
  const searchedValue = document.querySelector('.searchInput');
  let temperatureSection = document.querySelector('.temperature-degree');
  let temperatureSpan = document.querySelector('.temperature-section span');
  let favoriteCittyFiedld = document.querySelector('.favoriteCity');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        long = position.coords.longitude;
        lat = position.coords.latitude;
        api = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&APPID=${apiKey}&cnt=40`;
        getWeather();
        citySearch();
      },
      function (error) {
        citySearch();
        alert(error.message);
      }
    );

    function getWeather() {
      iconWether.innerText = '';
      nextDayInfo.innerText = '';
      fetch(api)
        .then(response => {
          $('.mainField').css("display", "none");
          return response.json();
        })
        .then(data => {
          $('.mainField').css("display", "unset");
          $('.loader').remove();
          // console.log(data);
          //Transform kelvin to F and F to Celsius
          function kelvinTofahrenheit(a) {
            far = Math.floor(9 * (a - 273.15) / 5 + 32);
            return far;
          }

          //Tento kus kodu sice funguje, ale dela to hodné problému. Cíl kodu spravné fungování historii
          document.title = `Weather in ${data.city.name}`;
          var state = {
            title: `Weather in ${data.city.name}`,
            url: data.city.name
          };

          history.pushState(state, state.title, `#${state.url}`);
          window.onpopstate = function (event) {
            // console.log("location: " + location.href + ", state: " + JSON.stringify(event.state));
            var urlState = location.href.split('#');
            api = `http://api.openweathermap.org/data/2.5/forecast?q=${urlState[urlState.length-1]}&APPID=${apiKey}&cnt=40`;
            iconWether.innerText = '';
            nextDayInfo.innerText = '';
            getWeather();
          };

          function fahrenheitToCelsius(a) {
            cel = Math.floor(kelvinTofahrenheit(a) - 32) * 5 / 9;
            cel = Math.floor(cel);

            return cel;
          }
          const {
            country,
            name
          } = data.city;
          timeZone.innerText = (name + ', ' + country);
          temperatureSection.innerText = kelvinTofahrenheit(data.list[0].main.temp);
          temperatureSpan.innerHTML = '°F';

          temperatureSection.addEventListener('mouseover', () => {
            setTimeout(function () {
              if (temperatureSpan.innerText === '°F') {
                temperatureSpan.innerHTML = '°C';
                temperatureSection.innerText = fahrenheitToCelsius(data.list[0].main.temp);
              } else {
                temperatureSpan.innerHTML = '°F';
                temperatureSection.innerText = kelvinTofahrenheit(data.list[0].main.temp);
              }
            }, 175);

            setTimeout(function () {
              temperatureSpan.innerHTML = '°F';
              temperatureSection.innerText = kelvinTofahrenheit(data.list[0].main.temp);
            }, 5000);
          });

          //set up weather icon + text
          var imgIconElement = document.createElement('img');
          imgIconElement.alt = 'weatherIcon';
          imgIconElement.src = `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
          iconWether.appendChild(imgIconElement);
          iconDescription.innerText = ucFirst(data.list[0].weather[0].description);

          //create 5 day forecast

          data.list.forEach(fiveDayForecast);

          function fiveDayForecast(item) {
            $('.fiveDayInfo').innerText = '';
            let nextDay = item.dt / 86400;
            if (Number.isInteger(nextDay)) {
              //create element wuth class for each day
              let oneDay = document.createElement('div');
              oneDay.classList.add('nextDayInfo');
              let oneDayTemp = document.createElement('div');
              oneDayTemp.classList.add('nextDayTemp');

              //get name of day at the week
              var nextDayString = new Date(item.dt_txt);

              //insert data to html
              oneDay.innerText = nextDayString.toLocaleString('en', {
                weekday: 'short'
              }) + ', ' + nextDayString.getDate();
              oneDayTemp.innerHTML = kelvinTofahrenheit(item.main.temp) + ' °F';

              nextDayInfo.appendChild(oneDay);
              oneDay.appendChild(oneDayTemp);
              fiveDayForecastIcons();
              //set up icon for each element
              function fiveDayForecastIcons() {
                let imgIconElement = document.createElement('img');
                imgIconElement.alt = 'weatherIcon';
                imgIconElement.src = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
                let oneDayClouds = document.createElement('div');
                oneDayClouds.classList.add('oneDayClouds');

                oneDay.appendChild(imgIconElement);
                oneDayClouds.innerText = ucFirst(item.weather[0].description);
                oneDay.appendChild(oneDayClouds);
              };
            } else {
              return false;
            };
          };

          //add to local storage
          //key 'city' with value of a name of the city
          let citiesArray = localStorage.getItem('city') ? JSON.parse(localStorage.getItem('city')) : [];
          if (localStorage.getItem('city') != null) {
            localStorageFunction();
          } else {
            favoriteCittyFiedld.innerText = 'The list of your favorite cities is empty.';
          };
          $('.favorite').on('click', () => {
            if (citiesArray.includes(name, 0) === true) {
              return false;
            } else {
              if (citiesArray.length < 5) {
                citiesArray.push(name);
                localStorage.setItem('city', JSON.stringify(citiesArray));
                localStorageFunction();
              } else {
                alert('You can add only 5 cities to your favorite city list.');
              }
            }
          });

          function localStorageFunction() {
            favoriteCittyFiedld.innerText = '';
            console.log(citiesArray);
            citiesArray.forEach(name => {
              //get a weather of this city
              api = `http://api.openweathermap.org/data/2.5/forecast?q=${name}&APPID=${apiKey}&cnt=40`;
              var loader = `<div class="loader"></div>`
              fetch(api)
                .then(response => {
                  $('.favoriteCity').append(loader);
                  return response.json();
                })
                .then(data => {
                  $('.loader').remove();
                  var html = `<div class="thisCityStorage">
                                 <a href="#${name}"><p>${name}</p></a>
                                 <div class="tempForFavoriteCitty">${kelvinTofahrenheit(data.list[0].main.temp)}<span> °F</span></div>
                                 <img alt="WeatherIcon_For_${name}" src="http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png">
                                 <div class="descriptionOfIconWeather">${ucFirst(data.list[0].weather[0].description)}</div> 
                              </div>`
                  $('.favoriteCity').append(html);
                });
            });
          };
        });
    };


    function citySearch() {
      searchSuggestion();
      searchedValue.addEventListener('change', () => {
        const apiSearcUrl = `https://api.teleport.org/api/cities/?search=${searchedValue.value}&limit=4`;
        fetch(apiSearcUrl)
          .then(response => {
            return response.json();
          })
          .then(data => {

            let searchResult = data._embedded['city:search-results'][0].matching_full_name.split(',')[0];
            searchResult = searchResult.split(',')[0];
            api = `http://api.openweathermap.org/data/2.5/forecast?q=${searchResult}&APPID=${apiKey}&cnt=40`;
            iconWether.innerText = '';
            nextDayInfo.innerText = '';
            getWeather();
          });
      });
    };

    function searchSuggestion() {
      searchedValue.addEventListener('keyup', () => {
        const apiSearcUrl = `https://api.teleport.org/api/cities/?search=${searchedValue.value}&limit=4`;
        $('.citySearchSuggestion').remove();
        fetch(apiSearcUrl)
          .then(response => {
            return response.json();
          })
          .then(data => {
            var html = /* html */
              `<div class="citySearchSuggestion">
                  <a href="#${data._embedded['city:search-results'][0].matching_full_name.split(',', 1)}"><p>${data._embedded['city:search-results'][0].matching_full_name.split(',', 2)}</p></a>
                  <a href="#${data._embedded['city:search-results'][1].matching_full_name.split(',', 1)}"><p>${data._embedded['city:search-results'][1].matching_full_name.split(',', 2)}</p></a>
                  <a href="#${data._embedded['city:search-results'][2].matching_full_name.split(',', 1)}"><p>${data._embedded['city:search-results'][2].matching_full_name.split(',', 2)}</p></a>
                  <a href="#${data._embedded['city:search-results'][3].matching_full_name.split(',', 1)}"><p>${data._embedded['city:search-results'][3].matching_full_name.split(',', 2)}</p></a>
               </div>`
            setTimeout(function () {
              $('.citySearchSuggestion').remove();
              $('.searchBox').append(html);
            }, 125);
            setTimeout(function () {
              $('.citySearchSuggestion').remove();
            }, 750000);
            setTimeout(function () {
              $('.searchInput').val('');
            }, 750000);
          });
      });
    }

    //First char to upper case
    function ucFirst(str) {
      if (!str) return str;
      return str[0].toUpperCase() + str.slice(1);
    }

  } else {
    alert('Geolocation is not supported for this Browser/OS version yet.');
  };
});