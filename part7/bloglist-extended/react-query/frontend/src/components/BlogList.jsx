import { useContext, useRef } from "react";
import blogService from "../services/blogs";
import Blog from "./Blog";
import Togglable from "./Togglable";

import { useQuery } from "@tanstack/react-query";
import BlogForm from "./BlogForm";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

const BlogList = () => {
  const [user] = useContext(AuthContext);

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });

  const blogs = result.data || [];

  const blogFormRef = useRef();
  const toggleVisibility = () => {
    blogFormRef.current.toggleVisibility();
  };

  const sortByLikes = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 20,
    border: "solid",
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 5,
  };

  return (
    <div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm toggleVisibility={toggleVisibility} />
      </Togglable>
      {sortByLikes(blogs).map((blog) => (
        <div key={blog.id} style={blogStyle}>
          <p id='blog-title'>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} - {blog.author}
            </Link>
          </p>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
