// Creat map wrapper, we center point and zoom level
var map = L.map('map').setView([40.7328, -73.9259], 11);

var COLLISION_RATE = 0.42415,
    HMM = 0.4241484102878279;

// route points
var ROUTE_POINTS = [],
    COLORS = ['rgb(255, 247, 0)', 'rgb(255, 211, 0)', 'rgb(255, 186, 0)', 'rgb(255, 125, 0)', 'rgb(255, 0, 0)'],
    NAMES = ['Yellow', 'YellowOrange', 'Orange', 'RedOrange', 'Red'];

// causes
var CAUSES = [],
    INTERSECTIONS = [];

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

accessToken = 'pk.eyJ1Ijoiam9obnNwZW5jZXIxNSIsImEiOiJjajE2b2hhN2owMzl2MzRvNjhpdDM5bzk3In0.wr4EEzRfvpGTw6C9ltRZsw'

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
    send_data(routeArray);
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
        send_data(routeArray);
        console.log(routeArray);
      })
    .addTo(map);
  // End: map and control for geocode route search
});

function send_data(data) {
    for (index in ROUTE_POINTS) {
        map.removeLayer(ROUTE_POINTS[index]);
    }
    // $('#loading-box').show().css('display', 'inline-block');
    $.ajax({
        'type': 'POST',
        'url': '/worst_intersections',
        'contentType': 'application/json',
        'dataType': 'json',
        'data': JSON.stringify(data)
   }).done(function(response) {
       $('.circle').off();
       $('#loading-box').hide();
        var index,
            points = response[0];

        radar(points, response[1])
        ROUTE_POINTS = []
        for (index in points) {
            point = L.circle(points[index][0], {radius: 30, className: 'circle'}).addTo(map);
            ROUTE_POINTS.push(point)

            point._path.setAttribute('data-rate', points[index][1])
            point._path.setAttribute('data-num', index)
            point._path.style.fill = COLORS[index]
            point._path.style.stroke = COLORS[index]
        }

        $('.legend').show();

        $('.circle').mouseenter(function(e) {
            $('#num').text(($(e.target).attr('data-num')));
            $('#num').css('color', 'black')
        });

        $('.circle').mouseleave(function(e) {
            $('#num').css('color', 'white')
        });
   });

   function radar(points, causes) {
       CAUSES.push([])
       for (var item in causes) {
           var cause = {};
           cause['axis'] = causes[item][0];
           cause['value'] = causes[item][1];
           CAUSES[CAUSES.length - 1].push(cause)
       }
       INTERSECTIONS.push([])
       for (var item in points) {
        //    INTERSECTIONS[0].push({'axis': item, 'value': COLLISION_RATE})
           var cause = {};
           cause['axis'] = item;
           cause['value'] = points[item][1];
           INTERSECTIONS[INTERSECTIONS.length - 1].push(cause)
       }

       var radarChartOptions = {
         w: width,
         h: height,
         margin: margin,
         maxValue: 0.5,
         levels: 5,
         roundStrokes: true,
         color: color,
         format: '.4f'
       };

       RadarChart(".intersections", INTERSECTIONS, radarChartOptions);
       radarChartOptions.format = ''
       RadarChart(".causes", CAUSES, radarChartOptions);
   }
}
