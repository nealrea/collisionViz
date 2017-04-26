// Creat map wrapper, we center point and zoom level
var map = L.map('map').setView([40.7328, -73.9059], 10);

// global, for storing geo JSON layers and current state
var geoLayer = {};

// store data from the server here
var globalData = {};

// On first load, retrieve geoJSON file
// Display map
$.getJSON('/static/geo_data/borough_zip_geo_backup.json', function(data) {
    geoLayer.boroughData = data.borough;
    geoLayer.zipData = data.zip
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1Ijoiam9obnNwZW5jZXIxNSIsImEiOiJjajE2b2hhN2owMzl2MzRvNjhpdDM5bzk3In0.wr4EEzRfvpGTw6C9ltRZsw'
    }).addTo(map);
    geoLayer.currentLayer.addTo(map);
    geoLayer.currentName = 'borough';
});


// When user zooms, update the geoJSON layer
map.on('zoomend', function() {
    var currentZoom = map.getZoom();

    if (currentZoom <= 11 && geoLayer.currentName !== 'borough') {
        map.removeLayer(geoLayer.currentLayer);
        geoLayer.currentLayer = L.geoJSON(geoLayer.boroughData);
        geoLayer.currentLayer.addTo(map);
        geoLayer.currentName = 'borough';
    } else if (currentZoom >= 12 && currentZoom <= 13 && geoLayer.currentName !== 'zip') {
        map.removeLayer(geoLayer.currentLayer);
        geoLayer.currentLayer = L.geoJSON(geoLayer.zipData);
        geoLayer.currentLayer.addTo(map);
        geoLayer.currentName = 'zip';
    } else if (currentZoom >= 14) {
        map.removeLayer(geoLayer.currentLayer);
        geoLayer.currentLayer = L.geoJSON(geoLayer.zipData);
        geoLayer.currentName = 'None';
    }

});
