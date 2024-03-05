import { useEffect, useState } from "react";
import "./App.css";
import countryService from "./services/country";
import Country from "./components/Country";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [showCountryIndex, setShowCountryIndex] = useState(null);

  useEffect(() => {
    countryService
      .getAllCountries()
      .then((initialCountries) => setAllCountries(initialCountries));
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setCountries([]);
    } else {
      const filteredCountries = allCountries.filter((c) =>
        c.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setCountries(filteredCountries);
    }
  }, [searchQuery, allCountries]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleToggleShow = (i) =>
    setShowCountryIndex(i === showCountryIndex ? null : i);

  const isSingleCountry = countries?.length === 1;

  return (
    <>
      <h1>
        find countries
        <input
          type="text"
          name="search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </h1>
      <div className="country">
        {isSingleCountry && <Country country={countries[0]} />}

        {countries?.length > 10 ? (
          <p>Too many matches. make the query more specific</p>
        ) : (
          !isSingleCountry &&
          countries.map((country, i) => (
            <div key={i}>
              <p>
                {country?.name?.common}{" "}
                <button onClick={() => handleToggleShow(i)}> show </button>{" "}
              </p>
              {showCountryIndex === i && <Country country={country} />}
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default App;
