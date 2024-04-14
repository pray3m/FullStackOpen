import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Notification from "./components/Notification";
import { setUser } from "./reducers/authReducer";
import { showNotification } from "./reducers/notificationReducer";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (!loggedUser) return;

    const user = JSON.parse(loggedUser);
    blogService.setToken(user.token);
    dispatch(setUser(user));
  }, [dispatch]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Logging in with", username, password);
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
    } catch (ex) {
      dispatch(showNotification("something went wrong", 5));
    }
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <Notification />
      {!user.username ? (
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
