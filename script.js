// Weather App JavaScript

// DOM Elements
const location = document.getElementById("locationInput");
const getWeatherBtn = document.getElementById("get-weather-btn");
const weatherIcon = document.getElementById("weather-icon");
const weatherDesc = document.getElementById("weather-desc");
const weatherTemp = document.getElementById("weather-temp");
const loadingSpinner = document.getElementById("loading-spinner");

// API Key and Base URL
const apiKey = "YOUR_API_KEY";
const baseUrl = "https://api.weatherapi.com/v1/current.json";

// Function to fetch weather data
function getWeatherData(city) {
  // Show loading spinner
  loadingSpinner.style.display = "block";
  // Fetch weather data from API
  fetch(`${baseUrl}?key=${apiKey}&q=${city}`)
    .then((response) => response.json())
    .then((data) => {
      // Hide loading spinner
      loadingSpinner.style.display = "none";
      if (data.error) {
        // Show error message
        weatherIcon.src = "";
        weatherDesc.textContent = "Error fetching weather data";
        weatherTemp.textContent = "";
      } else {
        // Update weather data
        weatherIcon.src = data.current.condition.icon;
        weatherDesc.textContent = data.current.condition.text;
        weatherTemp.textContent = `${data.current.temp_c}°C`;
      }
    })
    .catch((error) => {
      // Hide loading spinner
      loadingSpinner.style.display = "none";
      // Show error message
      weatherIcon.src = "";
      weatherDesc.textContent = "Error fetching weather data";
      weatherTemp.textContent = "";
      console.error(error);
    });
}

// Event Listener for Get Weather Button
getWeatherBtn.addEventListener("click", () => {
  const city = location.value.trim();
  if (city !== "") {
    // Call the function to fetch weather data with the city name
    getWeatherData(city);
  }
});

// Event Listener for Enter Key Press on City Input Field
location.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) { // Check if the key code is for the enter key
    event.preventDefault(); // Prevent the default behavior of the enter key
    const city = location.value.trim(); // Get the city name from the input field
    if (city !== "") { // Proceed only if the city name is not empty
      // Call the function to fetch weather data with the city name
      getWeatherData(city);
    }
  }
});
