const blogsRouter = require("express").Router();
const blog = require("../models/blog");
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

blogsRouter.delete("/:id", async (req, res, next) => {
  try {
    const result = await Blog.findByIdAndDelete(req.params.id);
    if (result) res.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.put("/:id", async (req, res, next) => {
  const { title, author, url, likes } = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        author,
        url,
        likes,
      },
      {
        new: true,
        runValidators: true,
        context: "query",
      }
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json(updatedBlog);
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
