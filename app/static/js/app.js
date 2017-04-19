// Creat map wrapper, we center point and zoom level
var map = L.map('map').setView([40.7328, -73.9059], 10);

// global, current geoJSON layer
var geoJSONLayer;

// On first load, retrieve borough geoJSON file
// Display map
$.getJSON('/static/geo_data/borough.json', function(data) {
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        // attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1Ijoiam9obnNwZW5jZXIxNSIsImEiOiJjajE2b2hhN2owMzl2MzRvNjhpdDM5bzk3In0.wr4EEzRfvpGTw6C9ltRZsw'
    }).addTo(map);
    geoJSONLayer = L.geoJSON(data)
    geoJSONLayer.addTo(map);
});


// When user zooms, update the geoJSON layer
map.on('zoomend', function() {
    var currentZoom = map.getZoom();
    map.removeLayer(geoJSONLayer);
    if (currentZoom <= 10) {
        $.getJSON('/static/geo_data/borough.json', function(data) {
            geoJSONLayer = L.geoJSON(data)
            geoJSONLayer.addTo(map);
        });
    } else if (currentZoom <= 12) {
        $.getJSON('/static/geo_data/neighborhood.json', function(data) {
            geoJSONLayer = L.geoJSON(data)
            geoJSONLayer.addTo(map);
        });
    } else if (currentZoom <= 14) {
        $.getJSON('/static/geo_data/zip.json', function(data) {
            geoJSONLayer = L.geoJSON(data)
            geoJSONLayer.addTo(map);
        });
    }
});
