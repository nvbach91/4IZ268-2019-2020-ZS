$(document).ready(() => {
    $("#buttonNav").click(navigate);
    $("#buttonCancel").click(cancelRoute);

    var m = new SMap(JAK.gel("map"));
    m.addDefaultLayer(SMap.DEF_BASE).enable();
    m.addDefaultControls();
    m.addControl(new SMap.Control.Sync());
    m.addDefaultLayer(SMap.DEF_TURIST);
    m.addDefaultLayer(SMap.DEF_OPHOTO);
    var mouse = new SMap.Control.Mouse(SMap.MOUSE_PAN | SMap.MOUSE_WHEEL | SMap.MOUSE_ZOOM); /* Ovládání myší */
    m.addControl(mouse);

    var layerSwitch = new SMap.Control.Layer();
    layerSwitch.addDefaultLayer(SMap.DEF_BASE);
    layerSwitch.addDefaultLayer(SMap.DEF_TURIST);
    layerSwitch.addDefaultLayer(SMap.DEF_OPHOTO);
    m.addControl(layerSwitch, { left: "15px", top: "15px" });

    var picture = "https://api.mapy.cz/img/api/marker/drop-red.png";
    var markers = [];
    var coords = [];
    var startPoint;
    var data;
    var clickedMarker = false;
    var endPointCoords;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            data = JSON.parse(this.responseText);
            addInfo(data);
        }
    };
    xmlhttp.open("GET", "json/data.json", true);
    xmlhttp.send();

    var layer = new SMap.Layer.Marker();
    m.addLayer(layer);
    layer.enable();
    var unescoList = '';
    $.getJSON("json/data.json", function (data) {
        $.each(data, function (key, value) {
            unescoList += "<option>" + value.name + "</option>";
        });
        $("#select").html(unescoList);
    });

    function addInfo(data) {
        data.forEach(function (marker) {
            var c = SMap.Coords.fromWGS84(marker.coordinates);
            var options = {
                url: picture,
                title: marker.name,
                anchor: { left: 10, bottom: 1 }
            };
            var point = new SMap.Marker(c, marker.id, options);
            coords.push(c);
            markers.push(point);
        });
        for (var i = 0; i < markers.length; i++) {
            layer.addMarker(markers[i]);
            var card = new SMap.Card();
            card.getHeader().innerHTML = "<strong>" + data[i].name + "</strong>";
            card.getBody().innerHTML = data[i].description;
            markers[i].decorate(SMap.Marker.Feature.Card, card);
        }
    };

    var cz = m.computeCenterZoom(coords);
    var path;
    var layerPath = new SMap.Layer.Geometry();
    m.addLayer(layerPath).enable();

    var found = function (route) {
        var coords = route.getResults().geometry;
        $("#path").html("Délka cesty: " + route.getResults().length / 1000 + "km<br>Stoupání: " + route.getResults().ascent + "m<br>Klesání: " + route.getResults().descent + "m");

        if (path != null) {
            layerPath.removeGeometry(path);
        }
        path = new SMap.Geometry(SMap.GEOMETRY_POLYLINE, null, coords);
        layerPath.addGeometry(path);
    };



    function markerClick(e) {
        clickedMarker = true;
        var marker = e.target;
        var id = marker.getId();

        for (var i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                $("#select")[0].selectedIndex = data[i].id - 1;
                endPointCoords = SMap.Coords.fromWGS84(data[i].coordinates);
                $("#unesco").html(data[i].name + "<br>" + data[i].adress + "<br>" + data[i].coordinates);
            }
        }

        var startPointCoords;

        if (startPoint != null) {
            startPointCoords = startPoint._coords;
        }
        else {
            startPointCoords = SMap.Coords.fromWGS84(14.41790, 50.12655);
            var options = {
                url: picture,
                title: "Začátek",
                anchor: { left: 10, bottom: 1 }
            }
            startPoint = new SMap.Marker(startPointCoords, null, options);
            startPoint.decorate(SMap.Marker.Feature.Draggable);
            layer.addMarker(startPoint);
            //noStartPoint();
        }
        var coords = [startPointCoords, endPointCoords]
        var route = new SMap.Route(coords, found);
    };
    function mapClick(e) {
        if (clickedMarker) {
            clickedMarker = false;
        }
        else {
            var startPointCoords = SMap.Coords.fromEvent(e.data.event, m);
            if (startPoint != null) {
                layer.removeMarker(startPoint);
            }
            var options = {
                url: picture,
                title: "Začátek",
                anchor: { left: 10, bottom: 1 }
            };
            startPoint = new SMap.Marker(startPointCoords, null, options);
            startPoint.decorate(SMap.Marker.Feature.Draggable);
            layer.addMarker(startPoint);
            if (path !== null) {
                var coords = [startPointCoords, endPointCoords];
                var route = new SMap.Route(coords, found);
            }
        }
    };

    function start(e) {
        var node = e.target.getContainer();
        node[SMap.LAYER_MARKER].style.cursor = "default";
    };

    function stop(e) {
        var node = e.target.getContainer();
        node[SMap.LAYER_MARKER].style.cursor = "pointer";
        var startPointCoords = e.target.getCoords();
        if (path !== null) {
            var coords = [startPointCoords, endPointCoords];
            var route = new SMap.Route(coords, found);
        }
    };

    var signals = m.getSignals();
    signals.addListener(window, "marker-drag-stop", stop);
    signals.addListener(window, "marker-drag-start", start);
    signals.addListener(this, "marker-click", markerClick);
    signals.addListener(this, "map-click", mapClick);

    function cancelRoute() {
        if (layer != null && startPoint != null) {
            layer.removeMarker(startPoint);
            startPoint = null;
        }
        if (layerPath != null && path != null) {
            layerPath.removeGeometry(path);
            path = null;
        }
        $("#unesco").html("");
        $("#path").html("");

        var cz = m.computeCenterZoom(coords);
        m.setCenterZoom(cz[0], cz[1]);
    };

    function noStartPoint() {
        if ('geolocation' in navigator) {
            console.log("GPS dostupná");
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;
                startPointCoords = SMap.Coords.fromWGS84(lon, lat);
            });
        } else {
            console.log("GPS nedostupná");
            startPointCoords = SMap.Coords.fromWGS84(14.41790, 50.12655);
        }

        var options = {
            url: picture,
            title: "Začátek",
            anchor: { left: 10, bottom: 1 }
        };
        startPoint = new SMap.Marker(startPointCoords, null, options);
        startPoint.decorate(SMap.Marker.Feature.Draggable);
        layer.addMarker(startPoint);
    };
    function navigate() {
        if (startPoint != null) {
            layer.removeMarker(startPoint);
        }
        noStartPoint();

        var id = $("#select")[0].selectedIndex;
        for (var i = 0; i < data.length; i++) {
            if (data[i].id - 1 === id) {
                endPointCoords = SMap.Coords.fromWGS84(data[i].coordinates);
                $("#unesco").html(data[i].name + "<br>" + data[i].adress + "<br>" + data[i].coordinates);

            }
        }
        var coords = [startPointCoords, endPointCoords];
        var route = new SMap.Route(coords, found);
    };
    /*var saveContents = $("#save-contents");
    $("#buttonAdd").bind("click", function () {
        var task = $("#select")[0].selectedIndex;

        var tasks;

        if (localStorage.getItem("tasks") === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem("tasks"));
            for (var i = 0; i < data.length; i++) {
                if (data[i].id - 1 === task) {
                    var saveContent = $("<li>").addClass("save-content");
                    saveContent.append(data[i].name);
                    saveContents.append(saveContent);
                }
            }
        }
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        tasks.forEach(function (task) {
            console.log(task);
        });
    });*/

});
