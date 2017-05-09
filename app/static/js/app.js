// Creat map wrapper, we center point and zoom level
var map = L.map('map').setView([40.7328, -73.9259], 11);

// On first load, retrieve geoJSON file
// Display map
$.getJSON('/static/geo_data/borough_zip_geo.json', function(data) {
    // geoLayer.boroughLayer = L.geoJSON(data.borough);
    // geoLayer.zipLayer = L.geoJSON(data.zip);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1Ijoiam9obnNwZW5jZXIxNSIsImEiOiJjajE2b2hhN2owMzl2MzRvNjhpdDM5bzk3In0.wr4EEzRfvpGTw6C9ltRZsw'
    }).addTo(map);

function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}

accessToken= 'pk.eyJ1Ijoiam9obnNwZW5jZXIxNSIsImEiOiJjajE2b2hhN2owMzl2MzRvNjhpdDM5bzk3In0.wr4EEzRfvpGTw6C9ltRZsw'

// Begin: map and control for click to add waypoints
var control = L.Routing.control({
      waypoints: [],
      router: L.Routing.mapbox(accessToken, {
       urlParameters: {
         profile: 'mapbox.cycling'
       }
     })
  })

control.on('routeselected', function(e) {
    var route = e.route;
    var routeArray = new Array();
    // add all the intermediate lat lng points from the route to an array
    for (var i = 0; i < route.coordinates.length; i++) {
        routeArray.push([route.coordinates[i].lat,route.coordinates[i].lng]);
    }
    console.log(routeArray);
  });

map.on('click', function(e) {
  var container = L.DomUtil.create('div'),
      startBtn = createButton('Start', container),
      destBtn = createButton('End', container),
      removeBtn = createButton('Remove', container);

      L.popup()
      .setContent(container)
      .setLatLng(e.latlng)
      .openOn(map);

      L.DomEvent.on(startBtn, 'click', function() {
          control.spliceWaypoints(0, 1, e.latlng);
          map.closePopup();
      });

      L.DomEvent.on(destBtn, 'click', function() {
          control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
          map.closePopup();
      });

      L.DomEvent.on(removeBtn, 'click', function() {
          routeArray = new Array();
          control.setWaypoints(routeArray);
          map.closePopup();
      });

      control.addTo(map);

    });

// End: Map and control for click to add waypoints

// Begin: map and control for geocode route search control
var control1 = L.Routing.control({
        waypoints: [],
        routeWhileDragging: true,
        geocoder: L.Control.Geocoder.nominatim()
    })

    .on('routingerror', function(e) {

        try {
            map.getCenter();
        } catch (e) {
            map.fitBounds(L.latLngBounds(control1.getWaypoints().map(function(wp) { return wp.latLng; })));
        }
        handleError(e);
    })

    .on('routeselected', function(e) {
        var route = e.route;
        var routeArray = new Array();
        // add all the intermediate lat lng points from the route to an array
        for (var i = 0; i < route.coordinates.length; i++) {
            routeArray.push([route.coordinates[i].lat,route.coordinates[i].lng]);
        }
        console.log(routeArray);
      })

    .addTo(map);
  // End: map and control for geocode route search
});
