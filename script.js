var  setLocation = ""
var latitude = "";
var longitude = "";
var dateDisplay = moment(new Date()).format("DD/MM/YYYY");
document.getElementById("date").innerHTML = dateDisplay;
var cityName = ""
var date = document.getElementById('date')
var fiveDayArray = []
var date24hourtime = moment().format('YYYY-MM-DD ' + 'HH:00:00');
var forecastboxes = Array.from(document.querySelectorAll(".forecast"));
document.getElementById("searchBTN").addEventListener('click', changeCity)
var btnName = ""
var count = 1
var arrayKey = "";
var locationArray = [];
navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
checkLocalStorage ()

//Change city function takes user input and changes setLocation variable to q=city format with city = user input
function changeCity(event){
    event.preventDefault();
    setLocation = "q="+document.querySelector('#API-search').value
    fetch('https://api.openweathermap.org/data/2.5/weather?'+setLocation+'&units=metric&appid=642a6ac8e3b17623bb06ef71f7b34ae8')
    .then(function (response){
        return response.json();})
    .then(function (data) {
        cityName = data.name;
        setLocation = "lat="+data.coord.lat+"&lon="+data.coord.lon
        fetchFunction();
        forecastFunction()
        createBtnfunction();})
}


function successCallback(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    setLocation = "lat="+latitude+"&lon="+longitude
    fetchFunction()
    forecastFunction()
    
}

function errorCallback(error){
    console.log(error)
    //promp user  to enter current city, then populate main display
}

//retrieve Users location

//q=city is the API syntax for searching a city set q=city as setLocation in search bar
function fetchFunction() {
//first fetch function, cycles througuh the forcast data, mataches the date and time to then dt_text then populates the mainDisplay
    fetch('https://api.openweathermap.org/data/2.5/weather?'+setLocation+'&units=metric&appid=642a6ac8e3b17623bb06ef71f7b34ae8')
    .then(function (response){
        return response.json();})
    .then(function (data) {
        setLocation = "lat="+data.coord.lat+"&lon="+data.coord.lon
        fiveDayArray = data.list
        document.getElementById("city").innerHTML = data.name+" ";
        //             id="mainTemp"
        cityName = data.name
        document.getElementById("mainTemp").innerHTML = data.main.temp
        //             id="mainWind"
        document.getElementById("mainWind").innerHTML = data.wind.speed
        //             id="mainHumidity"
        document.getElementById("mainHumidity").innerHTML = data.main.humidity
        checkStorage = JSON.parse(localStorage.getItem('location'));
        if (checkStorage === null){
        createBtnfunction()}
        //uv not located in the ist called by this API, run another fetch function to populate the UV indiex
        return fetch('https://api.openweathermap.org/data/2.5/onecall?'+setLocation+'&exclude=minutely,hourly&appid=642a6ac8e3b17623bb06ef71f7b34ae8&units=metric');})
        .then(function (response){
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response);
            }
        })
        .then (function (data) {
            document.getElementById("mainUV").innerHTML = data.current.uvi
        })
        
    .catch (error => console.log(error))};
        

//use forecastboxes variable to manipulate the forecast boxes
function forecastFunction() {
//     //'https://api.openweathermap.org/data/2.5/forecast?'+setLocation+'&units=metric&appid=642a6ac8e3b17623bb06ef71f7b34ae8'
    fetch('https://api.openweathermap.org/data/2.5/onecall?'+setLocation+'&units=metric&exclude=current,minutely,hourly&appid=642a6ac8e3b17623bb06ef71f7b34ae8')
    .then(function (response){
        return response.json();
    })
    .then(function (data) {
        //sets the dates of each forecast box
        document.querySelector("#forecast1 .forecastDate").innerHTML = new moment().add(1, "day").format("DD/MM/YYYY")
        document.querySelector("#forecast2 .forecastDate").innerHTML = new moment().add(2, "day").format("DD/MM/YYYY")
        document.querySelector("#forecast3 .forecastDate").innerHTML = new moment().add(3, "day").format("DD/MM/YYYY")
        document.querySelector("#forecast4 .forecastDate").innerHTML = new moment().add(4, "day").format("DD/MM/YYYY")
        document.querySelector("#forecast5 .forecastDate").innerHTML = new moment().add(5, "day").format("DD/MM/YYYY")
        //creat a for loop that cycles through each forcast box and populates the data
        var iconCode = ""
        var temp = ""
        var wind = ""
        var humidity = ""
        var iconURL = ""
        var forecastID = ""
        for (let i = 0; i < forecastboxes.length; i++) {
            iconCode = data.daily[i].weather[0].icon
            temp = "Temp: " + data.daily[i].temp.day + "°C"
            wind = "Wind: " + data.daily[i].wind_speed + "m/s"
            humidity = "Humidity: " + data.daily[i].humidity + "%"
            iconURL = "http://openweathermap.org/img/wn/"+iconCode+"@2x.png"
            forecastID = "#"+forecastboxes[i].id;
            //needs to loop through one call set iconCoe and iconURL then change the element in the DOM
            document.querySelector(forecastID +" .forcastEmoji").setAttribute("src", iconURL)
            document.querySelector(forecastID +" .forecastTemp").innerHTML = temp
            document.querySelector(forecastID +" .forecastWind").innerHTML = wind
            document.querySelector(forecastID +" .forecastHumdity").innerHTML = humidity
        }
    })}

    //needs to run when search button is pressed
    function createBtnfunction(){
        debugger
        console.log('hello')
        buttonDisplay = document.querySelector(".verticalBtns");
        var createBtn = document.createElement("button");
        var idname = "btn"
        createBtn.id = idname + count;
        arrayKey=createBtn.id;
        locationArray.push({[arrayKey]: setLocation, cityName})
        localStorage.setItem('location', JSON.stringify(locationArray))
        count = count+1        
        createBtn.setAttribute('type', 'submit');
        createBtn.setAttribute('class', 'btn');
        console.log(btnName)
        createBtn.textContent = cityName;
        console.log(cityName)
        buttonDisplay.appendChild(createBtn)
        }
    
        //creat a function that checks local storage, then loops through the save array and creates buttons from the saved data
        //needs to run when page loads
        function checkLocalStorage (){
            var existingstorage = JSON.parse(localStorage.getItem('location'))
            if (existingstorage != null){
                locationArray = existingstorage
                idname = "btn" + count;
                for (let i = 0; i < locationArray.length; i++) {
                var populateBtns = locationArray[i];
                //var buttonLocation = populateBtns[idname];
                buttonDisplay = document.querySelector(".verticalBtns");
                var createBtn = document.createElement("button");
                createBtn.setAttribute('type', 'submit');
                createBtn.setAttribute('class', 'btn');
                createBtn.id = "btn"+count;
                count = count+1
                createBtn.textContent = populateBtns.cityName
                buttonDisplay.appendChild(createBtn)
                } 
        } 
    }
 
//add event listener to buttons saved
document.querySelectorAll('.btn').forEach(item => {
    item.addEventListener('click', event =>{
        setLocation = "q="+event.currentTarget.textContent;
        console.log(setLocation)
        fetch('https://api.openweathermap.org/data/2.5/weather?'+setLocation+'&units=metric&appid=642a6ac8e3b17623bb06ef71f7b34ae8')
        .then(function (response){
            return response.json();})
        .then(function (data) {
            cityName = data.name;
            setLocation = "lat="+data.coord.lat+"&lon="+data.coord.lon
            fetchFunction();
            forecastFunction()
    })
})
})