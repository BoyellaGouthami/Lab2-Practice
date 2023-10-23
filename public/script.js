document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("weatherForm");
    const cityInput = document.getElementById("cityInput");
    const weatherInfo = document.getElementById("weatherInfo");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const city = cityInput.value;
      if (city.trim() === "") {
        alert("Please enter a city name.");
        return;
      }
  
      getWeather(city);
    });
  
    async function getWeather(city) {
      try {
        const response = await fetch(`/weather?city=${city}`);
        const data = await response.json();
  
        const temperature = data.main.temp;
        const description = data.weather[0].description;
  
        weatherInfo.innerHTML = `Weather in ${city}: ${description}, Temperature: ${temperature}°C`;
      } catch (error) {
        weatherInfo.innerHTML = "City not found. Please try again.";
        console.error(error);
      }
    }
  });
  