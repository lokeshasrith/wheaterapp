const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchInput = document.querySelector('.search-input');
searchInput.addEventListener('keypress', queryWeather);

function queryWeather(event) {
  if (event.keyCode === 13) {
    fetchWeatherData(searchInput.value);
  }
}

function fetchWeatherData(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(response => response.json())
    .then(updateWeatherInfo);
}

function updateWeatherInfo(weather) {
  const cityName = document.querySelector('.city-name');
  cityName.innerText = `${weather.name}, ${weather.sys.country}`;

  const now = new Date();
  const currentDate = document.querySelector('.current-date');
  currentDate.innerText = formatDate(now);

  const temperature = document.querySelector('.temperature');
  temperature.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  const weatherCondition = document.querySelector('.weather-condition');
  weatherCondition.innerText = weather.weather[0].main;

  const highLowTemp = document.querySelector('.high-low-temp');
  highLowTemp.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;

  const weatherIcon = document.getElementById('weather-icon');
  updateWeatherIcon(weatherIcon, weather.weather[0].main);
}

function updateWeatherIcon(element, condition) {
  element.className = 'weather-icon'; // Reset classes
  const iconMap = {
    Clear: '☀️ sunny',
    Clouds: '☁️ cloudy',
    Rain: '🌧️ rainy',
    Snow: '❄️ snowy',
    Thunderstorm: '⛈️ thunderstorm',
    Drizzle: '🌦️ drizzle',
    Mist: '🌫️ mist',
    Haze: '🌫️ mist',
    Fog: '🌫️ mist'
  };
  element.innerHTML = iconMap[condition].split(' ')[0];
  element.classList.add(iconMap[condition].split(' ')[1]);
}

function formatDate(date) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const day = days[date.getDay()];
  const month = months[date.getMonth()];
  const dateNum = date.getDate();
  const year = date.getFullYear();

  return `${day} ${dateNum} ${month} ${year}`;
}
