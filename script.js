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