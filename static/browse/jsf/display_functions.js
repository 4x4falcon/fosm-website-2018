//display_functions.js

var fosm_url = 'http://api.freestreetmap.org/api/0.6/';

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
   var iH = window.innerHeight - document.getElementById("cssmenu").offsetHeight - 2;

//   document.getElementById("map").style.height = iH+"px";
   $('#browse-map').height(iH);
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
//	console.log ("lat = " + y + " lon = " + x);
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
	var zoom = view.getZoom();
	var center = ol.proj.transform(view.getCenter(), 'EPSG:3857',  'EPSG:4326');
	var hash = "#map/" + zoom + "/" + Math.round(parseFloat(center[1], 10) * decimals) / decimals + "/" + Math.round(parseFloat(center[0], 10) * decimals) / decimals;

	location.hash = hash;

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

	var url = "/default/" + zoom + "/" + x + "/" + y + ".png/dirty";

	var aClient = new HttpClient();
	aClient.get(url, function(response) {
		alert(response);
		});

 }


function ol3ZoomToExtent(cooBottomLeft, cooTopRight)
 {
	if ((cooBottomLeft == null || cooBottomLeft == undefined)) return;
	if ((cooTopRight == null || cooTopRight == undefined)) return;

	var myExtent = new ol.extent.boundingExtent([cooBottomLeft, cooTopRight]);
	view.fitExtent(myExtent, map.getSize());

//	console.log('bottomLeft = ' + cooBottomLeft[0]);

 }

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}


function getObject(type, id) {

	document.title = 'fosm - browse - ' + type + ' ' + id;

	lat = 0;		// -29.54109123403;
	lon = 140;		// 153.09057082589;
	zoom = 10;


	var title = '<p class="browse-heading">';
	title += capitalizeFirstLetter(type) + ": " + id;
	title += '</p>';

	var output = '';
	var output2 = '';


	if (type == 'changeset') {

		var xhttp2 = new XMLHttpRequest();
		xhttp2.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
// Action to be performed when the document is read;

//				console.log(this.status);


                                var text2 = this.responseText;

                                parser2 = new DOMParser();
				xmlDoc2 = parser2.parseFromString(text2,"text/xml");

//						console.log(text2);

				min_lat = parseFloat(xmlDoc2.getElementsByTagName(type)[0].getAttribute("min_lat"));
				max_lat = parseFloat(xmlDoc2.getElementsByTagName(type)[0].getAttribute("max_lat"));
				min_lon = parseFloat(xmlDoc2.getElementsByTagName(type)[0].getAttribute("min_lon"));
				max_lon = parseFloat(xmlDoc2.getElementsByTagName(type)[0].getAttribute("max_lon"));

				output += "<p>";
				output += "</p>";

				output += "<p>";
				output += "Bounding Box: ";
				output += "Top: ";
				output += max_lat;
				output += '<br />';
				output += "Bottom: ";
				output += min_lat;
				output += '<br />';
				output += "Left: ";
				output += min_lon;
				output += '<br />';
				output += "Right: ";
				output += max_lon;
				output += "</p>";

				output += "<p>";
				output += "Created by: ";
				output += '<a href="/user/' + xmlDoc2.getElementsByTagName(type)[0].getAttribute("user");
				output += '/">'  + xmlDoc2.getElementsByTagName(type)[0].getAttribute("user") + '</a>';
				output += "</p>";

				output += "<p>";
				output += "Opened at: ";
				output += xmlDoc2.getElementsByTagName(type)[0].getAttribute("created_at");
				output += "</p>";
				output += "<p>";
				output += "Closed at: ";
				output += xmlDoc2.getElementsByTagName(type)[0].getAttribute("closed_at");
				output += "</p>";

				if (xmlDoc2.getElementsByTagName("tag")[0]) {
       		                        output += "<p>Tags</p>";

                                        var tag = xmlDoc2.getElementsByTagName("tag");

       		                        for (var i = 0; i < tag.length; i++) {

                       		                output += tag[i].getAttribute("k") + ": " + tag[i].getAttribute("v");
                                       		output += "<br />";

                               		}
                                }
//						console.log (output2);

			}
			else {
			}
		}


		var url2 = fosm_url + type + '/' + id;
		xhttp2.open("GET", url2, true);
		xhttp2.send();
	}






	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		// Action to be performed when the document is read;


