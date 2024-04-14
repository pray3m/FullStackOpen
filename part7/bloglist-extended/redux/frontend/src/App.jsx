import { useEffect, useState } from "react";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { useDispatch } from "react-redux";
import { showNotification } from "./reducers/notificationReducer";

const App = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (!loggedUser) return;

    const user = JSON.parse(loggedUser);
    blogService.setToken(user.token);
    setUser(user);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Logging in with", username, password);
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (ex) {
      dispatch(showNotification("something went wrong", 5));
    }
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <Notification />
      {user === null ? (
        <Login
          setUser={setUser}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      ) : (
        <Home user={user} setUser={setUser} />
      )}
    </div>
  );
};

export default App;
