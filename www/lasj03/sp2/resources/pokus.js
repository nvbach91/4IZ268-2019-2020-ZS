var input = document.getElementById('query');

tyden = new Array("neděle", "pondělí", "úterý", "středa", "čtvrtek", "pátek", "sobota");

var result = [];
/*
Po zadání latitude a longitude vrací předpověď počasí
*/
window.onload = function() {
    for (var i = 0; i < localStorage.length; i++) {
        createFavoriteItem(localStorage.getItem(localStorage.key(i)));
    }
}

function getForecast(latlong) {
    var urlDarkSky = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/baab8fd9c1efb00edda82f01f5f91488/${latlong[0].y},${latlong[0].x}?lang=cs&units=si`;
    //var urlDarkSky = `https://crossorigin.me/https://api.darksky.net/forecast/baab8fd9c1efb00edda82f01f5f91488/${latlong.lat},${latlong.lng}?lang=cs&extend=hourly`


    $.getJSON(urlDarkSky).done(function(forecast) {
        result = forecast;
        createDiv(forecast);

    });
}

function createFavoriteItem(city) {
    var a = document.createElement("a");
    a.innerText = city;
    a.id = city;
    document.querySelector("#myDropdown").appendChild(a);
    a.onclick = function() {
        document.querySelector("#query").value = city;
        document.querySelector("#hledat-button").click();
    }
}


function createDiv(weatherInfo) {
    var wrapper = document.createElement("div");
    wrapper.className = 'forecast-wrapper';
    var value = document.querySelector("#query").value;
    var header = document.createElement("div");
    var headerP = document.createElement("p");
    var headerFavoritesIcon = document.createElement("img");
    if (localStorage.getItem(value) === null) {
        headerFavoritesIcon.src = 'resources/icons/favorite_unselected.png';
    } else {
        headerFavoritesIcon.src = 'resources/icons/favorite.png';
    }
    headerFavoritesIcon.alt = 'star';
    headerFavoritesIcon.className = 'weather-favorrite-icon';

    headerFavoritesIcon.onclick = function() {
        if ((headerFavoritesIcon.src.indexOf("unselected") == -1)) {
            headerFavoritesIcon.src = 'resources/icons/favorite_unselected.png';
            localStorage.removeItem(value);
            try {
                document.getElementById(value).remove();
            } catch (err) {

            }
        } else {
            headerFavoritesIcon.src = 'resources/icons/favorite.png';
            localStorage.setItem(value, value);
            createFavoriteItem(value);
        }
    }

    header.className = 'city-header';
    header.appendChild(headerFavoritesIcon);
    header.appendChild(headerP);

    headerP.innerText = input.value;
    document.getElementsByClassName('city-wrapper')[0].appendChild(header);

    for (var i = 0; i < 6; i++) {

        var forecastDay = document.createElement("div");
        forecastDay.className = 'forecast-day';
        /*datum*/
        var forecastDate = document.createElement("div");
        forecastDate.className = 'forecast-date';
        var date = document.createElement("p");

        dateJS = EpochToDate(new Date(weatherInfo.daily.data[i].time));
        date.innerText = tyden[dateJS.getDay()] + " " + dateJS.getDate() + "." + (dateJS.getMonth() + 1);

        forecastDate.appendChild(date);
        /*icon*/
        var forecastIcon = document.createElement("div");
        forecastIcon.className = 'forecast-icon';
        var elem = document.createElement("img");
        elem.src = 'resources/icons/' + weatherInfo.daily.data[i].icon + '.png';
        elem.className = 'forecast-icon-png';
        forecastIcon.appendChild(elem);

        /*temperature*/
        var forecastTemperature = document.createElement("div");
        forecastTemperature.className = 'forecast-temperature';
        var temperature = document.createElement("p");
        temperature.innerText = Math.round(weatherInfo.daily.data[i].temperatureLow) + "°C / " + Math.round(weatherInfo.daily.data[i].temperatureHigh) + '°C';
        forecastTemperature.appendChild(temperature);

        forecastDay.appendChild(forecastDate);
        forecastDay.appendChild(forecastIcon);
        forecastDay.appendChild(forecastTemperature);

        wrapper.appendChild(forecastDay);
    }

    document.getElementsByClassName('city-wrapper')[0].appendChild(wrapper);
}

/*toggle between hiding and showing the dropdown content */

document.querySelector(".dropbtn").onclick = function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");

}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// Time in EPOCH to date
function EpochToDate(epoch) {
    if (epoch < 10000000000)
        epoch *= 1000; // convert to milliseconds
    var epoch = epoch + (new Date().getTimezoneOffset() * -1); //for timeZone        
    return new Date(epoch);
}
/////////////////////////////Seznam API

//Vrací po vyhledání hodnoty latitude a longitude
function geokoduj(e, elm) { /* Voláno při odeslání */
    JAK.Events.cancelDef(e); /* Zamezit odeslání formuláře */
    var query = JAK.gel("query").value;
    new SMap.Geocoder(query, odpoved);

}

function odpoved(geocoder) { /* Odpověď */
    if (!geocoder.getResults()[0].results.length) {
        alert("Tohle neznáme.");
        return;
    }

    var vysledky = geocoder.getResults()[0].results;
    var data = [];
    while (vysledky.length) { /* Zobrazit všechny výsledky hledání */
        var item = vysledky.shift()

        data.push(item.coords);
    }

    getForecast(data);
    //result = data;
    //return data;
}

var form = JAK.gel("form");
JAK.Events.addListener(form, "submit", geokoduj); /* Při odeslání formuláře pustit geokódování */



//Našeptávání při vyhledávání místa pro počasí
class MyItem extends SMap.SuggestItem {
    /**
     * Získání fráze dané položky.
     * 
     * @return {String}
     */
    getPhrase() {
        let data = this.getData() || {};
        let phrase = data.phrase || "";
        let secondRow = data.secondRow || "";

        return (phrase + "; " + secondRow);
    }
}

new SMap.Suggest(document.querySelector("input[type='text']"), {
    limit: 7,
    factory: (data, pos) => new MyItem(data, pos),
    provider: new SMap.SuggestProvider({
        limit: 7
    })
});