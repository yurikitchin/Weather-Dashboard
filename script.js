var  setLocation = ""
var latitude = "";
var longitude = "";
var dateDisplay = moment(new Date()).format("DD/MM/YYYY")
document.getElementById("date").innerHTML = dateDisplay
console.log(dateDisplay);
var cityName = ""
var date = document.getElementById('date')
var fiveDayArray = []
console.log(date)
var date24hourtime = moment().format('YYYY-MM-DD ' + 'HH:00:00');
console.log(moment().format('YYYY-MM-DD ' + 'HH:00:00'))

function successCallback(position) {
    console.log(position)
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    setLocation = "lat="+latitude+"&lon="+longitude
    console.log(setLocation)
    fetchFunction()
    //forecastFunction()
}

function errorCallback(error){
    console.log(error)
    //promp user  to enter current city, then populate main display
}

//retrieve Users location
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

//q=city is the API syntax for searching a city set q=city as setLocation in search bar
function fetchFunction() {
//first fetch function, cycles througuh the forcast data, mataches the date and time to then dt_text then populates the mainDisplay
    fetch('https://api.openweathermap.org/data/2.5/forecast?'+setLocation+'&units=metric&appid=642a6ac8e3b17623bb06ef71f7b34ae8')
    .then(function (response){
        return response.json();})
    .then(function (data) {
        // console.log(data)
        // console.log(data.list[0])
        // console.log(data.list[0].dt_txt)
        // console.log(data.list[0].main.temp)
        fiveDayArray = data.list
        document.getElementById("city").innerHTML = data.city.name+" ";
        for (let i = 0; i < fiveDayArray.length; i++) {
            forecastData = fiveDayArray[i];
            var ArraydateTime = forecastData.dt_txt;
            // console.log(ArraydateTime)
            // console.log(date24hourtime)
            if (ArraydateTime === date24hourtime) {
                console.log(forecastData)
                id="mainTemp"
                id="mainWind"
                id="mainHumidity"
                id="mainUV"
            }
            
            
        }
    })
    .catch (error => console.log(error))}
    
    //create variable name, then add city name and date to displayMain box


function forecastFunction() {
    fetch('https://api.openweathermap.org/data/2.5/onecall?'+setLocation+'&exclude=minutely,hourly&appid=642a6ac8e3b17623bb06ef71f7b34ae8&units=metric')
    .then(response => response.json())
    .then(data => console.log(data));
}