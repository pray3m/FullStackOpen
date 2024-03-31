import PropTypes from "prop-types";
import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [blog, setBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const addBlog = async (e) => {
    e.preventDefault();
    await createBlog(blog);
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
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