//			console.log(this.status);
			console.log(type);

			if (type == "node") {

//				console.log(type);
				output += title;

				var text = this.responseText;

//				console.log(text);


				parser = new DOMParser();
				xmlDoc = parser.parseFromString(text,"text/xml");

				output += "<p>";

				output += "Latitude: ";							// . $item['lat'];
				output += xmlDoc.getElementsByTagName(type)[0].getAttribute("lat");
				output += "<br />";
				output += "Longitude: ";						// . $item['lon'];
				output += xmlDoc.getElementsByTagName(type)[0].getAttribute("lon");

				output += "</p>";

				output += "<p>";
				output += "Version: ";// . $item['version'];
				output += xmlDoc.getElementsByTagName(type)[0].getAttribute("version");
				output += "</p>";
				output += "<p>";
				output += 'Changeset: <a href="/browse/changeset/' + xmlDoc.getElementsByTagName(type)[0].getAttribute("changeset") +  '" target="_blank">' + xmlDoc.getElementsByTagName(type)[0].getAttribute("changeset") + '</a>';
				output += "</p>";
				output += "<p>";
				output += "Last edited: ";// . $item['timestamp'];
				output += xmlDoc.getElementsByTagName(type)[0].getAttribute("timestamp");
				output += "</p>";
				output += "<p>";
				output += "Edited by: ";// . $item['user'];
				output += xmlDoc.getElementsByTagName(type)[0].getAttribute("user");
				output += "</p>";

				output += '<p><a href="' + fosm_url + type + '/' + id + '" target="_blank">Get XML</a></p>';
				output += '<p><a href="http://freestreetmap.org/browse/' + type + '/' + id + '/history/" target="_blank">Show History</a></p>';

				if (xmlDoc.getElementsByTagName("tag")[0]) {
					output += "<p>Tags</p>";

					var tag = xmlDoc.getElementsByTagName("tag");

					for (var i = 0; i < tag.length; i++) {

						output += tag[i].getAttribute("k") + ": " + tag[i].getAttribute("v");
						output += "<br />";

					}


				}


				$('#browse-data').html(output);

				lat = parseFloat(xmlDoc.getElementsByTagName(type)[0].getAttribute("lat"));
				lon = parseFloat(xmlDoc.getElementsByTagName(type)[0].getAttribute("lon"));
				zoom = 18;


			}	// if node

			if (type == "way") {

//				console.log(type);
				output += title;

				var text = this.responseText;

//				console.log(text);


				parser = new DOMParser();
				xmlDoc = parser.parseFromString(text,"text/xml");

				output += "<p>";
				output += "Version: ";
				output += xmlDoc.getElementsByTagName(type)[0].getAttribute("version");
				output += "</p>";
				output += "<p>";
				output += 'Changeset: <a href="/browse/changeset/' + xmlDoc.getElementsByTagName(type)[0].getAttribute("changeset");
				output += '" target="_blank">' + xmlDoc.getElementsByTagName(type)[0].getAttribute("changeset") + '</a>';
				output += "</p>";
				output += "<p>";
				output += "Last edited: ";
				output += xmlDoc.getElementsByTagName(type)[0].getAttribute("timestamp");
				output += "</p>";
				output += "<p>";
				output += "Edited by: ";
				output += xmlDoc.getElementsByTagName(type)[0].getAttribute("user");
				output += "</p>";

				output += '<p><a href="' + fosm_url + type + '/' + id + '" target="_blank">Get XML</a></p>';
				output += '<p><a href="http://freestreetmap.org/browse/' + type + '/' + id + '/history/" target="_blank">Show History</a></p>';



				if (xmlDoc.getElementsByTagName("tag")[0]) {
					output += "<p>Tags</p>";

					var tag = xmlDoc.getElementsByTagName("tag");

					for (var i = 0; i < tag.length; i++) {

						output += tag[i].getAttribute("k") + ": " + tag[i].getAttribute("v");
						output += "<br />";

					}
				}

				if (xmlDoc.getElementsByTagName("nd")[0]) {
					output += "<p>Nodes</p>";

					var nd = xmlDoc.getElementsByTagName("nd");

					for (var i = 0; i < nd.length; i++) {
						output += "id: " + '<a href="/browse/node/' + nd[i].getAttribute('ref') + '" target="_blank">' + nd[i].getAttribute('ref') + '</a><br />';
//						output += "id: " + nd[i].getAttribute("ref");
//						output += "<br />";

					}
				}


				$('#browse-data').html(output);


			}	// if way

			if (type == "relation") {

//				console.log(type);
				output += title;

				var text = this.responseText;

//				console.log(text);


				parser = new DOMParser();
				xmlDoc = parser.parseFromString(text,"text/xml");

				output += "<p>";
				output += "Version: ";
				output += xmlDoc.getElementsByTagName(type)[0].getAttribute("version");
				output += "</p>";
				output += "<p>";
				output += 'Changeset: <a href="/browse/changeset/' + xmlDoc.getElementsByTagName(type)[0].getAttribute("changeset");
				output += '" target="_blank">' + xmlDoc.getElementsByTagName(type)[0].getAttribute("changeset") + '</a>';
				output += "</p>";
				output += "<p>";
				output += "Last edited: ";
				output += xmlDoc.getElementsByTagName(type)[0].getAttribute("timestamp");
				output += "</p>";
				output += "<p>";
				output += "Edited by: ";
				output += xmlDoc.getElementsByTagName(type)[0].getAttribute("user");
				output += "</p>";

				output += '<p><a href="' + fosm_url + type + '/' + id + '" target="_blank">Get XML</a></p>';
				output += '<p><a href="http://freestreetmap.org/browse/' + type + '/' + id + '/history/" target="_blank">Show History</a></p>';

				if (xmlDoc.getElementsByTagName("tag")[0]) {
					output += "<p>Tags</p>";

					var tag = xmlDoc.getElementsByTagName("tag");

					for (var i = 0; i < tag.length; i++) {

						output += tag[i].getAttribute("k") + ": " + tag[i].getAttribute("v");
						output += "<br />";

					}
				}


				if (xmlDoc.getElementsByTagName("member")[0]) {
					output += "<p>Members</p>";

					var member = xmlDoc.getElementsByTagName("member");

					for (var i = 0; i < member.length; i++) {

						output += member[i].getAttribute("type") + ": ";
						output += member[i].getAttribute("ref") + " - ";
						output += member[i].getAttribute("role");


						output += "<br />";

					}
				}


				$('#browse-data').html(output);

			}	// if rel


			if (type == "changeset") {

//				console.log(type);

				var text = this.responseText;

//				console.log(text);



				parser = new DOMParser();
				xmlDoc = parser.parseFromString(text,"text/xml");

// created

                                if (xmlDoc.getElementsByTagName("create")[0]) {
                                        output += "<p>Created:</p>";

                                        var t = xmlDoc.getElementsByTagName("create");

                                        for (var i = 0; i < t.length; i++) {
						var u = t[i].getElementsByTagName("node");
						for (var k = 0; k < u.length; k++) {
							output += "Node: " + '<a href="/browse/node/' + u[k].getAttribute('id') + '" target="_blank">' + u[k].getAttribute('id') + '</a><br />';
						}
						var u = t[i].getElementsByTagName("way");
						for (var k = 0; k < u.length; k++) {
							output += "Way: " + '<a href="/browse/way/' + u[k].getAttribute('id') + '" target="_blank">' + u[k].getAttribute('id') + '</a><br />';
						}
						var u = t[i].getElementsByTagName("relation");
						for (var k = 0; k < u.length; k++) {
							output += "Relation: " + '<a href="/browse/relation/' + u[k].getAttribute('id') + '" target="_blank">' + u[k].getAttribute('id') + '</a><br />';
						}
                                        }
                                }


// modified

                                if (xmlDoc.getElementsByTagName("modified")[0]) {
                                        output += "<p>Modified:</p>";

                                        var t = xmlDoc.getElementsByTagName("modified");

                                        for (var i = 0; i < t.length; i++) {
						var u = t[i].getElementsByTagName("node");
						for (var k = 0; k < u.length; k++) {
							output += "Node: " + '<a href="/browse/node/' + u[k].getAttribute('id') + '" target="_blank">' + u[k].getAttribute('id') + '</a><br />';
						}
						var u = t[i].getElementsByTagName("way");
						for (var k = 0; k < u.length; k++) {
							output += "Way: " + '<a href="/browse/way/' + u[k].getAttribute('id') + '" target="_blank">' + u[k].getAttribute('id') + '</a><br />';
						}
						var u = t[i].getElementsByTagName("relation");
						for (var k = 0; k < u.length; k++) {
							output += "Relation: " + '<a href="/browse/relation/' + u[k].getAttribute('id') + '" target="_blank">' + u[k].getAttribute('id') + '</a><br />';
						}
                                        }
                                }


// deleted

                                if (xmlDoc.getElementsByTagName("deleted")[0]) {
                                        output += "<p>Deleted:</p>";

                                        var t = xmlDoc.getElementsByTagName("deleted");

                                        for (var i = 0; i < t.length; i++) {
						var u = t[i].getElementsByTagName("node");
						for (var k = 0; k < u.length; k++) {
							output += 'Node: <span class="delete">' + u[k].getAttribute('id') + "</span>";
							output += "<br />";
						}
						var u = t[i].getElementsByTagName("way");
						for (var k = 0; k < u.length; k++) {
							output += 'Way: <span class="delete">' + u[k].getAttribute('id') + "</span>";
							output += "<br />";
						}
						var u = t[i].getElementsByTagName("relation");
						for (var k = 0; k < u.length; k++) {
							output += 'Relation: <span class="delete">' + u[k].getAttribute('id') + "</span>";
							output += "<br />";
						}
                                        }
                                }


				$('#browse-data').html(title + output);
			}	// if changeset


		}
		else {
		}



	};


	var url = fosm_url + type + '/' + id + '/download';
	xhttp.open("GET", url, true);
	xhttp.send();



}
