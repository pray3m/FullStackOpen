import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "../reducers/blogReducer";
import blogService from "../services/blogs";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

const Home = ({ user, setUser }) => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  console.log("Blogs : ", blogs);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  const blogFormRef = useRef();
  const toggleVisibility = () => {
    blogFormRef.current.toggleVisibility();
  };

  const updateLike = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog.id, {
        ...blog,
        likes: blog.likes + 1,
      });
      // setBlogs(blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)));
    } catch (ex) {
      console.log("error", ex);
    }
  };

  const deleteBlog = async (blog) => {
    const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
    if (!confirm) return;
    try {
      await blogService.remove(blog.id);
      // setBlogs(blogs.filter((b) => b.id !== blog.id));
    } catch (ex) {
      console.log("error", ex);
    }
  };

  if (blogs.length === 0) return null;

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
      {sortByLikes([...blogs]).map((blog) => (
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
};

export default Home;
