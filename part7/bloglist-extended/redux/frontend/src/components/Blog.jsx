import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { likeBlog, removeBlog } from "../reducers/blogReducer";

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();

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

  const handleLike = () => {
    dispatch(likeBlog(blog));
  };

  const handleRemove = () => {
    const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
    if (!confirm) return;
    try {
      dispatch(removeBlog(blog.id));
    } catch (ex) {
      console.log("error", ex);
    }
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
