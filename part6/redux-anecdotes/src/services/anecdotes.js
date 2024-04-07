import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject);
  return response.data;
};

const vote = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  const objectToChange = response.data;
  const newObject = {
    ...objectToChange,
    votes: objectToChange.votes + 1,
  };

  const updatedObject = await axios.put(`${baseUrl}/${id}`, newObject);
  return updatedObject.data;
};

export default { getAll, create, vote };
