import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries";
import { useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);

  const [name, setName] = useState("Select author");
  const [born, setBorn] = useState("");
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const authors = result?.data.allAuthors;

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateAuthor({
      variables: {
        name,
        setBornTo: born,
      },
    });
    setName("");
    setBorn("");
  };

  const options = authors.map((a) => ({ value: a.name, label: a.name }));

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>set birthyear</h2>
      <form onSubmit={handleUpdate}>
        <Select
          options={options}
          value={{ value: name, label: name }}
          onChange={({ value }) => setName(value)}
        />
        <input
          type="number"
          name="born"
          id="born"
          value={born}
          placeholder="enter born"
          onChange={({ target }) => setBorn(parseInt(target.value))}
        />
        <br />
        <input type="submit" value="update author" />
      </form>
    </div>
  );
};

Authors.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Authors;
