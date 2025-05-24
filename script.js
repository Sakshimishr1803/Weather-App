const apiKey = "87aa26e0b8b9d108aa688eb641a498f5";
const searchBtn = document.querySelector(".search-bttn");
const cityInput = document.getElementById("cityInput");
const temperatureDiv = document.querySelector(".temperature");
const descriptionDiv = document.querySelector(".description");
const humidityDiv = document.querySelector(".details div:nth-child(1)");
const windDiv = document.querySelector(".details div:nth-child(2)");
const weatherIcon = document.querySelector(".picContainer img");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeatherData(city);
  } else {
    alert("Please enter a city name.");
  }
});

async function getWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    updateWeatherUI(data);
  } catch (error) {
    alert(error.message);
  }
}

function updateWeatherUI(data) {
  const temperature = data.main.temp;
  const description = data.weather[0].description;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  const iconCode = data.weather[0].icon;

  temperatureDiv.textContent = `${Math.round(temperature)}°C`;
  descriptionDiv.textContent = capitalizeFirstLetter(description);
  humidityDiv.textContent = `Humidity: ${humidity}%`;
  windDiv.textContent = `Wind: ${windSpeed} km/h`;
  weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
