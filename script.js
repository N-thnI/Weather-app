const apiKey = "5dd03b2987680039ace633846d734f0b"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search-btn");
const weatherIcon = document.querySelector("#weather-icon");
const display = document.querySelector("#weather-display");
const errorMsg = document.querySelector("#error-msg");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        errorMsg.style.display = "block";
        display.style.display = "none";
    } else {
        const data = await response.json();

        document.querySelector("#city").innerHTML = data.name;
        document.querySelector("#temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector("#humidity").innerHTML = data.main.humidity + "%";
        document.querySelector("#wind").innerHTML = data.wind.speed + " km/h";

        // Dynamic Icon Logic
        const condition = data.weather[0].main;
        const iconCode = data.weather[0].icon;
        // Use OpenWeather's own icons for simplicity
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        display.style.display = "block";
        errorMsg.style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") checkWeather(searchBox.value);
});
