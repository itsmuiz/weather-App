// Select elements from the DOM
const cityElement = document.querySelector('.city');
const tempElement = document.querySelector('.temp');
const humidityElement = document.querySelector('.humidity');
const windElement = document.querySelector('.wind');
const searchInput = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherImg = document.querySelector('.weather-icon');
const weatherStatus = document.querySelector('.weather-status');

console.log(weatherImg);

// API Key
const apiKey = '8ab8f9d4dab064f83ef43d48baa8a1d0';

// Function to fetch weather data
async function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();

        // Update DOM elements with data
        cityElement.textContent = data.name;
        tempElement.textContent = `${Math.round(data.main.temp)}°C`;
        humidityElement.textContent = `${Math.round(data.main.humidity)}%`;
        windElement.textContent = `${data.wind.speed} km/h`; 
        weatherStatus.textContent = data.weather[0].main;
        weatherImg.src = `./${data.weather[0].main}.png`;

    } catch (error) {
        console.error('Error fetching weather data', error);
        cityElement.textContent = 'City not found';
        tempElement.textContent = '';
        humidityElement.textContent = '';
        windElement.textContent = '';
    }


}

// Event listener for search button click
searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        getWeather(searchTerm);
        searchInput.value = ''; // Clear the search input field after fetching weather data
    } else {
        alert('Please enter a city name');
    }



});

// Initially fetch weather data for a default city when the page loads
getWeather('Delhi'); // Replace 'Delhi' with your preferred default city

/* 8ab8f9d4dab064f83ef43d48baa8a1d0
https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
*/