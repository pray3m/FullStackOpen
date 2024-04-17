import { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Notification from "./components/Notification";
import UserInfo from "./components/UserInfo";
import UsersList from "./components/UsersList";
import AuthContext from "./context/AuthContext";
import blogService from "./services/blogs";
import Blog from "./components/Blog";

const App = () => {
  const [, dispatchAuth] = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (!loggedUser) navigate("/login");

    const user = JSON.parse(loggedUser);
    blogService.setToken(user?.token);
    dispatchAuth({ type: "SET_USER", data: user });
  }, [dispatchAuth, navigate]);

  return (
    <div>
      <Notification />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/users' element={<UsersList />} />
        <Route path='/users/:id' element={<UserInfo />} />
        <Route path='/blogs/:id' element={<Blog />} />
      </Routes>
    </div>
  );
};

export default App;
