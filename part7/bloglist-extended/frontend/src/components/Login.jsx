import PropTypes from "prop-types";

const Login = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
}) => {
  return (
    <form onSubmit={handleLogin} data-testid="login-form">
      <h2>Login to the Blogger</h2>
      <div>
        username
        <input
          data-testid="username"
          type="text"
          value={username}
          name="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        password
        <input
          data-testid="password"
          type="password"
          value={password}
          name="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

Login.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default Login;
