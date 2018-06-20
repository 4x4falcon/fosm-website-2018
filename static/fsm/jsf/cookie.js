// cookie.js

//initial setting for lat, lon and zoom
//can be modified by setCookie or updateHash

var lat = 0.0;
var lon = 140.0;
var zoom = 1;
var marker=0;

// see if there is a hash

currentHash = getHash();

if (currentHash != '') {

	console.log("currenthash = " + currentHash);

	bits = currentHash.split("/");
	zoom = parseInt(bits[0], 10);
	lat = Math.round(parseFloat(bits[1], 10) * decimals) / decimals;
	lon = Math.round(parseFloat(bits[2], 10) * decimals) / decimals;

	if (typeof bits[3] !== 'undefined')
	 {
		marker = (bits[3] == 'M');
	 }

	console.log("zoom = " + zoom + " lat = " + lat + " lon = " + lon);
 }
else if (document.cookie)
 {
//	console.log ("document.cookie = " + document.cookie);

	var bits = document.cookie.split('=');

//	console.log ("bits[0] = " + bits[0]);
//	console.log ("bits[1] = " + bits[1]);

	bits = bits[1].split('|');

	zoom = parseInt(bits[0], 10);
	lat = Math.round(parseFloat(bits[1], 10) * decimals) / decimals;
	lon = Math.round(parseFloat(bits[2], 10) * decimals) / decimals;

//	console.log ("zoom = " + zoom);
//	console.log ("lat = " + lat);
//	console.log ("lon = " + lon);

	if (isNaN(zoom)) {
		zoom = 2;
	}

	if (isNaN(lat)) {
		lat = 0;
	}

	if (isNaN(lon)) {
		lon = 140;
	}

 }

if (lat > 90.0)
 {
	lat = 0.0;
	zoom = 1;
 }
if (lat < -90.0)
 {
	lat = 0.0;
	zoom = 1;
 }

if (lon > 180.0)
 {
	lon = 140.0;
	zoom = 1;
 }
if (lon < -180.0)
 {
	lon = 140.0;
	zoom = 1;
 }

if (zoom < 0) zoom = 0;
if (zoom > 19) zoom = 19;



function setCookie() {

	var exdays = 7;						// expire after 7 days

	var value = "FosmView=" + view.getZoom() + "|";
	var center = ol.proj.transform(view.getCenter(), 'EPSG:3857',  'EPSG:4326');
	value += Math.round(parseFloat(center[1], 10) * decimals) / decimals + "|" + Math.round(parseFloat(center[0], 10) * decimals) / decimals;

	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "; expires="+d.toUTCString();

//	console.log("cookie = " + value + expires + "; path=/");

	document.cookie = value + expires + "; path=/";

}

