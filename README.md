# 06 Server-Side APIs: TrackWeather0823

## Task
This weeks challenege was to create a weather app, which will display the current weather for the day and the next five day forecast. This inlcuded J-query, HTML, CSS, and Javascript. I used a openweathermap API to fetch or request data to use in this app. I used latitude and longitude to collect data which required these two inputs, in order to fetch the five day forecast data. I used the data and created weather cards, which would load the weather for each day. Each card has a label of date, temperature, wind, humidity, and an icon which was fetched from the API source. This icon shows a image of what the weather will look like. This gives users a more visible understanding of the weather. I included a clock, which will display the current time, it will display "AM" or "PM" depending on the number of hours. You will notice that I included a search history bar, where users previous search will append to the search history bar. The user will be able to click the previous search history and see loaded weather forecast for that search. This makes the app more easy going and accessible for the user. One challenege I came across was trying to stop the search history from duplicating searches. I will be working on it to see what it is causing the duplicate appendent to the search history bar. There is a clear button added to clear the search history if user chooses to do so. I plan on adding a few more articles to the website and trying new api's to add cool stuff to the app. 

Deployed TrackWeather0823 App: https://ariesscode.github.io/TrackWeather-08-23/

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

## Mock-Up

![Alt text](06-server-side-apis-homework-demo.png)


