/*
This is the jump to validation and action code
*/

function jump_2()
 {

  var lat = document.forms["jumpto"]["lat"].value
  var lat_f = parseFloat(lat);
  if (lat == null || lat == "" || lat_f < -90 || lat_f > 90)
   {
    alert("You must enter a latitude between 90 and -90 deg !")
    return false;
   }

  

  var lon = document.forms["jumpto"]["lon"].value
  var lon_f = parseFloat(lon);
  if (lon == null || lon == '' || lon_f < -180 || lon_f > 180)
   {
    alert("You must enter a longitude between 180 and -180 deg !")
    return false;
   }

  return true;
 }

