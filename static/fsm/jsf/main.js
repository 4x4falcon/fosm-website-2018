// main.js


setDisplay();

//	console.log ("setDisplay");

// lat, lon and zoom are set in cookie.js

var view = new ol.View({
		center: ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857'),
		zoom: zoom,
		minZoom: 0,
		maxZoom: 18
		})

//	console.log ("create view");

var fosmSource = new ol.source.OSM ({
	        attributions: [
        	        new ol.Attribution({
                	        html: 'All maps and data &copy; <a href="http://fosm.org/">fosm.org</a>'}) 
	        ],

		url: 'http://map.fosm.org/default/{z}/{x}/{y}.png'
	});

//	console.log ("create fosm Source");

var nonameSource = new ol.source.OSM ({
		attribution: new ol.Attribution({
			        html: 'All maps &copy; <a href="http://fosm.org/">fosm.org</a>'}),
		url: 'http://map.fosm.org/noname/{z}/{x}/{y}.png'
	});

//	console.log ("create noname source");

var fosmTile = new ol.layer.Tile ({
		title: "Fosm",
		type: 'base',
		source: fosmSource,
		visible: true
		});

//	console.log ("create fosm layer");

var nonameTile = new ol.layer.Tile ({
		title: "Noname",
		source: nonameSource,
		visible: false,
		minZoomLevel: 14
		});

//	console.log ("create noname layer");

var overlayGroup = new ol.layer.Group({
		'title': 'Overlays',
		layers: [
			nonameTile
		]
	});

//	console.log ("create overlays");

var baseGroup = new ol.layer.Group({
                'title': 'Base Layers',
                layers: [
                        fosmTile
                ]
        });

//	console.log ("create base layers");

/**
 * Elements that make up the popup.
 */
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');


/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function() {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

//	console.log ("create onclick");

/**
 * Create an overlay to anchor the popup to the map.
 */
var overlay = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250
  }
}));

//	console.log ("create overlay for onclick");

/*
 * Create the main map
 */



var map = new ol.Map({
	layers: [
			baseGroup,
			overlayGroup,
		],
	overlays: [overlay],
	target: 'map',
	view: view
});


//	console.log ("creat main map");


/*
 * Create and add the marker if marker = true
 */

if (marker)
 {
	var iconFeature = new ol.Feature({
		geometry: new ol.geom.Point(ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857')),
	 });

	var iconStyle = new ol.style.Style({
		image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
			anchor: [0.5, 40],
			anchorXUnits: 'fraction',
			anchorYUnits: 'pixels',
			opacity: 0.75,
			src: '/images/marker-pin_40x40.png'
		}))
	});

	iconFeature.setStyle(iconStyle);

	var vectorSource = new ol.source.Vector({
		features: [iconFeature]
	});

	var vectorLayer = new ol.layer.Vector({
		source: vectorSource
	});

	map.addLayer(vectorLayer);

 }

map.on('moveend', onMoveEnd);


/**
 * Add a click handler to the map to render the popup.
 */
map.on('singleclick', function(evt) {
	if ($("#search").css("visibility") == "visible")
	 {
		$("#search").css("visibility","hidden");
		$("#search_loader").css("visibility","hidden");
		$("#search_message").css("visibility","hidden");
		$("#search_results").css("visibility","hidden");
	 }
	else
	 {
		var coordinate = evt.coordinate;
		var coord = ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326');
		var lat = coord[1];
		var lon = coord[0];
		var hdms = ol.coordinate.toStringXY(ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326'), 4);
		content.innerHTML = 	'<code>' + hdms + '</code><br/>' +
					'<a href="#" onClick="setHash('+lat+','+lon+',true);return false;">MarkerLink</a><br/>' +
					'<a href="#" onClick="markDirty('+lat+','+lon+');return false;">Mark tile to rerender</a>';

//					'<a href="#" onClick="_.box(&#39;whats_here&#39;);showWhatsHere('+lat+','+lon+');return false;"' + ">What's Here</a><br/>" +


		overlay.setPosition(coordinate);
	 }
});

// Create a LayerSwitcher instance and add it to the map

var layerSwitcher = new ol.control.LayerSwitcher();
map.addControl(layerSwitcher);


$('document').ready( function () {

});


