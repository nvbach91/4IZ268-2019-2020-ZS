$(document).ready(function(){
var markersTable = $('#markers')
var notes = document.querySelector('#notes')
var markerCounter = 0;
var routeCounter = 0;
var routeButton = document.querySelector('#route-button');
var newRouteButton = document.querySelector('#new-route-button');
var forecastProjection = document.querySelector('#forecast');
var image = 'https://api.mapy.cz/img/api/marker/drop-red.png';
var deviceLatitude = 49.741039;
var deviceLongitude = 15.336030;
var markers = [];
var center = SMap.Coords.fromWGS84(deviceLongitude, deviceLatitude);
var errorOccured = document.createElement('p');
errorOccured.innerText = 'Trasu není možné vypočítat!';
errorOccured.id = 'route-error';
var m = new SMap(JAK.gel("m"), center);
m.addControl(new SMap.Control.Sync()); /* Aby mapa reagovala na změnu velikosti průhledu */
m.addDefaultLayer(SMap.DEF_BASE).enable(); /* Turistický podklad */
var mouse = new SMap.Control.Mouse(SMap.MOUSE_PAN | SMap.MOUSE_WHEEL | SMap.MOUSE_ZOOM); /* Ovládání myší */
m.addControl(mouse);
var layerMarker = new SMap.Layer.Marker();
m.addLayer(layerMarker);
layerMarker.enable();




newRouteButton.addEventListener('click', () => {//refresh tlačítko-smazat všechna data
  markerCounter = 0;
  routeCounter = 0;
  markers.splice(0, 1);
  markers.splice(1, 1);
  $('#m').remove();
  var newMap = document.createElement('div');
  newMap.id = 'm';
  $('#map-projection').append(newMap);

  m = new SMap(JAK.gel("m"), center);
  m.addControl(new SMap.Control.Sync()); /* Aby mapa reagovala na změnu velikosti průhledu */
  m.addDefaultLayer(SMap.DEF_BASE).enable(); /* Turistický podklad */
  var mouse = new SMap.Control.Mouse(SMap.MOUSE_PAN | SMap.MOUSE_WHEEL | SMap.MOUSE_ZOOM); /* Ovládání myší */
  m.addControl(mouse);
  layerMarker = new SMap.Layer.Marker();
  m.addLayer(layerMarker);
  layerMarker.enable();

  markers.splice(0, 1);
  markers.splice(1, 1);
  m.getSignals().addListener(window, 'map-click', click);
  $('.table-row').remove();
  $('.notes-data').remove();
  $('.chartjs-size-monitor').remove();
  $('#my-chart').remove();
  $('#route-error').remove();
  var newChart = document.createElement('canvas');
  newChart.id = 'my-chart';
  var chartProjection = $('#chart-projection');
  chartProjection.append(newChart);

});

function click(e, elm) {

  if (markerCounter === 2) {
    return;
  }
  var coords = SMap.Coords.fromEvent(e.data.event, m);
  var titleInput = prompt('Zadejte popisek značky', 'Popis místa');
  if (titleInput === 'Popis místa' || titleInput === null) {
    return alert('Nesmíte použít předem definovaou hodnotu, nebo jste zrušili zadávání');

  }
  else {
    var options = {
      url: image,
      title: titleInput,
      anchor: { left: 10, bottom: 1 }
    };
    var marker = new SMap.Marker(coords, null, options);
    markers.push(marker);
    layerMarker.addMarker(marker);
    createMarkerRow(marker);
    markerCounter++;
  }
};

const createMarkerRow = (marker) => {
  const markerRow = document.createElement('div');
  markerRow.className = "table-row";
  markersTable.append(markerRow);

  const titleCell = document.createElement('div');
  titleCell.className = "title-cell";
  titleCell.innerText = marker.getTitle();

  const coordsCell = document.createElement('div');
  coordsCell.innerText = marker.getCoords();
  coordsCell.className = "coords-cell";

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-button';
  deleteButton.innerText = 'smazat';

  deleteButton.addEventListener('click', () => {
    markersTable.removeChild(markerRow);
    layerMarker.removeMarker(marker);
    if (marker.getId() === markers[0].getId()) {
      markers.splice(0, 1);
      markerCounter--;
    }
    else {
      markers.splice(1, 1);
      markerCounter--;
    }

  });
  markerRow.appendChild(titleCell);
  markerRow.appendChild(coordsCell);
  markerRow.appendChild(deleteButton);

};

var nalezeno = function (route) {
  if (routeCounter === 0) {
    routeCounter++;
    var layer = new SMap.Layer.Geometry();
    m.addLayer(layer).enable();
    var errorMessage = route.getResults();
    var error = errorMessage.error;
    if (error === true) {
      notes.appendChild(errorOccured);
      $(".delete-button").remove();
    }
    else {
      var coords = route.getResults().geometry;
      var cz = m.computeCenterZoom(coords);
      m.setCenterZoom(cz[0], cz[1]);
      var g = new SMap.Geometry(SMap.GEOMETRY_POLYLINE, null, coords);
      layer.addGeometry(g);
      const routeLength = document.createElement('div');
      routeLength.className = 'notes-data';
      routeLength.innerText = `Celková délka trasy: ${route.getResults().length} metrů`;
      notes.appendChild(routeLength);
      const routeAscent = document.createElement('div');
      routeAscent.className = 'notes-data';
      routeAscent.innerText = `Celkové stoupání: ${route.getResults().ascent} metrů`;
      notes.appendChild(routeAscent);
      const routeDescent = document.createElement('div');
      routeDescent.className = 'notes-data';
      routeDescent.innerText = `Celkové klesání: ${route.getResults().descent} metrů`;
      notes.appendChild(routeDescent);
      $(".delete-button").remove();
      var graphData = route.getResults().altitude;
      var ctx = $('#my-chart');
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: graphData,
          datasets: [{
            label: 'Profil trasy',
            data: graphData,
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: false
          }]
        },
      })

    }
  }


}


