// search.js


/*
 * display search div when search menu item clicked
 */


function displaySearch()
 {
//	console.log ("Clicked search menu");

	$("#search").css("visibility","visible");
 }



function doSearch()
 {

	console.log ("searching");

	$("#search_loader").css("visibility","visible");

/*
 *	remove wait image even if we have not returned from nominatim
 */

	setTimeout(function()
	 {
//		console.log("done");
		$("#search_loader").css("visibility","hidden");
	 }, 10000);


	$("#search_message").css("visibility","hidden");
	$("#search_results").css("visibility","hidden");


	var message = 'No Results Found';

	var results = "";

	var inp = $("#searchbox").val();

	$.getJSON('http://nominatim.freestreetmap.com/search.php?format=json&limit=5&q=' + inp, function(data)
	 {

//		console.log("searching for " + inp);

		var items = [];

		$.each(data, function(key, val)
		 {
			bb = val.boundingbox;
			items.push("<li><a href='#' onclick='chooseAddress(" + bb[0] + ", " + bb[2] + ", " + bb[1] + ", " + bb[3]  + ", \"" + val.osm_type + "\");return false;'>" + val.display_name + '</a></li>');
		 });

/*
 *
 *	bb[0] = bottom
 *	bb[1] = top
 *	bb[2] = left
 *	bb[3] = right
 *
 */


		$('#search_results').empty();
		if (items.length != 0)
		 {
			results += "<p>";
			results += items.join('');
			results += "</p>";

//			console.log("results = " + results);

			$("#search_results").html(results);
			$("#search_results").css("visibility","visible");

			message = 'Results from <a href="http://nominatim.freestreetmap.com" target="_blank">Nominatim</a>';
		 }

//		console.log ("message = " + message);

		$("#search_message").html(message);
		$("#search_message").css("visibility","visible");

	 });

 }


/*
 *  zoom to selected address
 */



function chooseAddress(bottom, left, top, right, osm_type)
 {

	console.log("bottom = " + bottom + " left = " + left + " top = " + top + " right = " + right);

	var c = ol.proj.fromLonLat([left + ((right - left)/2), bottom + ((top - bottom)/2)]);

	view.setCenter(c);

	if (osm_type == "node")
	 {
			view.setZoom(15);
	 }
	else
	 {
			view.setZoom(10);
	 }

 }
