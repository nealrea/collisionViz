// global, for storing geo JSON layers and current state
var geoLayer = {},
    bikeLayer = {};

// store data from the server here
var globalBorough = {},
    globalBikes = {};


// retrieve borough totals
$.ajax({
   'type': 'GET',
   'url': '/borough_zip_totals'
}).done(function(data) {
    console.log(data);
    globalBorough = data;
    // add borough hover listeners
    addBoroughListeners();

}).fail(function() {
    console.log('nope');
});

// retrieve bike totals
$.ajax({
   'type': 'GET',
   'url': '/bike_intersections'
}).done(function(data) {
    console.log(data);
    globalBikes = data;
}).fail(function() {
    console.log('nope');
});


// When user zooms, update the geoJSON layer
map.on('zoomend', function() {
    var currentZoom = previousZoom = map.getZoom(),
        i;
    if (currentZoom <= 11 && geoLayer.currentName !== 'borough') {
        $('#data').hide();
        map.removeLayer(geoLayer.currentLayer);
        geoLayer.currentLayer = geoLayer.boroughLayer;
        geoLayer.currentLayer.addTo(map);
        geoLayer.currentName = 'borough';
        // add attribute to each boroughs html element
        geoLayer.boroughLayer.eachLayer(function(layer) {
            $(layer._path).attr('data-borough', layer.feature.properties.borough)
                .addClass('borough');
        });
        removeZipListeners();
        removeBoroughListeners();
        addBoroughListeners();
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
        removeBoroughListeners();
        removeZipListeners();
        addZipListeners();
    } else if (currentZoom >= 14) {
        $('#data').hide();
        map.removeLayer(geoLayer.currentLayer);
        geoLayer.currentLayer = geoLayer.zipLayer;
        geoLayer.currentName = 'None';
        removeBoroughListeners();
        removeZipListeners();

        for (i = 0; i < globalBikes.length; i++) {
            // L.circle([globalBikes[i][0], globalBikes[i][1]], {radius: 10}).addTo(map);
        }

    }
});


geoLayer.currentLayer = geoLayer.boroughLayer;
geoLayer.currentLayer.addTo(map);
geoLayer.currentName = 'borough';

// add attribute to each boroughs html element
geoLayer.boroughLayer.eachLayer(function(layer) {
    $(layer._path).attr('data-borough', layer.feature.properties.borough)
        .addClass('borough');
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
        showBoroughTotals(borough, globalBorough.borough[borough].toString());
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
    //     showBoroughTotals(borough, globalBorough.borough[borough].toString());
    // });
}

function removeBoroughListeners() {
    $('.borough').off('mouseenter mouseleave');
}

function addZipListeners() {
    $('.zipCode').mouseenter(function() {
        var zipCode = $(this).attr('data-zipCode');
        showBoroughTotals(zipCode, globalBorough.zipCode[zipCode].toString());
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
    //     showBoroughTotals(zipCode, globalBorough.zipCode[zipCode].toString());
    // });
}

function removeZipListeners() {
    $('.zipCode').off('mouseenter mouseleave');
}
