import { useEffect, useState } from "react";
import weatherService from "../services/weather";

const WeatherCard = ({ country }) => {
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    weatherService
      .getInfo(country?.capital)
      .then((info) => setWeather(info))
      .catch((ex) => setError("Error fetching weather data."));
  }, [country?.capital]);

  console.log(weather);

  const iconCode = weather?.weather?.[0]?.icon;

  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
  const imgAlt = weather?.weather?.[0]?.description;

  if (error)
    return (
      <p
        style={{
          color: "red",
          background: "lightgrey",
          fontSize: "16px",
          borderStyle: "solid",
          borderRadius: "5px",
          marginTop: "46px",
          padding: "6px",
          marginBottom: "10px",
        }}
      >
        {error}
      </p>
    );

  return (
    <div>
      {Object.keys(weather).length > 0 ? (
        <>
          <h2>Weather in {country?.capital}</h2>
          <div>
            <p>temperature {weather?.main?.temp} Celsius </p>
            <img src={iconUrl} alt={imgAlt} height={160} />
            <p>wind {weather?.wind?.speed}</p>
          </div>
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherCard;
