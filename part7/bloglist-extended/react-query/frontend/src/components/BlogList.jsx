import { useContext, useRef } from "react";
import blogService from "../services/blogs";
import Blog from "./Blog";
import Togglable from "./Togglable";

import { useQuery } from "@tanstack/react-query";
import BlogForm from "./BlogForm";
import AuthContext from "../AuthContext";

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

  return (
    <div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm toggleVisibility={toggleVisibility} />
      </Togglable>
      {sortByLikes(blogs).map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  );
};

export default BlogList;
