let appID = "409599d5230d92092be49305bb12ef11";
let units = "metric";
let searchMethod = 'q';
let storage = window.localStorage;
var elementSearchInput = document.getElementById('searchInput');
let favouriteCities = new Array();

$(document).ready(function () {
    let input = elementSearchInput;
    let suggest = new SMap.Suggest(input);
    //zobrazení navržených míst - našeptávač
    suggest.urlParams({
        type: "municipality|municipality",
        bounds: "48.5370786,12.0921668|51.0746358,18.8927040"
    });
    suggest.addListener("suggest", function (suggestData) {
        input = suggest;
    });
    //procházení localStorage
    let storageArray = storage.getItem(favouriteCities);
    favouriteCities = storageArray.split(',');
    favouriteCities.forEach(element => createFavouriteItem(element));
    //kontrola checkboxu - aktivní-neaktivní
    elementSearchInput.addEventListener('input', (evt) => {
        controlCheck();
    });
});

function searchWeather(searchTerm) { //vyhledávání města
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appID}&units=${units}&lang=cz`)
        .then(result => {
            return result.json();
        }).then(result => {
            init(result);
        }).catch(error => { //město neexistuje
            alert("Chybně zadané město.");
        })
};

//propojení s vyhledaným městem + opatření mezer
document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = elementSearchInput.value.trim();
    if (searchTerm) {
        searchWeather(searchTerm);
        getPhoto(searchTerm)
    } else { //opatření proti prázdnému poli
        alert("Vyplňte město.");
    }
});

function init(resultFromServer) { //výsledky z api
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentIconImg');
    let des = document.getElementById('desc');
    let temp = document.getElementById('temp');
    let pressure = document.getElementById('pressure');
    let humidity = document.getElementById('humidity');
    let minTemp = document.getElementById('minTemp');
    let maxTemp = document.getElementById('maxTemp');
    let windSpeed = document.getElementById('windSpeed');

    //hodnoty
    cityHeader.innerText = elementSearchInput.value;
    weatherIcon.src = 'http://openweathermap.org/img/wn/' + resultFromServer.weather[0].icon + '@2x.png';
    des.innerText = resultFromServer.weather[0].description;
    temp.innerText = Math.round(resultFromServer.main.temp) + " °C/ " + Math.floor((resultFromServer.main.temp * 9 / 5) + 32) + " °F";
    minTemp.innerText = Math.round(resultFromServer.main.temp_min) + " °C/ " + Math.floor((resultFromServer.main.temp_min * 9 / 5) + 32) + " °F";
    maxTemp.innerText = Math.round(resultFromServer.main.temp_max) + " °C/ " + Math.floor((resultFromServer.main.temp_max * 9 / 5) + 32) + " °F";
    pressure.innerText = resultFromServer.main.pressure + " hPa";
    humidity.innerText = resultFromServer.main.humidity + " %";
    windSpeed.innerText = resultFromServer.wind.speed + " m/s";
}

function getPhoto(searchInput) {

    $.ajax({
        url: 'https://api.teleport.org/api/cities/?search=' + searchInput,
        type: "GET",
        dataType: "json",
        success: function (searchResult) {
            var cityURL = searchResult._embedded["city:search-results"][0]._links["city:item"].href


            $.ajax({
                url: cityURL,
                type: "GET",
                dataType: "json",
                success: function (cityResult) {
                    if (cityResult._links["city:urban_area"]) {
                        var urbanAreaURL = cityResult._links["city:urban_area"].href

                        $.ajax({
                            url: urbanAreaURL,
                            type: "GET",
                            dataType: "json",
                            success: function (urbanAreaResult) {
                                var uaImagesURL = urbanAreaResult._links["ua:images"].href

                                $.ajax({
                                    url: uaImagesURL,
                                    type: "GET",
                                    dataType: "json",
                                    success: function (uaImagesResult) {
                                        var image = uaImagesResult

                                        var widget = showImage(image)
                                        $("#showImage").html(widget)
                                        $("#showImage").show();
                                    }
                                })
                            }
                        })
                    }
                    else { $("#showImage").hide() }
                }
            })
        }
    });
}

function showImage(image) {
    return "<img src='" + image.photos[0].image.web + "' alt='image_web' />";
}

//Oblíbené položky - uložení
document.getElementById('favouriteBtn').addEventListener('click', () => {
    // Získání checkboxu a uložení do proměnné 
    var checkBox = document.getElementById("favouriteBtn");
    // získání textu z inputu 
    var city = document.getElementById("searchInput").value;

    // Podmínka, pokud je checkbox zaškrtnutý, přidej město do localStorage, pokud není zaškrnutý, odstraň
    //kontrola duplikátu
    if (checkBox.checked == true) {
        if (localStorage.getItem(city) === null) {
            favouriteCities.push(city);
            storage.setItem('favouriteCities', favouriteCities);
            //storage.setItem(city, city); --první verze
            //přidá do oblíbených
            createFavouriteItem(city);
        }
        else { alert("Město již bylo přidáno!") };
    } else {
        //odstanění položky
        /*  document.getElementById(city).remove();*/
        // storage.removeItem(city);
        var cityToRemove = elementSearchInput.value;
        favouriteCities = favouriteCities.filter((city) => {
            return city.toLowerCase() !== cityToRemove.toLowerCase();
        });
        storage.setItem('favouriteCities', favouriteCities);
        document.getElementById(city).remove();
    }
    /*  
    //neošetřuje, pokud je město již v oblíbených
    // Podmínka, pokud je checkbox zaškrtnutý, přidej město do localStorage, pokud není zaškrnutý, odstraň
      if (checkBox.checked == true) {
          storage.setItem(city, city);
          //přidá do oblíbených
          createFavouriteItem(city);
      } else {
          //odstanění položky
          document.getElementById(city).remove();
          storage.removeItem(city);
      }*/
})

//vytvoření položky
function createFavouriteItem(city) {
    //vytvořím element option a uložím do proměnné
    var newItem = document.createElement("option");
    //do tohto elementu dám text, název města, přiřadím ID tomu elementu (city = text z inputu)
    newItem.innerText = city;
    newItem.value = city;
    newItem.id = city;
    //potom najdu ten select a přiřadím do něj option
    document.getElementById("selectBox").add(newItem);
}

//funkce change, reaguje na změnu v selectu, umožňuje kliknout na vybrané město a vyhledat počasí pro toto město
document.getElementById('selectBox').addEventListener('change', () => {
    elementSearchInput.value = document.getElementById('selectBox').value;
    document.getElementById('searchBtn').click();
    document.getElementById('favouriteBtn').checked = true;
})
/*
//funkce pro kontrolu zaškrtávacího boxu, box je zaškrtnut, pokud je místo v oblíbených
function controlCheck() { ---špatné ošetření - zaškrtnuté pole se neuloží - musí se dvakrát aktivovat

    var text = elementSearchInput.value;

    Object.keys(storage).forEach(function (key) {
        var item = storage.getItem(key);
        if (item.value === text.value) {
            document.getElementById('favouriteBtn').checked = true;
        } else {
            document.getElementById('favouriteBtn').checked = false;
            document.getElementById('favItem').selected = true;
        }

    });
}*/

//funkce pro kontrolu zaškrtávacího boxu, box je zaškrtnut, pokud je místo v oblíbených
function controlCheck() {

    var text = elementSearchInput.value;

    //pokud je město v oblíbených - checkbox zaškrtnutý
    if (storage.getItem(text) === text) {
        document.getElementById('favouriteBtn').checked = true;
    }
    else { //pokud není v oblíbených - není zaškrnutý, pokud je vybraná položka ze selectu - je zakšrtnutý
        document.getElementById('favouriteBtn').checked = false;
        document.getElementById('favItem').selected = true;
    }

}
