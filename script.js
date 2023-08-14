var searchButton = document.querySelector("#search-button");
var searchInput = document.getElementById("city-input");
var currentDisplay = document.getElementById("currentCityData");

//the array that i got from the five day forcast, did not divide or have object names of daily, hourly, or minutely, everything was a big list <----please read note, feedback
var clearButtn = document.getElementById("clear-history");
var searchHistory = [];






searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    searchHistory.unshift(searchInput.value)
    console.log(searchHistory);

    var recentList = "";

    for( let i = 0 ; i < searchHistory.length ; i++) {
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
      
       


        const forcastKey = "6ed102388c0f7d2090336e3ef5fc46dd";
        const forcastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=${units}`;
        //two objects should be listed in console with weather data that will be extracted from
        //forcastWeatherData hold all the five day forcast
        var forcastWeatherData = await fetch(`${forcastUrl}`).then(response => response.json());
        console.log(forcastWeatherData);

        const dailyWeatherData = [];

        for (const item of forcastWeatherData.list) {
            const date = new Date(item.dt_txt);


            const dateString = item.dt_txt.split(' ')[0];


            if(!dailyWeatherData.some(day => day.date === dateString))  {
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

        for(const day of dailyWeatherData) {
            console.log(day.date);
            console.log(day.icon);
            console.log(day.temp);
            console.log(day.humidity);
            console.log(day.wind);
            console.log(day.name);
        }


        const currentDate = new Date();
        const nextDaysWeatherData = forcastWeatherData.list.filter(item => {
            const itemDate = new Date(item.dt_txt);
            return itemDate.getDate() > currentDate.getDate();
        });

        nextDaysWeatherData.forEach(item => {
            
            const date = new Date(item.dt_txt);
            const cityName = forcastWeatherData.city.name;
            const dateString = date.toISOString().split('T')[0];
            const temperature = Math.round(item.main.temp * 1.8 + 32) + "\u00B0" + "F";
            const humidity = item.main.humidity + "%";
            const wind = item.wind.speed + " MPH";
            const iconCode = item.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

console.log(date, humidity, temperature,  wind, iconCode, dateString, cityName);
            return `<div class="current-city-display">
            <h2 id="current-city">${cityName}</h2>
            <div id="current-date" class="current-date">${date}</div>
            <div id="current-temp" class="temp">Temperature: ${temperature}</div>
            <div id="current-wind" class="wind">Wind: ${wind}</div>
            <div id="current-humidity" class="humidity">Humidity: ${humidity}</div>`
           
        });

        
        
    } catch (err) {
        console.log(err);

    }


}

