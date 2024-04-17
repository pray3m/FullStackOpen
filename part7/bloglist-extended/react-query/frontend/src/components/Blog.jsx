import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import blogService from "../services/blogs";
import WithTopSection from "./WithTopSection";
import Comment from "./Comment";

const Blog = () => {
  const queryClient = useQueryClient();

  const { id } = useParams();

  const result = useQuery({
    queryKey: ["blogs", id],
    queryFn: () => blogService.getById(id),
  });

  const blog = result.data || {};

  const [user] = useContext(AuthContext);

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
    <WithTopSection>
      <div style={blogStyle}>
        <h3>{blog.title}</h3>
        <p> author : {blog.author}</p>
        <a href={blog.url}>{blog.url}</a>
        <p>
          Likes : {blog.likes}
          <button onClick={handleLike} data-testid='like-btn'>
            👍
          </button>
        </p>
        <p> added by: {blog?.user?.name} </p>
        {user?.username === blog?.user?.username && <button onClick={handleRemove}>remove</button>}
        <Comment blog={blog} />
      </div>
    </WithTopSection>
  );
};

export default Blog;
