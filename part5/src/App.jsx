import { useState, useEffect } from "react";
import "./App.css";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (!loggedUser) return;

    const user = JSON.parse(loggedUser);
    blogService.setToken(user.token);
    setUser(user);
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
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
      if (ex.response.data) setErrorMsg(ex.response.data.error);
      setErrorMsg("something went wrong");
      setTimeout(() => {
        setErrorMsg(null);
      }, 4000);
    }
    setUsername("");
    setPassword("");
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  return (
    <div>
      <Notification errorMsg={errorMsg} successMsg={successMsg} />
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
        <div>
          <h2>blogs</h2>
          <p>
            {user?.name} is logged in{" "}
            <button onClick={handleLogout}>logout</button>
          </p>
          <BlogForm
            blogs={blogs}
            setBlogs={setBlogs}
            setErrorMsg={setErrorMsg}
            setSuccessMsg={setSuccessMsg}
          />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
