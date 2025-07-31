async function getWeather() {
  const city = document.getElementById("city").value;
  const apiKey = "YOUR_API_KEY_HERE"; // Replace with your OpenWeatherMap API key
  const display = document.getElementById("weatherDisplay");

  if (!city) {
    display.innerHTML = `<p>Please enter a city name.</p>`;
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    const { name } = data;
    const { temp } = data.main;
    const { description, icon } = data.weather[0];

    display.innerHTML = `
      <h2>${name}</h2>
      <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" />
      <p>Temperature: ${temp}°C</p>
      <p>Condition: ${description}</p>
    `;
  } catch (error) {
    display.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}