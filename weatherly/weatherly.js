

function darkSky_Complete(result){
console.log(result.currently.summary);
console.log(city);
console.log(state);
}

 
function geocode_Complete(result){
            latitude = result.results[0].geometry.location.lat;
            longitude = result.results[0].geometry.location.lng;
            city = result.results[0].address_components[1].long_name;
            state= result.results[0].address_components[3].long_name;
            morning = result.hourly.data[12].apparentTemperature;
            noon = result.hourly.data[30].apparentTemperature;
            night = result.hourly.data[44].apparentTemperature;
            console.log("The lat and long is " + latitude + ", " + longitude);

// Call Darksky/////////////////////////////////////////

            var request = {
            url:"https://api.darksky.net/forecast/9706b1862a5387b6c7c27a25a25fab6a/" + latitude + "," + longitude,
            dataType: "jsonp",
            success: generateCard
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
    $("#lookUpZipCode").on("click", lookUpWeatherForZipCode_Click)
    $("#zipBox").focus();
});

//////////////////////////////////////////////////////

// Generate New Divs/////////////////////////////////


var city;
var state;
var latitude;
var longitude;
var morning;
var noon;
var night;

function weatherTemplate(result){
    var tempDiv = $("#tempDiv").html();

    tempDiv= tempDiv.replace("@@location@@",city);
    tempDiv= tempDiv.replace("@@weather@@",result.currently.summary);
    tempDiv= tempDiv.replace("@@current@temp@@",result.currently.summary.temperature);
    tempDiv= tempDiv.replace("@@high@temp@@",morning);
    tempDiv= tempDiv.replace("@@average@temp@@",noon);
    tempDiv= tempDiv.replace("@@low@temp@@",night);


    return tempDiv;

}
function generateCard(result){
    var html = weatherTemplate(result);
    $("#cards").append(html);
}