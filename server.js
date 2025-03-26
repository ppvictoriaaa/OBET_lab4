require("dotenv").config();
const express = require("express");
const axios = require("axios");
const path = require("path");
const hbs = require("hbs");

const app = express();
const PORT = 3000;
const API_KEY = process.env.WEATHER_API_KEY;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));

let cities = ["Zhytomyr", "Kyiv", "Lviv", "Odesa", "Dnipro"];

app.get("/", (req, res) => {
  res.render("index", { cities });
});

// маршрут /weather/:city
app.get("/weather/:city", async (req, res) => {
  const city = req.params.city;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    const weatherData = response.data;
    const description = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    res.render("cityWeather", { weather: weatherData, description, icon });
  } catch (error) {
    res.status(404).send("City is not found");
  }
});

// маршрут /weather?city=Zhytomyr
app.get("/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) return res.send("Enter city in URL: /weather?city=yourCity");

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    const weatherData = response.data;
    const description = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    res.render("cityWeather", { weather: weatherData, description, icon });
  } catch (error) {
    res.status(404).send("City is not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});
