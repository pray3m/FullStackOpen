import { useState, useEffect, useRef } from "react";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import blogService from "../services/blogs";
import Togglable from "./Togglable";

const Home = ({ user, setUser, setSuccessMsg, setErrorMsg }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  const blogFormRef = useRef();

  const updateLike = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog.id, {
        ...blog,
        likes: blog.likes + 1,
      });
      setBlogs(blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)));
    } catch (ex) {
      console.log("error", ex);
    }
  };

  const sortByLikes = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes);
  };

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user?.name} is logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          blogs={blogs}
          setBlogs={setBlogs}
          setErrorMsg={setErrorMsg}
          setSuccessMsg={setSuccessMsg}
          blogFormRef={blogFormRef}
        />
      </Togglable>
      {sortByLikes(blogs).map((blog) => (
        <Blog key={blog.id} blog={blog} updateLike={updateLike} />
      ))}
    </div>
  );
};

export default Home;
