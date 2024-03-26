import { useState } from "react";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 20,
    border: "solid",
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" };

  return (
    <div style={blogStyle}>
      <h3>
        {blog.title}{" "}
        <button onClick={() => setVisible(!visible)}>
          {visible ? "hide" : "view"}
        </button>
      </h3>
      <div style={showWhenVisible}>
        <a href={blog.url}>{blog.url}</a>
        <p>
          Likes : {blog.likes} <button>👍</button>
        </p>
        <p> - {blog.author}</p>
      </div>
    </div>
  );
};

export default Blog;
