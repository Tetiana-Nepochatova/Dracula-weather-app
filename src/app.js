function formatDate(timestamp) {
  let dateToday = new Date(timestamp);
  let hours = dateToday.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = dateToday.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let date = dateToday.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dateToday.getDay()];
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
  let month = months[dateToday.getMonth()];
  let year = dateToday.getFullYear();

  return `${day} ${hours}:${minutes} </br> ${date} ${month} ${year}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
      <img src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png" width="42" />
      <div class="weather-forecast-temperature">
        <span class="weather-forecast-temperature-max">${Math.round(
          forecastDay.temp.max
        )}° </span>
        <span class="weather-forecast-temperature-min">${Math.round(
          forecastDay.temp.min
        )}°</span>
      </div>
    </div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = `7606e398d85035b10d42b33b84e4a65a`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector(`#temperature`);
  let cityElement = document.querySelector(`#city`);
  let feelElement = document.querySelector(`#feel`);
  let humidityElement = document.querySelector(`#humidity`);
  let windElement = document.querySelector(`#wind`);
  let dateElement = document.querySelector(`#date`);
  let iconElement = document.querySelector(`#icon`);

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  feelElement.innerHTML = Math.round(response.data.main.feels_like);
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = `7606e398d85035b10d42b33b84e4a65a`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

search("Kremenchuk");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function showCurrentLocationWeather() {
  navigator.geolocation.getCurrentPosition(getLocation);
}

function getLocation(position) {
  let apiKey = `7606e398d85035b10d42b33b84e4a65a`;
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

let currentBtn = document.querySelector("#current-button");
currentBtn.addEventListener("click", showCurrentLocationWeather);
