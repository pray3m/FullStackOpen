const Country = ({ country }) => {
  return (
    <div>
      <h2>{country?.name?.common}</h2>
      <div>
        <p>
          <span>Capital: </span>
          {country?.name?.common}
        </p>
        <p>
          <span>Area: </span>
          {country?.area}
        </p>
      </div>
      <div>
        <h3>languages:</h3>
        <ul>
          {Object.values(country?.languages)?.map((lang, i) => (
            <li key={i}>{lang}</li>
          ))}
        </ul>

        <img src={country?.flags?.png} alt={country?.flags?.alt} height={180} />
      </div>
    </div>
  );
};

export default Country;
