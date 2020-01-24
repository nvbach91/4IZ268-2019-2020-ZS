$(document).ready(() => {
    $("#buttonNav").click(navigate);
    $("#buttonCancel").click(cancelRoute);
    $("#buttonAdd").click(addUnesco);

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

    var picture = "./img/marker.png";
    var startMark = "https://api.mapy.cz/img/api/marker/drop-red.png";
    var markers = [];
    var coords = [];
    var data;
    var startPoint;
    var clickedMarker = false;
    var endPointCoords;
    var image = $("#image");
    var unesco = $("#unesco");
    var pathInfo = $("#path");

    var layer = new SMap.Layer.Marker();
    m.addLayer(layer);
    layer.enable();
    var unescoList = '';

    $.ajax({
        dataType: "json",
        url: "https://api.myjson.com/bins/15rdki",
        data: "json",
        success: function(items) {
            data = items;
            addInfo(items);
        }
    });

    function addInfo(data) {
        $.each(data, function(key, value) {
            var c = SMap.Coords.fromWGS84(value.coordinates);
            var options = {
                url: picture,
                title: value.name,
                anchor: { left: 10, bottom: 1 }
            };
            var point = new SMap.Marker(c, value.id, options);
            coords.push(c);
            markers.push(point);
            unescoList += "<option>" + value.name + "</option>";
        });
        for (var i = 0; i < markers.length; i++) {
            layer.addMarker(markers[i]);
            var card = new SMap.Card();
            card.getHeader().innerHTML = "<strong>" + data[i].name + "</strong>";
            card.getBody().innerHTML = data[i].description;
            markers[i].decorate(SMap.Marker.Feature.Card, card);
        }
        $("#select").html(unescoList);
    };

    var path;
    var layerPath = new SMap.Layer.Geometry();
    m.addLayer(layerPath).enable();

    function found(route) {
        var coords = route.getResults().geometry;
        pathInfo.html("Délka cesty: " + route.getResults().length / 1000 + "km<br>Stoupání: " + route.getResults().ascent + "m<br>Klesání: " + route.getResults().descent + "m");

        if (path) {
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
            if (data[i].id == id) {
                $("#select")[0].selectedIndex = data[i].id - 1;
                endPointCoords = SMap.Coords.fromWGS84(data[i].coordinates);
                unesco.html(data[i].name + "<br>" + data[i].adress + "<br>" + data[i].coordinates);
                image.attr("src", data[i].image);
                image.attr("alt", data[i].name);
            }
        }

        var startPointCoords;

        if (startPoint) {
            startPointCoords = startPoint._coords;
        } else {
            startPointCoords = SMap.Coords.fromWGS84(14.41790, 50.12655);
            var options = {
                url: startMark,
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
        } else {
            var startPointCoords = SMap.Coords.fromEvent(e.data.event, m);
            if (startPoint) {
                layer.removeMarker(startPoint);
            }
            var options = {
                url: startMark,
                title: "Začátek",
                anchor: { left: 10, bottom: 1 }
            };
            startPoint = new SMap.Marker(startPointCoords, null, options);
            startPoint.decorate(SMap.Marker.Feature.Draggable);
            layer.addMarker(startPoint);
            if (path) {
                var coords = [startPointCoords, endPointCoords];
                var route = new SMap.Route(coords, found);
            }
        }
    };

    function startDrag(e) {
        var node = e.target.getContainer();
        node[SMap.LAYER_MARKER].style.cursor = "help";
    };

    function stopDrag(e) {
        var node = e.target.getContainer();
        node[SMap.LAYER_MARKER].style.cursor = "pointer";
        var startPointCoords = e.target.getCoords();
        if (path) {
            var coords = [startPointCoords, endPointCoords];
            var route = new SMap.Route(coords, found);
        }
    };

    var signals = m.getSignals();
    signals.addListener(window, "marker-drag-stop", stopDrag);
    signals.addListener(window, "marker-drag-start", startDrag);
    signals.addListener(this, "marker-click", markerClick);
    signals.addListener(this, "map-click", mapClick);

    function cancelRoute() {
        if (layer && startPoint) {
            layer.removeMarker(startPoint);
            startPoint = null;
        }
        if (layerPath && path) {
            layerPath.removeGeometry(path);
            path = null;
        }
        unesco.html("");
        pathInfo.html("");
        image.removeAttr("src");
        image.removeAttr("alt");
        var centerZoom = m.computeCenterZoom(coords);
        m.setCenterZoom(centerZoom[0], centerZoom[1]);
    };

    function noStartPoint() {
        if ("geolocation" in navigator) {
            console.log("GPS dostupná");
            navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;
                startPointCoords = SMap.Coords.fromWGS84(lon, lat);
            });
        } else {
            console.log("GPS nedostupná");
            startPointCoords = SMap.Coords.fromWGS84(14.41790, 50.12655);
        }

        var options = {
            url: startMark,
            title: "Začátek",
            anchor: { left: 10, bottom: 1 }
        };
        startPoint = new SMap.Marker(startPointCoords, null, options);
        startPoint.decorate(SMap.Marker.Feature.Draggable);
        layer.addMarker(startPoint);
    };

    function navigate() {
        if (startPoint) {
            layer.removeMarker(startPoint);
        }
        noStartPoint();

        var id = $("#select")[0].selectedIndex;
        for (var i = 0; i < data.length; i++) {
            if (data[i].id - 1 === id) {
                endPointCoords = SMap.Coords.fromWGS84(data[i].coordinates);
                $("#unesco").html(data[i].name + "<br>" + data[i].adress + "<br>" + data[i].coordinates);
                $("#image").attr("src", data[i].image);
                $("#image").attr("alt", data[i].name);
                break;
            }

        }

        var coords = [startPointCoords, endPointCoords];
        var route = new SMap.Route(coords, found);
    };



    function addUnesco() {
        var favorite = JSON.parse(localStorage.getItem("favorite") || "[]");

        for (var i = 0; i < data.length; i++) {
            var objectt = $("#select")[0].selectedIndex;

            if (data[i].id - 1 === objectt) {

                var object = {
                    name: data[i].name,
                    image: data[i].image
                };
                favorite.push(object);
                console.log(favorite);
            }

            localStorage.setItem("favorite", JSON.stringify(favorite));
            reload();

        }
    }

    function reload() {
        var html = "";

        JSON.parse(localStorage.getItem("favorite")).forEach(function(favorite) {
            html += `<div class='favorite'><div class='favorite-name'>${favorite.name}</div><button class='remove-favorite'>remove</button></div>`

        });
        $("#favorites").empty().append(html);

        $("#favorites .remove-favorite").click(function() {
            removeFavorites($(this));
        });
    }
    reload();

    function removeFavorites(removeButton) {

        var favorite = JSON.parse(localStorage.getItem("favorite"));
        var newFavorites = favorite.filter((favorite) => {
            return favorite.name !== removeButton.siblings(".favorite-name").text();
        })
        localStorage.setItem("favorite", JSON.stringify(newFavorites));
        removeButton.parent().remove();
    }
});