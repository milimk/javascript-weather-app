// Current date display

function formatDate(now) {
  let date = now.getDate();
  let year = now.getFullYear();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  return `${month} ${date}, ${year}, ${day} ${hours}:${minutes}`;
}

let currentDateElement = document.querySelector(".current-date");
let current = new Date();
currentDateElement.innerHTML = formatDate(current);

// Search engine and adding weather API call

function updateWeather(response) {
  let temperatureElement = document.querySelector("#current-temp");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#current-city-name");
  let conditionElement = document.querySelector("#current-city-condition");
  let humidityElement = document.querySelector("#current-city-humidity");
  let windElement = document.querySelector("#current-city-wind");
  let iconElement = document.querySelector("#current-weather-icon");

  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.city;
  conditionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" />`;

  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "0af4f7ebo6ce11605e35ecb7eatc1716";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(updateWeather);
}

function searchResult(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  /* Display search term I used in the input
  let cityElement = document.querySelector("#current-city-name");
  cityElement.innerHTML = searchInput.value;
  */
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchResult);

// Display forecast with API call

function getForecast(city) {
  apiKey = "0af4f7ebo6ce11605e35ecb7eatc1716";
  apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

// Display forecast with fake data

function displayForecast(response) {
  console.log(response.data);

  let forecastDays = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  forecastDays.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
          <div class="forecast-day" id="forecast-day">
            <div class="forecast-date" id="forecast-date">${day}</div>
            <div class="forecast-icon" id="forecast-icon">☀️</div>
            <div class="forecast-temp" id="forecast-temp">
              <div class="forecast-temp-low" id="forecast-temp-low">15˚</div>
              <div class="forecast-temp-high" id="forecast-temp-high">19˚</div>
            </div>
          </div>
        `;
  });

  let forecastElement = document.querySelector("#forecast-container");
  forecastElement.innerHTML = forecastHtml;
}

// Calling functions to run

searchCity("Vienna"); // Default city to load when page is loaded
