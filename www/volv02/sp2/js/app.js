const apiKey = '21f6de551a459859c11aa47bc21a1d33';

window.addEventListener('load', () => {
    let long;
    let lat;
    let timeZone = document.querySelector('.timeZone')
    let temperatureSection = document.querySelector('.temperature-degree');
    let temperatureSpan = document.querySelector('.temperature-section span');
    let nextDayInfo = document.querySelector('.fiveDayInfo');
    let iconWether = document.querySelector('.icon_main');
    let iconDescription = document.querySelector('.icon_text');
    var api = '';
    const searchedValue = document.querySelector('.searchInput');
    var searchResult;

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
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);

                    //Transform kelvin to F and F to Celsius
                    function kelvinTofahrenheit(a) {
                        far = Math.floor(9 * (a - 273.15) / 5 + 32);
                        return far;
                    }
                    function fahrenheitToCelsius(a) {
                        cel = Math.floor(kelvinTofahrenheit(a) - 32) * 5 / 9;
                        cel = Math.floor(cel);
                        return cel;
                    }

                    const { country, name } = data.city;
                    timeZone.innerText = (name + ', ' + country);
                    temperatureSection.innerText = kelvinTofahrenheit(data.list[0].main.temp);


                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "°F") {
                            temperatureSpan.textContent = "°C";
                            temperatureSection.innerText = fahrenheitToCelsius(data.list[0].main.temp);
                        } else {
                            temperatureSpan.textContent = "°F"
                            temperatureSection.innerText = kelvinTofahrenheit(data.list[0].main.temp);
                        }
                    });

                    //set up weather icon + text
                    var imgIconElement = document.createElement('img');
                    imgIconElement.alt = 'weatherIcon';
                    imgIconElement.src = `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
                    iconWether.appendChild(imgIconElement);
                    iconDescription.innerText = data.list[0].weather[0].description;


                    //create 5 day forecast
                    data.list.forEach(fiveDayForecast);
                    function fiveDayForecast(item) {
                        let nextDay = item.dt / 86400;
                        if (Number.isInteger(nextDay) === true) {
                            //create element wuth class for each day
                            let oneDay = document.createElement('div');
                            oneDay.classList.add('nextDayInfo');
                            let oneDayTemp = document.createElement('div');
                            oneDayTemp.classList.add('nextDayTemp');

                            //get name of day at the week
                            var nextDayString = new Date(item.dt_txt);

                            //insert data to html
                            oneDay.innerText = nextDayString.toLocaleString('en', { weekday: 'short' }) + ', ' + nextDayString.getDate();
                            oneDayTemp.innerText = kelvinTofahrenheit(item.main.temp) + ' °F';

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
                                oneDayClouds.innerText = item.weather[0].description;
                                oneDay.appendChild(oneDayClouds);
                            }
                        }
                    }
                });
        }

        function citySearch() {
            searchedValue.addEventListener('change', () => {
                const apiSearc = `https://api.teleport.org/api/cities/?search=${searchedValue.value}`;

                fetch(apiSearc)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {

                        let searchResult = data._embedded["city:search-results"][0].matching_full_name.split(',')[0];
                        searchResult = searchResult.split(',')[0];
                        console.log(searchResult)
                        console.log(data)

                        api = `http://api.openweathermap.org/data/2.5/forecast?q=${searchResult}&APPID=${apiKey}&cnt=40`
                        iconWether.innerText='';
                        nextDayInfo.innerText='';
                        getWeather();
                    });
            });
        }


    } else {
        alert('Geolocation is not supported for this Browser/OS version yet.');
    }
});