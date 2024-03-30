import PropTypes from "prop-types";
import { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({
  blogs,
  setBlogs,
  setSuccessMsg,
  setErrorMsg,
  toggleVisibility,
}) => {
  const [blog, setBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const addBlog = async (e) => {
    e.preventDefault();
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
      setErrorMsg(error);
      setTimeout(() => {
        setErrorMsg(null);
      }, 4000);
      console.log(error);
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
        type="text"
        name="title"
        value={blog.title}
        onChange={handleInputChange}
        placeholder="title"
      />
      <br />
      <input
        type="text"
        name="author"
        value={blog.author}
        onChange={handleInputChange}
        placeholder="author"
      />
      <br />
      <input
        type="text"
        name="url"
        value={blog.url}
        onChange={handleInputChange}
        placeholder="url"
      />
      <br />
      <input type="submit" value="create" />
      <br />
    </form>
  );
};

BlogForm.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func,
  setSuccessMsg: PropTypes.func,
  setErrorMsg: PropTypes.func,
  toggleVisibility: PropTypes.func,
};

export default BlogForm;
