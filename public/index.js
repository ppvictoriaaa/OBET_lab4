const API_KEY = "2f6eda8a8af558ce4ff7adf8d766b986";

window.addEventListener("load", function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      const weatherData = await response.data;
      const city = weatherData.name;
      const citiesContainer = document.querySelector(".city_container");
      const newCity = document.createElement("a");

      newCity.href = `/weather/${city}`;
      newCity.textContent = `Your city: ${city}`;
      newCity.classList.add("btn_to_weather");
      newCity.classList.add("btn_to_weather--your_city");
      citiesContainer.prepend(newCity);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
});
