const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const APIKey = "b7973a78e6404b37e6db3394b82bdf66"; // Replace with your API key
  const city = document.querySelector(".search-box input").value;

  if (city == "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod == "404") {
        container.style.height = "400px";
        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        error404.classList.add("active");
        return;
      }

      container.style.height = "555px";
      weatherBox.classList.add("active");
      weatherDetails.classList.add("active");
      error404.classList.remove("active");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity-value"
      );
      const wind = document.querySelector(".weather-details .wind-value");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "clear.png";
          break;
        case "Rain":
          image.src = "rainy.png";
          break;
        case "Snow":
          image.src = "snow.png";
          break;
        case "Clouds":
          image.src = "cloud.png";
          break;
        case "Mist":
        case "Haze":
          image.src = "mist.png";
          break;
        default:
          image.src = "cloud.png";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>℃</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseFloat(json.wind.speed)} km/h`;
    })
    .catch((error) => {
      console.error("Error during fetch operation:", error);
      alert("An error occurred. Please try again.");
    });
});