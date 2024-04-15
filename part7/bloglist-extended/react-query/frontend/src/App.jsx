import { useContext, useEffect } from "react";
import "./App.css";
import AuthContext from "./AuthContext";
import Home from "./components/Home";
import Login from "./components/Login";
import Notification from "./components/Notification";
import blogService from "./services/blogs";

const App = () => {
  const [user, dispatchAuth] = useContext(AuthContext);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (!loggedUser) return;

    const user = JSON.parse(loggedUser);
    blogService.setToken(user.token);
    dispatchAuth({ type: "SET_USER", data: user });
  }, [dispatchAuth]);

  return (
    <div>
      <Notification />
      {user === null ? <Login /> : <Home />}
    </div>
  );
};

export default App;
