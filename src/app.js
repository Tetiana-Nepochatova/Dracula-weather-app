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
}

let apiKey = `7606e398d85035b10d42b33b84e4a65a`;
let city = "Kremenchuk";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
