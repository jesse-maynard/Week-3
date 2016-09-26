
var city;
var state;
var latitude;
var longitude;
var lrgTemp;
var icon;


function darkSky_Complete(result) {
    console.log(result.currently.summary);
    console.log(city);
    console.log(state);
    lrgTemp = Math.round((result.currently.temperature)) + "&deg";
    crntCond = (result.currently.summary);
    tempMin = Math.round((result.daily.data[0].temperatureMin)) + "&deg";
    rainChance = (result.daily.data[0].precipProbability);
    maxTemp = Math.round((result.daily.data[0].temperatureMax)) + "&deg";
    icon = result.currently.icon;

    weather_Complete(result);

}

function geocode_Complete(result) {

    latitude = result.results[0].geometry.location.lat;
    longitude = result.results[0].geometry.location.lng;
    city = result.results[0].formatted_address;

  //  state = result.results[0].address_components[3].long_name;
    console.log("The lat and long is " + latitude + ", " + longitude);

    var request = {
        url: "https://api.darksky.net/forecast/9706b1862a5387b6c7c27a25a25fab6a/" + latitude + "," + longitude,
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

$(function () {
    $("#lookUpZipCode").on("click", lookUpWeatherForZipCode_Click)
    $("#zipBox").focus();
});

//////////////////////////////////////////////////////

// Generate New Divs/////////////////////////////////






function weatherTemplate(data) {
    var weatherData = $("#tempDiv").html();

    switch(icon){
        case "clear-day":
        case "clear-night":
        case "rain":
        case "snow":
        case "sleet":
        case "wind":
        case "fog":
        case "cloudy":
        case "partly-cloudy-day":
        case "partly-cloudy-night":
            weatherData = weatherData.replace("@@imgurl@@", icon + ".png" );
            break;
        default:
            weatherData = weatherData.replace("@@imgurl@@", "http://weknowyourdreams.com/images/grey/grey-04.jpg");
            break;
        
    }

    weatherData = weatherData.replace("@@City@@", city);
    weatherData = weatherData.replace("@@lrgDegree@@", lrgTemp);
    weatherData = weatherData.replace("@@cond@@", crntCond);
    weatherData = weatherData.replace("@@minTemp@@", tempMin);
    weatherData = weatherData.replace("@@rain@@", rainChance + "%");
    weatherData = weatherData.replace("@@maxTemp@@", maxTemp);


    return weatherData;

}

function generateCard(result) {
    var html = weatherTemplate;
    $("#cards").append(html);
}
function weather_Complete(result) {
    console.log("It is currently " + result.timezone + ".");
    generateCard(result);


}