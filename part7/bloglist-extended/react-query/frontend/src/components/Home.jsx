import { useQuery } from "@tanstack/react-query";
import { useContext, useRef } from "react";
import AuthContext from "../AuthContext";
import blogService from "../services/blogs";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

const Home = () => {
  const [user, dispatchAuth] = useContext(AuthContext);

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });

  const blogs = result.data || [];

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    dispatchAuth({ type: "CLEAR_USER" });
  };

  const blogFormRef = useRef();
  const toggleVisibility = () => {
    blogFormRef.current.toggleVisibility();
  };

  const sortByLikes = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes);
  };

  return (
    <div>
      <h2>blogs</h2>
      <p>
        <span>{user?.name} is logged in</span>
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm toggleVisibility={toggleVisibility} />
      </Togglable>
      {sortByLikes(blogs).map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  );
};

export default Home;
