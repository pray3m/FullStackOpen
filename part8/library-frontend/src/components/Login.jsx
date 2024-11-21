import { useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { LOGIN } from "../queries";

const Login = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("user-token", token);
      setPage("authors");
    }
  }, [result.data, setPage, setToken]);

  const submit = (e) => {
    e.preventDefault();
    login({ variables: { username, password } });
  };

  if (!show) return null;

  return (
    <form onSubmit={submit}>
      <h2>Login </h2>
      <div>
        username
        <input
          type="text"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          autoComplete="username"
        />
      </div>
      <div>
        password
        <input
          type="password"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          autoComplete="current-password"
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

Login.propTypes = {
  show: PropTypes.bool.isRequired,
  setToken: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default Login;
