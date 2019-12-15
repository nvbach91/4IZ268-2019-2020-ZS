var input = document.getElementById('query');

var result = [];
/*
Po zadání latituse a longitude vrací předpověď počasí
*/

function getForecast(latlong) {
    var urlDarkSky = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/baab8fd9c1efb00edda82f01f5f91488/${latlong[0].y},${latlong[0].x}?lang=cs&extend=hourly`
        //var urlDarkSky = `https://crossorigin.me/https://api.darksky.net/forecast/baab8fd9c1efb00edda82f01f5f91488/${latlong.lat},${latlong.lng}?lang=cs&extend=hourly`


    $.getJSON(urlDarkSky).done(function(forecast) {
        result = forecast;
        createDiv(forecast);

    });
}

function createDiv(weatherInfo) {
    var div = document.createElement("div");
    div.className = 'result';
    var p = document.createElement("p");
    p.innerText = weatherInfo.daily.summary;
    div.appendChild(p);
    document.getElementsByClassName('forecast-wrapper')[0].appendChild(div);
}
/////////////////////////////Seznam API

/*var m = new SMap(JAK.gel("m"));
m.addControl(new SMap.Control.Sync());
m.addDefaultLayer(SMap.DEF_BASE).enable();
m.addDefaultControls();*/

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
        console.log(item)
        data.push(item.coords);
    }
    console.log('long: ' + data[0].x);
    console.log('lat: ' + data[0].y);
    getForecast(data);
    //result = data;
    return data;
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