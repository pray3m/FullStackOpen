import axios from "axios";

// https://api.openweathermap.org/data/2.5/weather?q=London&appid={API key}

const api_key = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const getInfo = (city) =>
  axios
    .get(`${baseUrl}?q=${city}&appid=${api_key}&units=metric`)
    .then((res) => res.data);

export default { getInfo };
