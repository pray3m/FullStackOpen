import { useContext, useEffect, useState } from "react";
import "./App.css";
import AuthContext from "./AuthContext";
import Home from "./components/Home";
import Login from "./components/Login";
import Notification from "./components/Notification";
import NotificationContext, { showNotification } from "./NotificationContext";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [, dispatchNotification] = useContext(NotificationContext);
  const [user, dispatchAuth] = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (!loggedUser) return;

    const user = JSON.parse(loggedUser);
    blogService.setToken(user.token);
    dispatchAuth({ type: "SET_USER", data: user });
  }, [dispatchAuth]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Logging in with", username, password);
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatchAuth({ type: "SET_USER", data: user });
    } catch (ex) {
      showNotification("login failed", 5)(dispatchNotification);
    }
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <Notification />
      {user === null ? (
        <Login
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      ) : (
        <Home />
      )}
    </div>
  );
};

export default App;