routeButton.addEventListener('click', () => {
  if (routeCounter !== 0) {
    alert('Již jste jednu trasu vytvořil.');
    return;
  }
  var confirmation = prompt('Opravdu chcete vytvořit trasu na mapě? Pro vytvoření klikněte na Ok. Po odsouhlasení již nebude možné změnit značky na mapě.', 'Ano');
  if (confirmation !== 'Ano') {
    alert
    return;
  }
  if (markers.length < 2) {
    alert("Musíte zadat obě značky");
    return;
  }
  else {
    var loader = document.createElement('div');
    loader.classList.add('loader');
    var coords = [
      SMap.Coords.fromWGS84(markers[0].getCoords().x, markers[0].getCoords().y),
      SMap.Coords.fromWGS84(markers[1].getCoords().x, markers[1].getCoords().y)
    ];
    forecastProjection.appendChild(loader);
    if (routeCounter === 0) {
      weatherForecast(coords[0].y, coords[0].x, coords[1].y, coords[1].x, loader);
    }
  }
  var route = new SMap.Route(coords, nalezeno);
});

var weatherForecast = (latOne, lonOne, latTwo, lonTwo, loader) => {
  var xhrOne = new XMLHttpRequest();
  var xhrTwo = new XMLHttpRequest();
  xhrOne.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat=' + latOne + '&lon=' + lonOne + '&units=metric&APPID=9ffdcccd6c31e96b12e158ffb623e764&lang=cz');

  xhrOne.addEventListener('load', function () {
    var forecastData = JSON.parse(xhrOne.responseText);
    var forecastRow = document.createElement('div');
    forecastRow.className = 'table-row';

    var placeCell = document.createElement('div');
    placeCell.className = 'place-cell'
    placeCell.innerText = forecastData.name + ' ( ' + markers[0].getTitle() + ' )';
    forecastRow.appendChild(placeCell);

    var temperatureCell = document.createElement('div');
    temperatureCell.className = 'temperature-cell'
    temperatureCell.innerText = forecastData.main.temp + ' / ' + (forecastData.main.temp * 1.8 + 32).toFixed(2);
    forecastRow.appendChild(temperatureCell);

    var forecastCell = document.createElement('div');
    forecastCell.className = 'forecast-cell';
    forecastCell.innerHTML = forecastData.weather[0].description;
    forecastRow.appendChild(forecastCell);

    var windCell = document.createElement('div');
    windCell.className = 'wind-cell';
    windCell.innerText = forecastData.wind.speed;
    forecastRow.appendChild(windCell);
    forecastProjection.removeChild(loader);
    forecastProjection.appendChild(forecastRow);
  });
  xhrOne.send();
  xhrTwo.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat=' + latTwo + '&lon=' + lonTwo + '&units=metric&APPID=9ffdcccd6c31e96b12e158ffb623e764&lang=cz');
  xhrTwo.addEventListener('load', function () {
    var forecastData = JSON.parse(xhrTwo.responseText);
    var forecastRow = document.createElement('div');
    forecastRow.className = 'table-row';

    var placeCell = document.createElement('div');
    placeCell.className = 'place-cell'
    placeCell.innerText = forecastData.name + ' ( ' + markers[1].getTitle() + ' )';
    forecastRow.appendChild(placeCell);

    var temperatureCell = document.createElement('div');
    temperatureCell.className = 'temperature-cell'
    temperatureCell.innerText = forecastData.main.temp + ' / ' + (forecastData.main.temp * 1.8 + 32).toFixed(2);
    forecastRow.appendChild(temperatureCell);

    var forecastCell = document.createElement('div');
    forecastCell.className = 'forecast-cell';
    forecastCell.innerHTML = forecastData.weather[0].description;
    forecastRow.appendChild(forecastCell);

    var windCell = document.createElement('div');
    windCell.className = 'wind-cell';
    windCell.innerText = forecastData.wind.speed;
    forecastRow.appendChild(windCell);

    forecastProjection.appendChild(forecastRow);
  });
  xhrOne.addEventListener('error', function (e) {
    console.error('XHR error', e);
  });
  xhrTwo.send();
};
m.getSignals().addListener(window, 'map-click', click);
})