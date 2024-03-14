const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.get("/:id", async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.post("/", async (req, res, next) => {
  const { title, author, url, likes } = req.body;

  if (!title || !url) {
    return res.status(400).json({ error: "Title and url are required" });
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
  });

  try {
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
