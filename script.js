var searchButton = document.querySelector("#search-button");
var searchInput = document.getElementById("city-input");
var cardTemp = document.querySelectorAll("#temp");
var cardHumidity = document.querySelectorAll("#humidity");
var cardIcon = document.querySelectorAll("#weather-icon");
var cardDate = document.querySelectorAll(".date");
var cardWind = document.querySelectorAll("#wind");
var weatherCards = document.querySelectorAll(".weather-cards");

//the array that i got from the five day forcast, did not divide or have object names of daily, hourly, or minutely, everything was a big list <----please read note, feedback
var clearButtn = document.getElementById("clear-history");
var searchHistory = [];






searchButton.addEventListener('click', (e) => {
    e.preventDefault();

    searchHistory.unshift(searchInput.value)

    const city = searchInput.value;
    fetchWeatherData(city);


    var recentList = "";

    for (let i = 0; i < searchHistory.length; i++) {
        recentList += `<div id="recent-search" class="recentItem">
        <p>${searchHistory[i]}</p>
        </div>`

        document.getElementById("recent").innerHTML = recentList;
    }



    clearButtn.addEventListener("click", eraseHistory);

    function eraseHistory() {
        document.getElementById("recent").innerHTML = "";
    }
    
        var cityDisplay = searchInput.value;
        if (cityDisplay) {
            fetchWeatherData(cityDisplay);
    
        }
    
    

});

function currentTime() {
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let session = "AM";

    if(hh === 0) {
        hh = 12;
    }
    if(hh > 12) {
        hh = hh - 12;
        session = "PM";
    }
    hh = (hh < 10) ? "0" + hh : hh;
    mm = (mm < 10) ? "0" + mm : mm;
    ss = (ss < 10) ? "0" + ss : ss;

    let time = hh + ":" + mm + ":" + ss + " " + session;
    document.getElementById("clock").innerText = time;
    
    let t = setTimeout(function() {
        currentTime() }, 1000);
    }
currentTime();


//Async method to fetch data from openweather Api,
//this allows the promise to be resolved first before executing my funtion,
//so that data is retrieved and I can catch errors in the retrieving process
//response.json is used to make readable object of javascript
async function fetchWeatherData(city) {

    try {
        const key = "6ed102388c0f7d2090336e3ef5fc46dd";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
        const weatherData = await fetch(`${url}`).then(response => response.json());

        let lat = weatherData.coord.lat;
        let lon = weatherData.coord.lon;
        console.log(lat, lon); // here we have the longitude and latitude values needed for the geoloacation api

        searchInput.value = "";
        let units = "metric";




        const forcastKey = "6ed102388c0f7d2090336e3ef5fc46dd";

        const forcastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${forcastKey}&units=${units}`;
        //two objects should be listed in console with weather data that will be extracted from
        //forcastWeatherData hold all the five day forcast
        var forcastWeatherData = await fetch(`${forcastUrl}`).then(response => response.json());


        const dailyWeatherData = [];

        for (const item of forcastWeatherData.list) {
            const date = new Date(item.dt_txt);


            const dateString = item.dt_txt.split(' ')[0];


            if (!dailyWeatherData.some(day => day.date === dateString)) {
                dailyWeatherData.push({

                    date: dateString,
                    name: forcastWeatherData.city.name,
                    icon: item.weather[0].icon,
                    temp: Math.round(item.main.temp * 1.8 + 32) + "\u00B0" + "F",
                    humidity: item.main.humidity + "%",
                    wind: item.wind.speed + " MPH"
                });
            }
        }


        function updateWeatherCards(dailyWeatherData) {
            
                const currentCityDisplay = document.getElementById("current-city");
                const currentDateDisplay = document.getElementById("current-date");
                const currentHumidityDisplay = document.getElementById("current-humidity");
                const currentWindDisplay = document.getElementById("current-wind");
                const currentTempDisplay = document.getElementById("current-temp");
                console.log("daily:", dailyWeatherData);

                currentCityDisplay.textContent = dailyWeatherData[0].name;
                currentCityDisplay.style.color = "blue";
                currentDateDisplay.textContent = dailyWeatherData[0].date;
                currentDateDisplay.style.fontWeight = "bold";
                currentHumidityDisplay.textContent = "Humidity: " + dailyWeatherData[0].humidity;
                currentHumidityDisplay.style.fontWeight = "bold";
                currentWindDisplay.textContent = "Wind: " + dailyWeatherData[0].wind;
                currentWindDisplay.style.fontWeight = "bold";
                currentTempDisplay.textContent = "Temperature: " + dailyWeatherData[0].temp;
                currentTempDisplay.style.fontWeight = "bold";

                for (let i = 1; i < dailyWeatherData.length; i++) {
                    cardDate[i - 1].textContent = dailyWeatherData[i].date;
                    cardIcon[i - 1].src = `https://openweathermap.org/img/wn/${dailyWeatherData[i].icon}.png`;
                    cardTemp[i - 1].textContent = `Temperature: ${dailyWeatherData[i].temp}`;
                    cardHumidity[i - 1].textContent = `Humidity: ${dailyWeatherData[i].humidity}`;
                    cardWind[i - 1].textContent = `Wind: ${dailyWeatherData[i].wind}`;
            }
        }
        updateWeatherCards(dailyWeatherData);


    } catch (err) {
        console.log(err);

    }


}

