import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAllCountries = () => {
  return axios.get(`${baseUrl}/all`).then((res) => res.data);
};

const getCountries = (query) => {
  return axios.get(`${baseUrl}/name/${query}`).then((res) => res.data);
};

export default { getAllCountries, getCountries };
