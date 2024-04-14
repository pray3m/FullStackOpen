import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

export const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    updateLike(state, action) {
      const id = action.payload.id;
      const updatedBlog = action.payload;
      return state.map((blog) => (blog.id === id ? updatedBlog : blog));
    },
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    deleteBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

export const { updateLike, setBlogs, appendBlog, deleteBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const savedBlog = await blogService.create(newBlog);
    dispatch(appendBlog(savedBlog));
  };
};

export default blogSlice.reducer;
