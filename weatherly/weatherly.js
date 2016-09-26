



function darkSky_Complete(result){
console.log(result.currently.summary);
console.log(city);
console.log(state);
generateCard(result);
}

 
function geocode_Complete(result){

            latitude = result.results[0].geometry.location.lat;
            longitude = result.results[0].geometry.location.lng;
            city = result.results[0].address_components[1].long_name;
      
            state= result.results[0].address_components[3].long_name;
            console.log("The lat and long is " + latitude + ", " + longitude);

            var request = {
            url:"https://api.darksky.net/forecast/9706b1862a5387b6c7c27a25a25fab6a/" + latitude + "," + longitude,
            dataType: "jsonp",
            success: darkSky_Complete
        };

        $.ajax(request);
        }
       

// Call Darksky/////////////////////////////////////////

     

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

// Trying something////////////////////////////////////
 
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


function weatherTemplate(data) {
    var weatherData = $("#tempDiv").html();

    weatherData = weatherData.replace("@@City@@", city);
  //  weatherData = weatherData.replace("@@date/time@@", data.time);
    weatherData = weatherData.replace("@@lrgDegree@@", data.lrgTemp);
    weatherData = weatherData.replace("@@cond@@", data.crntCond);
    weatherData = weatherData.replace("@@minTemp@@", data.tempMin);
    weatherData = weatherData.replace("@@rain@@", data.rainChance + "%");
    weatherData = weatherData.replace("@@maxTemp@@", data.maxTemp);
   // weatherData = weatherData.replace("@@Min@@", data.minText);
   // weatherData = weatherData.replace("@@rainChance@@", data.rainChancetext);
   // weatherData = weatherData.replace("@@Max@@", data.maxText);
   // weatherData = weatherData.replace("@@class@@", data.icon);
    return weatherData;

}

///////
function weather_Complete(result) {
    console.log("It is currently " + result.timezone + ".");

    var data = {
       // time: new Date(result.currently.time * 1000),
        lrgTemp: Math.round((result.currently.temperature)) + "&deg",
        crntCond: (result.currently.summary),
        tempMin: Math.round((result.daily.data[0].temperatureMin)) + "&deg",
        rainChance: (result.daily.data[0].precipProbability),
        maxTemp: Math.round ((result.daily.data[0].temperatureMax)) + "&deg",
        minText: ("Min"),
        rainChancetext: ("Rain Chance"),
        maxText: ("Max"),
        icon:(result.currently.icon)
    };
    //trying something else

    

function generateCard(result){
    var html = weatherTemplate(data);
    $("#cards").append(html);
}


var city;
var state;
var latitude;
var longitude;
var morning;
var noon;
var night;
/*
function weatherTemplate(result1, result2){
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
} */}