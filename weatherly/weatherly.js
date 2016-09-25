
var city;
var state;
var latitude;
var longitude;

function weatherTemplate(weatherInfo){
    var tempDiv = $("#tempDiv").html();

    tempDiv= tempDiv.replace("@@location@@",weatherInfo.results[0].address_components[1].long_name);
    tempDiv= tempDiv.replace("@@weather@@",weatherInfo.currently.summary);
    tempDiv= tempDiv.replace("@@current@temp@@",weatherInfo.currently.summary.temperature);
    tempDiv= tempDiv.replace("@@high@temp@@",weatherInfo.hourly[12].data[5]);
    tempDiv= tempDiv.replace("@@average@temp@@",weatherInfo.hourly[30].data[5]);
    tempDiv= tempDiv.replace("@@low@temp@@",weatherInfo.hourly[44].data[5]);


    return tempDiv;

}
function generateCard(tempDiv){
    var html = weatherTemplate(tempDiv);
    $("#cards").append(html);
}

function darkSky_Complete(result){
console.log(result.currently.summary);
console.log(city);
console.log(state);
}

function darkSky_Success(result) {
    geocode_Complete(result);
    darkSky_Complete(result);
    weatherTemplate(weatherInfo);

}
 
function geocode_Complete(result){
            latitude = result.results["0"].geometry.location.lat;
            longitude = result.results["0"].geometry.location.lng;
            city = result.results[0].address_components[1].long_name;
            state= result.results[0].address_components[3].long_name;
            console.log("The lat and long is " + latitude + ", " + longitude);

// Call Darksky/////////////////////////////////////////

            var request = {
            url:"https://api.darksky.net/forecast/9706b1862a5387b6c7c27a25a25fab6a/" + latitude + "," + longitude,
            dataType: "jsonp",
            success: darkSky_Success 
        };

        $.ajax(request);
        }

 //////////////////////////////////////////////////////

function lookupLatLong(city, state, zipBox) {
            
            var address = "";
            if (zipBox.length != 0) {
                address = zipBox.trim();
            } else if (city.length != 0 && state != 0) {
                address = city.trim() + ", " + state;
            } else {
                return;
            }

//Call Google API//////////////////////////////////////

           var googleUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" 
           + address + "&key=AIzaSyBS86_TTVq1GnhAnAvAORfqHYhvov4XR2g"; 
          
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
    $("#lookUpZipCode").on("click", lookUpWeatherForZipCode_Click, generateCard)
    $("#zipBox").focus();
});

//////////////////////////////////////////////////////

// Generate New Divs/////////////////////////////////
