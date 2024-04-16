import axios from "axios";
const baseUrl = "/api/users";

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const getById = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`);
  return res.data;
};

export default { getAll, getById };
