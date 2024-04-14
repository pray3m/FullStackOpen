import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs, removeBlog } from "../reducers/blogReducer";
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
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  );
};

Home.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default Home;
