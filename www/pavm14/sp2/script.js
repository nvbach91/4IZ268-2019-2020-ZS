let appId = '409599d5230d92092be49305bb12ef11';
let units = 'imperial';
let searchMethod;

function getSearchMethod(searchTerm) {
    if (searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searcMethod = 'zip';
    else
        searchMethod = 'q';
}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&appId=${appId}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}



function init(resultFromServer) { /*změna pozadí podle počasí*/
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundColor = 'lightblue';
            break;
        case 'Clouds':
            document.body.style.backgroundColor = 'grey';
            break;
        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundColor = 'lightsteelblue';
            break;
        case 'Thunderstorm':
            document.body.style.backgroundImage = 'lightslategrey';
            break;
        case 'Snow':
            document.body.style.backgroundColor = 'white';
            break;
        default:
            break;
    }}

    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentIconImg');
    /*přidání ikon*/
    weatherIcon.src = 'http://openweathermap.org/img/wn/' + resultFromServer.weather[0].icon + '@2x.png';



let resultDescription = resultFromServer.weather[0].description;
weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '°C';
windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + ' m/s';
cityHeader.innerHTML = resultFromServer.name;
humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + '%';

setPositionForWeatherInfo();

function setPositionForWeatherInfo() {
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth / 2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight / 1.3}px)`;
    weatherContainer.style.visibility = `visible`;
}


document.getElementById('searchButton').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if (searchTerm)
        searchWeather(searchTerm);

})