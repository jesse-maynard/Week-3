function darkSky_Complete(result){
console.log(result.currently.summary);
}

 
function geocode_Complete(result){
            var latitude = result.results["0"].geometry.location.lat;
            var longitude = result.results["0"].geometry.location.lng;
            console.log("The lat and long is " + latitude + ", " + longitude);

// Call Darksky/////////////////////////////////////////
            var request = {
            url:"https://api.darksky.net/forecast/9706b1862a5387b6c7c27a25a25fab6a/" + latitude + "," + longitude,
            dataType: "jsonp",
            success: darkSky_Complete
        };

        $.ajax(request);
        }
 //////////////////////////////////////////////////////
 
function lookupLatLong(city, state, zipBox) {
            
            var address = "";
            if (zipBox.length != 0) {
                address = zipBox.trim();
            }
            else if (city.length != 0 && state != 0) {
                address = city.trim() + ", " + state;
            }
            else {
                return;
            }
//Call Google API///////////////////////////////////////
           var googleUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" 
           + address + "&key=AIzaSyDJ4y5cqy80e_r8gwYVbivdn8n42LUexOA"; 
           
        var request = {
            url: googleUrl,
            success: geocode_Complete
        };

      $.ajax(request);
      
}
 
// Event Handler///////////////////////////////////////

function lookUpWeatherForZipCode_Click() {
    var zcode = $("#zipBox").val();
    lookupLatLong("", "", zcode);
}

//Document Ready///////////////////////////////////////

$(function(){
    $("#lookUpZipCode").on("click", lookUpWeatherForZipCode_Click)
});

//////////////////////////////////////////////////////