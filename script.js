var searchButton = document.querySelector("#search-button");
var searchInput = document.getElementById("city-input");
var currentCityDisplay = document.getElementById("current-city");
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

async function fetchWeatherData(city) {
    try{
        const key = "6ed102388c0f7d2090336e3ef5fc46dd";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`; 
        const weatherData = await fetch(`${url}`).then(response => response.json()); 
        console.log(weatherData);   
        let latitude = weatherData.coord.lat;
        let longitude = weatherData.coord.lon;
        console.log(latitude,longitude); // here we have the longitude and latitude values needed for the geoloacation api
        
        var units = 'metric';
        var lang = 'en';
        
        
        var forcastUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=${units}&lang=${lang}`;
        //two objects should be listed in console with weather data that will be extracted from
        var forcastWeatherData = await fetch(`${forcastUrl}`).then(response => response.json()); 
        
        console.log(forcastWeatherData);
        
    } catch(err) {                                                                   
        console.log(err);                                                              

    }
}

//Async method to fetch data from openweather Api,
//this allows the promise to be resolved first before executing my funtion,
//so that data is retrieved and I can catch errors in the retrieving process
//response.json is used to make readable object of javascript