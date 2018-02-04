// main.js

setDisplay();

getObject(type, id);


//console.log('min_lon = ' + min_lon + ' max_lon = ' + max_lon);
//console.log('min_lat = ' + min_lat + ' max_lat = ' + max_lat);


var view = new ol.View({
		center: ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857'),
		zoom: zoom,
		minZoom: 0,
		maxZoom: 18
		})

var fosmSource = new ol.source.OSM ({
			attribution: new ol.Attribution({
					        html: 'All maps &copy; <a href="http://fosm.org/">fosm.org</a>'}),
			url: 'http://map.fosm.org/default/{z}/{x}/{y}.png'
			});

var fosmTile = new ol.layer.Tile ({
		title: "Fosm",
		type: 'base',
		source: fosmSource,
		visible: true
		});


var baseGroup = new ol.layer.Group({
                'title': 'Base Layers',
                layers: [
                        fosmTile
                ]
        });




/*
 * Create the browse map
 */

var map = new ol.Map({
	layers: [
			baseGroup
		],
	target: 'browse-map',
	view: view
});

map.on('moveend', onMoveEnd);

$('document').ready( function () {

	var styles = new ol.style.Style({
		fill: new ol.style.Fill({
			color: 'rgba(255, 0, 0, 0.1)'
			}),
		stroke: new ol.style.Stroke({
			width: 3,
			color: 'rgba(255, 0, 0, 0.6)'
			}),
		});

	var nodeStyle = new ol.style.Style({
		image: new ol.style.Circle({
			fill: new ol.style.Fill({
				color: 'rgba(255, 0, 0, 0.1)'
				}),
			stroke: new ol.style.Stroke({
				width: 2,
				color: 'rgba(255, 0, 0, 0.8)'
				}),
			radius: 10
			}),
		});



	if (type == 'node')
	 {
		console.log("lat = " + lat + " lon = " + lon);

		var point = new ol.geom.Point([lon, lat]);

		point.applyTransform(ol.proj.getTransform('EPSG:4326', 'EPSG:3857'));

		var feature = new ol.Feature(point);

		var vectorSource = new ol.source.Vector();
		vectorSource.addFeature(feature);

// Create vector layer attached to the vector source.
		var vectorLayer = new ol.layer.Vector({
			source: vectorSource,
			style: nodeStyle
			});
	 }


	if ((type == 'way') || (type == 'relation'))
	 {
		var osmxmlFormat = new ol.format.OSMXML();

		var vectorSource = new ol.source.Vector({
                                format: osmxmlFormat,
//				url: '/cgi-bin/xy.cgi?url=http://api.fosm.org/api/0.6/' + type + '/' + id + '/full',
//				url: 'http://api.freestreetmap.org:8010/api/0.6/' + type + '/' + id + '/full',
//				url: 'http://api.freestreetmap.org/api/0.6/' + type + '/' + id + '/full',
				url: '/api/0.6/' + type + '/' + id + '/full',
                                projection: 'EPSG:3857'                 // or whatever the map's projection is
				});

//		console.log('type = ' + type + ' id = ' + id);

	 }

	if (type == 'changeset')

	 {
		var cooBottomLeft = ol.proj.transform([min_lon, min_lat], 'EPSG:4326', 'EPSG:3857');
		var cooTopRight = ol.proj.transform([max_lon, max_lat], 'EPSG:4326', 'EPSG:3857');

		ol3ZoomToExtent(cooBottomLeft, cooTopRight);

					// A ring must be closed, that is its last coordinate
					// should be the same as its first coordinate.

//		console.log('min_lon = ' + min_lon + ' max_lon = ' + max_lon);

		var ring = [
				[min_lon, min_lat], [min_lon, max_lat],
				[max_lon, max_lat], [max_lon, min_lat],
			  	[min_lon, min_lat]
		];

					// A polygon is an array of rings, the first ring is
					// the exterior ring, the others are the interior rings.
					// In this case there is one ring only.
		var polygon = new ol.geom.Polygon([ring]);

		polygon.applyTransform(ol.proj.getTransform('EPSG:4326', 'EPSG:3857'));

					// Create feature with polygon.
		var feature = new ol.Feature(polygon);

					// Create vector source and the feature to it.
		var vectorSource = new ol.source.Vector();
		vectorSource.addFeature(feature);

	 	}


	if (type != 'node')
	 {
// Create vector layer attached to the vector source.
		var vectorLayer = new ol.layer.Vector({
			source: vectorSource,
			style: styles
			});
	 }


// Add the vector layer to the map if it's created
	if (vectorLayer) {
		map.addLayer(vectorLayer);

		if (type != 'node') {
			var listenerKey = vectorSource.on('change', function(e) {
				if (vectorSource.getState() == 'ready') {
					map.getView().fitExtent(vectorLayer.getSource().getExtent(), map.getSize());
					ol.Observable.unByKey(listenerKey);
				}
			});
		}
		else {
			centerMap(lon, lat, 15);
		}
	}
});
