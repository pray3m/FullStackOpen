import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then((res) => {
        setCountry(res.data[0]);
      })
      .catch((error) => {
        setCountry(null);
      });
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  // if (!country) {
  //   return null;
  // }

  if (country === null) {
    return <div>not found...</div>;
  }

  console.log(country);

  return (
    <div>
      <h3>{country?.name?.common} </h3>
      <div>capital {country?.capital[0]} </div>
      <div>population {country?.population}</div>
      <img
        src={country?.flags.png}
        height="100"
        alt={`flag of ${country?.name}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
