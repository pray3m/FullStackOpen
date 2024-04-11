const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
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

blogsRouter.post("/", userExtractor, async (req, res, next) => {
  const { title, author, url, likes } = req.body;

  if (!title || !url) {
    return res.status(400).json({ error: "Title and url are required" });
  }

  try {
    const user = req.user;

    const blog = new Blog({
      title,
      author,
      url,
      likes: likes || 0,
      user: user,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.status(201).json(savedBlog);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.delete("/:id", userExtractor, async (req, res, next) => {
  try {
    const blogToDelete = await Blog.findById(req.params.id);
    if (!blogToDelete) {
      return res.status(404).json({ error: "Blog not found" });
    }

    if (blogToDelete.user.toString() !== req.user._id.toString())
      return res.status(401).json({ error: "Unauthorized deletion" });

    const result = await Blog.deleteOne(blogToDelete);
    if (result.deletedCount === 1) {
      res.status(204).end();
    } else {
      res.status(400).json({ error: "Blog deletion failed" });
    }
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.put("/:id", userExtractor, async (req, res, next) => {
  const { title, author, url, likes } = req.body;

  try {
    const user = req.user;
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        author,
        url,
        likes,
        user: user,
      },
      {
        new: true,
        runValidators: true,
        context: "query",
        populate: "user",
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
