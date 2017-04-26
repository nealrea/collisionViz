// Creat map wrapper, we center point and zoom level
var map = L.map('map').setView([40.7328, -73.9059], 10);

// global, for storing geo JSON layers and current state
var geoLayer = {};

// store data from the server here
var globalData = {};

// On first load, retrieve geoJSON file
// Display map
$.getJSON('/static/geo_data/borough_zip_geo.json', function(data) {
    geoLayer.boroughLayer = L.geoJSON(data.borough);
    geoLayer.zipLayer = L.geoJSON(data.zip);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1Ijoiam9obnNwZW5jZXIxNSIsImEiOiJjajE2b2hhN2owMzl2MzRvNjhpdDM5bzk3In0.wr4EEzRfvpGTw6C9ltRZsw'
    }).addTo(map);
    geoLayer.currentLayer = geoLayer.boroughLayer;
    geoLayer.currentLayer.addTo(map);
    geoLayer.currentName = 'borough';

    // add attribute to each boroughs html element
    geoLayer.boroughLayer.eachLayer(function(layer) {
        $(layer._path).attr('data-borough', layer.feature.properties.borough)
            .addClass('borough');
    });

});

// retrieve borough totals
$.ajax({
   'type': 'GET',
   'url': '/totals'
}).done(function(data) {
    console.log(data);
    globalData = data;
    // add borough hover listeners
    addBoroughListeners();

}).fail(function() {
    console.log('nope');
});


// When user zooms, update the geoJSON layer
map.on('zoomend', function() {
    var currentZoom = previousZoom = map.getZoom();
    if (currentZoom <= 11 && geoLayer.currentName !== 'borough') {
        $('#data').hide();
        map.removeLayer(geoLayer.currentLayer);
        geoLayer.currentLayer = geoLayer.boroughLayer;
        geoLayer.currentLayer.addTo(map);
        geoLayer.currentName = 'borough';
        removeZipListeners();
    } else if (currentZoom >= 12 && currentZoom <= 13 && geoLayer.currentName !== 'zip') {
        $('#data').hide();
        map.removeLayer(geoLayer.currentLayer);
        geoLayer.currentLayer = geoLayer.zipLayer;
        geoLayer.currentLayer.addTo(map);
        geoLayer.currentName = 'zip';
        geoLayer.zipLayer.eachLayer(function(layer) {
            $(layer._path).attr('data-zipCode', layer.feature.properties.postalCode)
                .addClass('zipCode');
        });
        removeZipListeners();
        addZipListeners();
    } else if (currentZoom >= 14) {
        $('#data').hide();
        map.removeLayer(geoLayer.currentLayer);
        geoLayer.currentLayer = geoLayer.zipLayer;
        geoLayer.currentName = 'None';
        removeBoroughListeners();
        removeZipListeners();
    }
});


// utitility functions
function showBoroughTotals(borough_name, borough_total) {
    $('#data').show().html(
        $('<div>').append(
            $('<p class="data-borough">').text(borough_name),
            $('<p class="data-title">')
                .text('Total Accidents:  ')
                .append(borough_total)
        )
    );
}

function addBoroughListeners() {
    $('.borough').mouseenter(function() {
        var borough = $(this).attr('data-borough');
        showBoroughTotals(borough, globalData.borough[borough].toString());
    });

    $('.borough').mouseleave(function() {
        $('#data').hide();
    });

    // // add borough click listeners
    // $('.borough').click(function() {
    //     removeBoroughListeners();
    //     var borough = $(this).attr('data-borough');
    //     $('.borough').css({
    //         'fill': 'rgb(51, 136, 255)',
    //         'fill-opacity': 0.2
    //     })
    //     $(this).css({
    //         'fill': 'red',
    //         'fill-opacity': 0.5
    //     })
    //     showBoroughTotals(borough, globalData.borough[borough].toString());
    // });
}

function removeBoroughListeners() {
    $('.borough').off('mouseenter mouseleave');
}

function addZipListeners() {
    $('.zipCode').mouseenter(function() {
        var zipCode = $(this).attr('data-zipCode');
        showBoroughTotals(zipCode, globalData.zipCode[zipCode].toString());
    });

    $('.zipCode').mouseleave(function() {
        $('#data').hide();
    });

    // $('.zipCode').click(function() {
    //     removeZipListeners();
    //     var zipCode = $(this).attr('data-zipCode');
    //     $('.zipCode').css({
    //         'fill': 'rgb(51, 136, 255)',
    //         'fill-opacity': 0.2
    //     })
    //     $(this).css({
    //         'fill': 'red',
    //         'fill-opacity': 0.5
    //     })
    //     showBoroughTotals(zipCode, globalData.zipCode[zipCode].toString());
    // });
}

function removeZipListeners() {
    $('.zipCode').off('mouseenter mouseleave');
}
