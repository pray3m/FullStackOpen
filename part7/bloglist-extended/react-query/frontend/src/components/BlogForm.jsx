import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import NotificationContext, { showNotification } from "../context/NotificationContext";
import blogService from "../services/blogs";

const BlogForm = ({ toggleVisibility }) => {
  const [blog, setBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const queryClient = useQueryClient();
  const [, dispatch] = useContext(NotificationContext);

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
    onError: () => {
      showNotification("failed to add blog", 5)(dispatch);
    },
  });

  const addBlog = async (e) => {
    e.preventDefault();
    newBlogMutation.mutate(blog);
    showNotification(`a new blog ${blog.title} by ${blog.author} added!`, 5)(dispatch);
    toggleVisibility();
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
