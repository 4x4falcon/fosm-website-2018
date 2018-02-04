//display_functions.js

var decimals = 10000;	// number of decimal places to work with for display
			// 2 = 100, 3 = 1000, 4 = 10000, etc



/* put functions to be performed on setDisplay call here */

function setDisplay()
  {
   setMapHeight();
   setMapWidth();
  }

/* set the height of the map div, takes into account height of cssmenu div */

function setMapHeight()
  {
   var iH = window.innerHeight - document.getElementById("cssmenu").offsetHeight;

//   document.getElementById("map").style.height = iH+"px";
   $('#map').height(iH);

	console.log ("height = " + iH);

  }

/* set the width of the map div, not used as at 3 May 2013 */

function setMapWidth()
  {
  }


/* get the hash */

function getHash()
 {
	var hashValue = location.hash;
	hashValue = hashValue.replace(/^#map\//, '');
	return hashValue;
 }

/*
 * set the hash from lat lon with or without marker
 */

function setHash(y, x, marker)
 {
	console.log ("lat = " + y + " lon = " + x);
	var zoom = view.getZoom();
	var hash = "#map/" + zoom + "/" + Math.round(parseFloat(y, 10) * decimals) / decimals + "/" + Math.round(parseFloat(x, 10) * decimals) / decimals;
	if (marker)
	 {
		hash += "/M";
	 }
	location.hash = hash;
 }

/* update the hash */

function updateHash()
 {

	console.log ("updateHash start");

	var zoom = view.getZoom();
	var center = ol.proj.transform(view.getCenter(), 'EPSG:3857',  'EPSG:4326');

//	var lat = center[1];
	var lon = center[0];

	if (lon > 180)
	 {
		lon = lon - 360;
	 }

	if (lon < -180)
	 {
		lon = lon + 360;
	 }

	var hash = "#map/" + zoom + "/" + Math.round(parseFloat(center[1], 10) * decimals) / decimals + "/" + Math.round(parseFloat(lon, 10) * decimals) / decimals;

	location.hash = hash;

	console.log ("updateHash end");

 }


/* actions on end of map movement including zoom */


function onMoveEnd(evt)
 {
	updateHash();
	updateLinks();
 }


/* mark a tile as dirty */


/* x tile from long */
function long2tile(lon,zoom) { return (Math.floor((lon+180)/360*Math.pow(2,zoom))); }

/* y tile from lat */
function lat2tile(lat,zoom)  { return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom))); }


var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}


function markDirty(lat, lon)
 {
	var zoom = view.getZoom();
	var x = long2tile(lon, zoom);
	var y = lat2tile(lat, zoom);

	var url = "http://map.fosm.org/default/" + zoom + "/" + x + "/" + y + ".png/dirty";

	var aClient = new HttpClient();
	aClient.get(url, function(response) {
		alert(response);
		});
 }


function showWhatsHere(lat, lon)
 {

	$('whats_here-loader').css('visibility','visible');

//	var url = '/whatshere/index.php?lat=' + lat + '&lon=' + lon;
	var url = 'http://freestreetmap.org/whatshere/index.php?lat=' + lat + '&lon=' + lon;

	$('#whats_here-content').load(url);


 }


