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

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
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

searchCity("Vienna");
