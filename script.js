var searchButton = document.querySelector("#search-button");
var searchInput = document.getElementById("city-input");
var currentDate = document.getElementById("current-date");
var currentTemp = document.getElementById("current-temp")
var currentWind = document.getElementById("current-wind");
var currentHumidity = document.getElementById("current-humidity");
var mondayForcast = document.getElementById("monday-forcast");
var weatherImg = document.getElementById("weather-img");
var mDate = document.getElementById("m-date");
var mTemp = document.getElementById("m-temp");
var mHumidity = document.getElementById("m-humidity");
var mWind = document.getElementById("m-wind");
var tuesTemp = document.getElementById("tues-temp");
var tuesWind = document.getElementById("tues-wind");
var tuesHumidity = document.getElementById("tues-humidity");
var wedTemp = document.getElementById("wed-temp");
var wedWind = document.getElementById("wed-wind");
var wedHumidity = document.getElementById("wed-humidity");
var thursTemp = document.getElementById("thurs-temp");
var thursHumidity= document.getElementById("thurs-humidity");
var thursWind = document.getElementById("thurs-wind");
var friTemp = document.getElementById("fri-temp");
var friWind = document.getElementById("fri-wind");
var friHumidity = document.getElementById("fri-humidity");
var mImage = document.getElementById("m-img");
var mWeatherImg = document.getElementById("m-weather-img");
//the array that i got from the five day forcast, did not divide or have object names of daily, hourly, or minutely, everything was a big list <----please read note, feedback


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

    try {
        const key = "6ed102388c0f7d2090336e3ef5fc46dd";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
        const weatherData = await fetch(`${url}`).then(response => response.json());
        console.log(weatherData);
        let lat = weatherData.coord.lat;
        let lon = weatherData.coord.lon;
        console.log(lat, lon); // here we have the longitude and latitude values needed for the geoloacation api

        searchInput.value = "";
        let units = "metric";
        currentHumidity.innerHTML = "Humidity:" + "";
        currentWind.innerHTML = "Wind:" + "";
        currentTemp.innerHTML = "Temperature:" + "";
        currentDate.innerHTML ="";


        const forcastKey = "6ed102388c0f7d2090336e3ef5fc46dd";
        const forcastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=${units}`;
        //two objects should be listed in console with weather data that will be extracted from
        //forcastWeatherData hold all the five day forcast
        var forcastWeatherData = await fetch(`${forcastUrl}`).then(response => response.json());
        console.log(forcastWeatherData);

        var currentcityDisplay = document.getElementById("current-city");
        currentcityDisplay.innerHTML = forcastWeatherData.city.name;
        currentHumidity.innerHTML += " " + forcastWeatherData.list[0].main.humidity + "%";
        currentWind.innerHTML += " " + forcastWeatherData.list[0].wind.speed + " MPH";
        currentTemp.innerHTML += " " + Math.round(forcastWeatherData.list[0].main.temp * 1.8 + 32) + "\u00B0" + "F";
        currentDate.innerHTML += " " + forcastWeatherData.list[0].dt_txt;


        //Reason I had to do it like this, because my array that I got back was one big list with no daily,hourly,minutely,use the 5 forcast day from openweather api. Hope there is a resolution to this, so that i could use a loop
        mTemp.innerHTML = " " + "Temp: " + Math.round(forcastWeatherData.list[4].main.temp * 1.8 + 32) + "\u00B0" + "F";
        mHumidity.innerHTML += " " + forcastWeatherData.list[4].main.humidity + "%";
        mWind.innerHTML += " " + forcastWeatherData.list[4].wind.speed + " MPH";
       

        tuesTemp.innerHTML = " " + "Temp: " + Math.round(forcastWeatherData.list[12].main.temp * 1.8 + 32) + "\u00B0" + "F";
        tuesHumidity.innerHTML += " " + forcastWeatherData.list[12].main.humidity + "%";
        tuesWind.innerHTML += " " + forcastWeatherData.list[12].wind.speed + " MPH";


        wedTemp.innerHTML = " " + "Temp: " + Math.round(forcastWeatherData.list[20].main.temp * 1.8 + 32) + "\u00B0" + "F";
        wedHumidity.innerHTML += " " + forcastWeatherData.list[20].main.humidity + "%";
        wedWind.innerHTML += " " + forcastWeatherData.list[20].wind.speed + " MPH";


        thursTemp.innerHTML = " " + "Temp: " + Math.round(forcastWeatherData.list[28].main.temp * 1.8 + 32) + "\u00B0" + "F";
        thursHumidity.innerHTML += " " + forcastWeatherData.list[28].main.humidity + "%";
        thursWind.innerHTML += " " + forcastWeatherData.list[28].wind.speed + " MPH";

        
        friTemp.innerHTML = " " + "Temp: " + Math.round(forcastWeatherData.list[36].main.temp * 1.8 + 32) + "\u00B0" + "F";
        friHumidity.innerHTML += " " + forcastWeatherData.list[36].main.humidity + "%";
        friWind.innerHTML += " " + forcastWeatherData.list[36].wind.speed + " MPH";

        
    } catch (err) {
        console.log(err);

    }


}

