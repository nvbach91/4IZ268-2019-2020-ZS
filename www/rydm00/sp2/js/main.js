const App = {};

App.init = () => {
    App.button = $('.delete-all-button');
    App.locationButton = $('.my-location-button');
    App.latitude = 0;
    App.longitude = 0;
    App.weatherDestination1 = $('.weather-destination1');
    App.weatherDestination2 = $('.weather-destination2');
    App.timeDestination1 = $('.time-destination1');
    App.timeDestination2 = $('.time-destination2');
    App.result = $('.results');
    App.result.hide();
    App.timezoneA = null;
    App.timezoneB = null;
};

$(document).ready(() => {
    App.init();

    function getLocation(callback) {
        if (navigator.geolocation) {
            var lat_lng = navigator.geolocation.getCurrentPosition(function (position) {
                var userPosition = {};
                userPosition.lat = position.coords.latitude;
                userPosition.lng = position.coords.longitude;
                callback(userPosition);
            }, function () {
                var userPosition = {};
                userPosition.lat = 49.7437572;
                userPosition.lng = 15.3386383;
                callback(userPosition);
                alert('Nezjistil jsem tvou polohu, poloha byla nastavena do geografického středu ČR');
            });
        }
    }

    getLocation(function (lat_lng) {
        App.latitude = Object.values(lat_lng)[0];
        App.longitude = Object.values(lat_lng)[1];

        //add map
        var map = new SMap(JAK.gel('map'), SMap.Coords.fromWGS84(App.longitude, App.latitude), 5);
        map.addDefaultLayer(SMap.DEF_BASE).enable(); //basic layer of the map
        map.addDefaultControls();

        // mouse function on the map
        var mouse = new SMap.Control.Mouse(SMap.MOUSE_PAN | SMap.MOUSE_WHEEL | SMap.MOUSE_ZOOM);
        map.addControl(mouse);

        //adding layer for markers
        var layerMarker = new SMap.Layer.Marker();
        map.addLayer(layerMarker);
        layerMarker.enable();

        var numberOfMarkers = 0; //for counting markers on the map

        //create delete Button and add click function
        const markersDeleteButton = $('<button>');
        markersDeleteButton.attr('class', 'delete-button');
        markersDeleteButton.text('SMAZAT ZNAČKY');

        markersDeleteButton.click(() => {
            layerMarker.removeAll();
            markersDeleteButton.hide();
            numberOfMarkers = 0;
            $('.weather-destination1').text('');
            $('.weather-destination2').text('');
            $('.time-destination1').text('');
            $('.time-destination2').text('');
            App.timezoneA = null;
            App.timezoneB = null;
            $('.results').text('');
            App.result.hide();
        });

        const locateButton = $('<button>');
        locateButton.attr('class', 'location-button');
        locateButton.text('PŘIDEJ MOU POLOHU');

        locateButton.click(() => {
            var myCoords = SMap.Coords.fromWGS84(App.longitude, App.latitude);
            if (numberOfMarkers == 0) {
                var marker1 = new SMap.Marker(myCoords, 'marker1');
                layerMarker.addMarker(marker1);

                const spinner = $('<div class="spinner"></div>');
                addWeather(App.latitude, App.longitude, App.weatherDestination1, spinner);
                const spinner2 = $('<div class="spinner"></div>');
                addTimezone(App.latitude, App.longitude, App.timeDestination1, spinner2);
                numberOfMarkers++;

                App.button.append(markersDeleteButton);
                markersDeleteButton.show();

            } else if (numberOfMarkers == 1) {
                var marker1 = new SMap.Marker(myCoords, 'marker2');
                layerMarker.addMarker(marker1);

                const spinner = $('<div class="spinner"></div>');
                addWeather(App.latitude, App.longitude, App.weatherDestination2, spinner);
                const spinner2 = $('<div class="spinner"></div>');
                addTimezone(App.latitude, App.longitude, App.timeDestination2, spinner2);
                numberOfMarkers++;

                App.button.append(markersDeleteButton);
                markersDeleteButton.show();

            } else {
                alert('Lze přidat pouze dvě lokace. Pro zadání další, smaž stávající.');
            }
        });

        App.locationButton.append(locateButton);

        function clickMap(e) {
            var coords = SMap.Coords.fromEvent(e.data.event, map);
            var coordinates = coords.toString().split(',');
            var coordsLon = coordinates[0].slice(1, coordinates[0].length);
            var coordsLat = coordinates[1].slice(0, coordinates[1].length - 1);
            if (numberOfMarkers == 0) {
                var marker1 = new SMap.Marker(coords, 'marker1');
                layerMarker.addMarker(marker1);

                const spinner = $('<div class="spinner"></div>');
                addWeather(coordsLat, coordsLon, App.weatherDestination1, spinner);
                const spinner2 = $('<div class="spinner"></div>');
                addTimezone(coordsLat, coordsLon, App.timeDestination1, spinner2);
                numberOfMarkers++;

                App.button.append(markersDeleteButton);
                markersDeleteButton.show();

            } else if (numberOfMarkers == 1) {
                var marker2 = new SMap.Marker(coords, 'marker2');
                layerMarker.addMarker(marker2);

                const spinner = $('<div class="spinner"></div>');
                addWeather(coordsLat, coordsLon, App.weatherDestination2, spinner);
                const spinner2 = $('<div class="spinner"></div>');
                addTimezone(coordsLat, coordsLon, App.timeDestination2, spinner2);
                numberOfMarkers++;

            } else {
                alert('Lze přidat pouze dvě lokace. Pro zadání další, smaž stávající.');
            }
        };

        function addWeather(coords1, coords2, destination, spinner) {
            destination.append(spinner);
            $.get({
                url: `http://api.weatherbit.io/v2.0/current?lat=${coords1}&lon=${coords2}&lang=cz&key=3a18e2d9578843c48342b988afbfae17`
            }).done((data) => {
                var weatherObject = data['data'][0]['weather'];
                var otherInfo = data['data'][0];
                let addedHTML = `
                        <div class="weather-place">${otherInfo.city_name} (${otherInfo.country_code})</div>
                        <div class="weather-description">${weatherObject.description}</div>
                        <div class="weather-temperature">${otherInfo.temp} °C</div>
                        <img class="weather-icon" src="https://www.weatherbit.io/static/img/icons/${weatherObject.icon}.png" alt="Ikonka počasí">
                        `;
                destination.append(addedHTML);
            }).always(() => {
                spinner.remove();
            });
        };

        function addTimezone(coords1, coords2, destination, spinner) {
            destination.append(spinner);
            $.get({
                url: `http://api.timezonedb.com/v2.1/get-time-zone?key=BWIGLRXY65J4&format=json&by=position&lat=${coords1}&lng=${coords2}`
            }).done((data) => {
                if (data.status === 'OK') {
                    var UTCtime = Math.floor(data.gmtOffset / 3600);
                    var date = data.formatted.toString();
                    if (UTCtime >= 0) {
                        let addedHTML = `
                        <div class="date-time">${moment(date, ['YYYY-MM-DD hh:mm:ss'], 'cs').format('LLL')}</div>
                        <div class="gmt-offset">UTC+${UTCtime}</div>
                        `;
                        destination.append(addedHTML);

                    } else {
                        let addedHTML = `
                        <div class="date-time">${moment(date, ['YYYY-MM-DD hh:mm:ss'], 'cs').format('LLL')}</div>
                        <div class="gmt-offset">UTC${UTCtime}</div>
                        `;
                        destination.append(addedHTML);
                    }

                } else {
                    let addedHTML = `
                    <div class="error">Omlouvám se, na tomto místě jsem nenalezl potřebná data.</div>
                    `;
                    destination.append(addedHTML);
                }
                if (App.timezoneA === null) {
                    App.timezoneA = UTCtime;
                } else {
                    App.timezoneB = UTCtime;
                    App.result.show();
                    var addedText;
                    var difference;
                    if (App.timezoneA === App.timezoneB) {
                        addedText = `Časový posun mezi destinací A a B žádný není`;
                        App.result.append(addedText);
                    } else if (App.timezoneA > App.timezoneB) {
                        difference = App.timezoneA - App.timezoneB;
                    } else if (App.timezoneA < App.timezoneB) {
                        difference = App.timezoneB - App.timezoneA;
                    } else {
                        addedText = `Časový posun mezi destinací A a B nelze určit.`;
                        App.result.append(addedText);
                    }
                    if (difference === 1) {
                        addedText = `Časový posun mezi destinací A a B je ${difference} hodina`;
                        App.result.append(addedText);
                    } else if (difference > 1 && difference < 5) {
                        addedText = `Časový posun mezi destinací A a B jsou ${difference} hodiny`;
                        App.result.append(addedText);
                    } else if (difference >= 5) {
                        addedText = `Časový posun mezi destinací A a B je ${difference} hodin`;
                        App.result.append(addedText);
                    }
                }

            }).always(() => {
                spinner.remove();
            });
        };

        map.getSignals().addListener(window, 'map-click', clickMap); //when clicked --> do clickMap

    });

});