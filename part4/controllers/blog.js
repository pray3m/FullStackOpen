const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (req, res) => {
  Blog.find({}).then((blog) => res.json(blog));
});

blogsRouter.get("/:id", (req, res, next) => {
  Blog.findById(req.params.id)
    .then((blog) => {
      if (blog) {
        res.json(blog);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

blogsRouter.post("/", (req, res, next) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((savedBlog) => res.json(savedBlog))
    .catch((error) => next(error));
});

module.exports = blogsRouter;
