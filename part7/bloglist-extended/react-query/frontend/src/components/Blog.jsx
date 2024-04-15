import { useState } from "react";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false);
  const queryClient = useQueryClient();

  const updateLikeMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
  });

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 20,
    border: "solid",
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 5,
  };

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    updateLikeMutation.mutate(updatedBlog);
  };

  const handleRemove = () => {
    const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
    if (!confirm) return;

    deleteBlogMutation.mutate(blog.id);
  };

  return (
    <div style={blogStyle}>
      <h3>
        <p id='blog-title'>
          {blog.title} - {blog.author}
        </p>
        <button onClick={() => setVisible(!visible)}>{visible ? "hide" : "view"}</button>
      </h3>
      {visible && (
        <div className='hidden-content'>
          <a href={blog.url}>{blog.url}</a>
          <p>
            Likes : {blog.likes}
            <button onClick={handleLike} data-testid='like-btn'>
              👍
            </button>
          </p>
          <p> added by: {blog?.user?.name} </p>
          {user.username === blog?.user?.username && <button onClick={handleRemove}>remove</button>}
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object,
};

export default Blog;
