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
        const weatherData = await fetch(`${url}`).then(response => response.json()); //Async method to fetch data from openweather Api,
        console.log(weatherData);                                                    //this allows the promise to be resolved first before executing my funtion,
    } catch(err) {                                                                   //so that data is retrieved and I can catch errors in the retrieving process
        console.log(err);                                                             //response.json is used to parse the data into a readable javascript object 

    }
}

