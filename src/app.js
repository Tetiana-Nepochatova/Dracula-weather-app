function displayTemperature(response) {
  console.log(response.data);

  let temperatureElement = document.querySelector(`#temperature`);
  let cityElement = document.querySelector(`#city`);
  let feelElement = document.querySelector(`#feel`);
  let humidityElement = document.querySelector(`#humidity`);
  let windElement = document.querySelector(`#wind`);
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  feelElement.innerHTML = Math.round(response.data.main.feels_like);
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = `7606e398d85035b10d42b33b84e4a65a`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Kremenchuk&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
