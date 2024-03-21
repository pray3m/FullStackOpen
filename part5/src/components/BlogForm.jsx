import React, { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({
  blogs,
  setBlogs,
  setSuccessMsg,
  setErrorMsg,
  blogFormRef,
}) => {
  const [blog, setBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const addBlog = async (e) => {
    e.preventDefault();
    blogFormRef.current.toggleVisibility();
    try {
      const savedBlog = await blogService.create(blog);
      setBlogs(blogs.concat(savedBlog));
      setSuccessMsg(
        `a new blog ${savedBlog.title} by ${savedBlog.author} added!`
      );
      setTimeout(() => {
        setSuccessMsg(null);
      }, 4000);
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
      title:
      <input
        type="text"
        name="title"
        value={blog.title}
        onChange={handleInputChange}
      />
      <br />
      author:
      <input
        type="text"
        name="author"
        value={blog.author}
        onChange={handleInputChange}
      />
      <br />
      url:
      <input
        type="text"
        name="url"
        value={blog.url}
        onChange={handleInputChange}
      />
      <br />
      <input type="submit" value="create" />
      <br />
    </form>
  );
};

export default BlogForm;
