import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { showNotification } from "../reducers/notificationReducer";

const BlogForm = ({ toggleVisibility }) => {
  const dispatch = useDispatch();

  const [blog, setBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const addBlog = async (e) => {
    e.preventDefault();
    try {
      dispatch(createBlog(blog));
      dispatch(showNotification(`a new blog ${blog.title} by ${blog.author} added!`, 5));
      toggleVisibility();
    } catch (error) {
      console.log(error);
      dispatch(showNotification("Failed to add blog", 5));
    }
    setBlog({ title: "", author: "", url: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  return (
    <form onSubmit={addBlog}>
      <h2>create new</h2>
      <input
        type='text'
        name='title'
        value={blog.title}
        onChange={handleInputChange}
        placeholder='title'
      />
      <br />
      <input
        type='text'
        name='author'
        value={blog.author}
        onChange={handleInputChange}
        placeholder='author'
      />
      <br />
      <input
        type='text'
        name='url'
        value={blog.url}
        onChange={handleInputChange}
        placeholder='url'
      />
      <br />
      <input type='submit' value='create' />
      <br />
    </form>
  );
};

BlogForm.propTypes = {
  toggleVisibility: PropTypes.func.isRequired,
};

export default BlogForm;
