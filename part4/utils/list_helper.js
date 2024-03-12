const blog = require("../models/blog");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, blog) => (acc += blog.likes), 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  return blogs.reduce(
    (max, blog) => (blog.likes > max.likes ? blog : max),
    blogs[0]
  );
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const blogCounts = [];

  blogs.forEach((blog) => {
    const existingAuthor = blogCounts.find(
      (item) => item.author === blog.author
    );
    if (existingAuthor) {
      existingAuthor.blogs++;
    } else {
      blogCounts.push({ author: blog.author, blogs: 1 });
    }
  });

  return blogCounts.reduce(
    (blog, max) => (blog.blogs > max.blogs ? blog : max),
    blogCounts[0]
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
