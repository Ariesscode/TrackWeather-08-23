var searchButton = document.querySelector("#search-button");
var searchInput = document.getElementById("city-input");

var currentDate = document.getElementById("current-date");
var currentTemp = document.getElementById("current-temp")
var currentWind = document.getElementById("current-wind");
var currentHumidity = document.getElementById("current-humidity");
var mondayForcast = document.getElementById("monday-forcast");
var weatherImg = document.getElementById("weather-img");



searchButton.addEventListener('click', () => {
    var cityDisplay = searchInput.value;
    if (cityDisplay) {
        fetchWeatherData(cityDisplay);
        
    }
});


//Async method to fetch data from openweather Api,
    //this allows the promise to be resolved first before executing my funtion,
    //so that data is retrieved and I can catch errors in the retrieving process
    //response.json is used to make readable object of javascript
async function fetchWeatherData(city) { 
    
    try{
        const key = "6ed102388c0f7d2090336e3ef5fc46dd";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`; 
        const weatherData = await fetch(`${url}`).then(response => response.json()); 
        console.log(weatherData);   
        let lat = weatherData.coord.lat;
        let lon = weatherData.coord.lon;
        console.log(lat,lon); // here we have the longitude and latitude values needed for the geoloacation api
      
        let units = "metric";

        const forcastKey = "6ed102388c0f7d2090336e3ef5fc46dd";
        const forcastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=${units}`;
        //two objects should be listed in console with weather data that will be extracted from
        //forcastWeatherData hold all the five day forcast
        var forcastWeatherData = await fetch(`${forcastUrl}`).then(response => response.json()); 
        console.log(forcastWeatherData);

        var currentcityDisplay = document.getElementById("current-city");
        currentcityDisplay.innerHTML = forcastWeatherData.city.name;
        currentHumidity.innerHTML += " " + forcastWeatherData.list[0].main.humidity + " %";
        currentWind.innerHTML += " " + forcastWeatherData.list[0].wind.speed + " MPH";
        currentTemp.innerHTML += " " + Math.round(forcastWeatherData.list[0].main.temp * 1.8 + 32) + "\u00B0" + "F";
        
    } catch(err) {                                                                   
        console.log(err);    
        
    }
    

}

