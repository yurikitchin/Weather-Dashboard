var  setLocation = ""
var latitude = "";
var longitude = "";
var dateDisplay = moment().format("L")
console.log(dateDisplay);

function successCallback(position) {
    console.log(position)
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    setLocation = "lat="+latitude+"&lon="+longitude
    console.log(setLocation)
    fetchFunction()
}

function errorCallback(error){
    console.log(error)
}

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

//q=city is the API syntax for searching a city set q=city as setLocation in search bar
function fetchFunction() {
    fetch('https://api.openweathermap.org/data/2.5/weather?'+setLocation+'&units=metric&appid=642a6ac8e3b17623bb06ef71f7b34ae8')
    .then(response => response.json())
    .then(data => console.log(data))
}