import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, updateLike, deleteBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 20,
    border: "solid",
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" };

  const handleLike = () => updateLike(blog);

  const handleRemove = () => deleteBlog(blog);

  return (
    <div style={blogStyle}>
      <h3>
        {blog.title} - {blog.author}{" "}
        <button onClick={() => setVisible(!visible)}>
          {visible ? "hide" : "view"}
        </button>
      </h3>
      <div style={showWhenVisible}>
        <a href={blog.url}>{blog.url}</a>
        <p>
          Likes : {blog.likes} <button onClick={handleLike}> 👍</button>
        </p>
        <p> added by: {blog?.user?.name} </p>
        {user.username === blog?.user?.username && (
          <button onClick={handleRemove}>remove</button>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Blog;
