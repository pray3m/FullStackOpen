import { useState, useEffect, useRef } from "react";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import blogService from "../services/blogs";
import Togglable from "./Togglable";
import PropTypes from "prop-types";

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
  const toggleVisibility = () => {
    blogFormRef.current.toggleVisibility();
  };

  const createBlog = async (blog) => {
    try {
      const savedBlog = await blogService.create(blog);
      setBlogs(blogs.concat(savedBlog));
      setSuccessMsg(
        `a new blog ${savedBlog.title} by ${savedBlog.author} added!`
      );
      setTimeout(() => {
        setSuccessMsg(null);
      }, 4000);
      toggleVisibility();
    } catch (error) {
      console.log(error);
      setErrorMsg("Failed to add blog");
      setTimeout(() => {
        setErrorMsg(null);
      }, 4000);
      console.log(error);
    }
  };

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

  const deleteBlog = async (blog) => {
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );
    if (!confirm) return;
    try {
      await blogService.remove(blog.id);
      setBlogs(blogs.filter((b) => b.id !== blog.id));
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
        <span>{user?.name} is logged in</span>
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          blogs={blogs}
          setBlogs={setBlogs}
          setErrorMsg={setErrorMsg}
          setSuccessMsg={setSuccessMsg}
          createBlog={createBlog}
        />
      </Togglable>
      {sortByLikes(blogs).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateLike={updateLike}
          deleteBlog={deleteBlog}
          user={user}
        />
      ))}
    </div>
  );
};

Home.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  setSuccessMsg: PropTypes.func.isRequired,
  setErrorMsg: PropTypes.func.isRequired,
};

export default Home;
