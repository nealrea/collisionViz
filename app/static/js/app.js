var mymap = L.map('map').setView([40.7328, -73.9059], 11);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    // attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoiam9obnNwZW5jZXIxNSIsImEiOiJjajE2b2hhN2owMzl2MzRvNjhpdDM5bzk3In0.wr4EEzRfvpGTw6C9ltRZsw'
}).addTo(mymap);

$.getJSON('/static/geo_data/zip.json', function(data) {
    L.geoJSON(data).addTo(mymap);
});
