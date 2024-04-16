import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import NotificationContext, { showNotification } from "../context/NotificationContext";
import blogService from "../services/blogs";
import loginService from "../services/login";

const Login = () => {
  const [, dispatchNotification] = useContext(NotificationContext);
  const [user, dispatchAuth] = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Logging in with", username, password);
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatchAuth({ type: "SET_USER", data: user });
      navigate("/");
    } catch (ex) {
      showNotification("login failed", 5)(dispatchNotification);
    }
    setUsername("");
    setPassword("");
  };

  return (
    <form onSubmit={handleLogin} data-testid='login-form'>
      <h2>Login to the Blogger</h2>
      <div>
        username
        <input
          data-testid='username'
          type='text'
          value={username}
          name='Username'
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        password
        <input
          data-testid='password'
          type='password'
          value={password}
          name='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  );
};

export default Login;
