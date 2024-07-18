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

// Search engine
function searchResult(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city-name");
  cityElement.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchResult);
