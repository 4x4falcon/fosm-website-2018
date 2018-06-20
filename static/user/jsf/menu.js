// menu.js

var edit_zoom = 14;

/*
 * Called to interpolate JavaScript variables in strings using a
 * similar syntax to rails I18n string interpolation - the only
 * difference is that [[foo]] is the placeholder syntax instead
 * of {{foo}} which allows the same string to be processed by both
 * rails and then later by javascript.
 */

function i18n(string, keys) {
  string = i18n_strings[string] || string
  for (var key in keys) {
    var re_key = '\\[\\[' + key + '\\]\\]';
    var re = new RegExp(re_key, "g");
    string = string.replace(re, keys[key]);
  }
  return string;
}



/*
i18n strings
*/

i18n_strings = new Array();
i18n_strings['javascripts.site.edit_disabled_tooltip'] = 'Zoom in to edit the map';
i18n_strings['javascripts.site.history_disabled_tooltip'] = 'Zoom in to view edits for this area';
i18n_strings['javascripts.site.edit_zoom_alert'] = 'You must zoom in to edit the map';
i18n_strings['javascripts.site.edit_tooltip_josm'] = 'Edit the map in Josm or Merkaartor';
i18n_strings['javascripts.site.edit_tooltip_potlatch'] = 'Edit the map in Potlatch 2';
i18n_strings['javascripts.site.history_zoom_alert'] = 'You must zoom in to view edits for this area';
i18n_strings['javascripts.site.history_tooltip'] = 'View edits for this area';
//i18n_strings['javascripts.site._tooltip'] = 'View  for this area';
i18n_strings['javascripts.site.fosm_changeset_tooltip'] = 'View fosm.org changesets for this area';
i18n_strings['javascripts.site.osm_changeset_tooltip'] = 'View osm changesets for this area';
i18n_strings['javascripts.site.about_tooltip'] = 'About this server';
i18n_strings['javascripts.site.search_nominatim_tooltip'] = 'Search in nominatim for locations, addresses, etc';

i18n_strings['javascripts.map.overlays.maplint'] = 'Maplint';
i18n_strings['javascripts.map.base.noname'] = 'NoName';
i18n_strings['javascripts.map.base.cycle_map'] = 'Cycle Map';
i18n_strings['javascripts.map.base.mapnik'] = 'Mapnik';
i18n_strings['javascripts.map.base.osmarender'] = 'Osmarender';



/*
 *	
 *	modify the menu links
 */

function updateLinks()
 {
	var zoom = view.getZoom();

//  alert ('zoom = ' + zoom);

	node = $("#edit_in_josm");                        // editanchor
	if (node)
	 {

//  alert ('edit_in_josm');

		if (zoom >= edit_zoom)
		 {

			node.attr({
				"href" : 'javascript:void(0)',
				"onclick" : 'remoteEditHandler();',
				"title" : i18n("javascripts.site.edit_tooltip_josm"),
				"target" : ""
			});
		 }
		else
		 {
			node.attr({
				"href" : 'javascript:alert(i18n("javascripts.site.edit_zoom_alert"));',
				"onclick" : '',
				"title" : i18n("javascripts.site.edit_disabled_tooltip"),
				"target" : ""
			});
		 }
	 }
 }


/* get the map extent in degrees (WGS84) */

function getMapExtent ()
 {
	var extent = map.getView().calculateExtent(map.getSize());
	return ol.proj.transformExtent(extent, 'EPSG:3857', 'EPSG:4326');
 }


/* remote edit handler with loaded call back */
var loaded = false;


function isLoaded (responseText, textStatus, XMLHttpRequest)
 {
	loaded = false;
	if (textStatus != "error")
	 {
		loaded = true;
	 }
 }


function remoteEditHandler()
 {
  var bounds = getMapExtent();
  var zoom = view.getZoom();
  var left = bounds[0] - 0.0001;
  var top = bounds[3] + 0.0001;
  var right = bounds[2] + 0.0001;
  var bottom = bounds[1] - 0.0001;

  if (zoom < edit_zoom)
   {
//    alert ('Zoom in to edit');
    return;
   }
  
// this is for a div

  $('#linkloader').load("http://127.0.0.1:8111/load_and_zoom?left=" + left + "&top=" + top + "&right=" + right + "&bottom=" + bottom, isLoaded);

  setTimeout(function ()
   {
    if (!loaded) alert("Editing failed - make sure JOSM or Merkaartor is loaded and the remote control option is enabled");
   }, 1000);

  return false;
 }

