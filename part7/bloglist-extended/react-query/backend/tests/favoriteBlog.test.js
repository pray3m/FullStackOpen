const { test, describe } = require("node:test");
const assert = require("assert");

const listHelper = require("../utils/list_helper");

describe("favorite blog", () => {
  test("should display the blog with most likes", () => {
    const blogs = [
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        likes: 5,
      },
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12,
      },
      {
        title: "First class tests",
        author: "Robert C. Martin",
        likes: 10,
      },
      {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        likes: 0,
      },
      {
        title: "Type wars",
        author: "Robert C. Martin",
        likes: 2,
      },
    ];
    const result = listHelper.favoriteBlog(blogs);
    const expected = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    };
    assert.deepStrictEqual(result, expected);
  });

  test("should return null for an empty list", () => {
    const blogs = [];
    const result = listHelper.favoriteBlog(blogs);
    assert.strictEqual(result, null);
  });

  test("should return the only blog when there's only one blog in the list", () => {
    const blogs = [
      {
        title: "The Only Blog",
        author: "Single Author",
        likes: 15,
      },
    ];
    const result = listHelper.favoriteBlog(blogs);
    assert.deepStrictEqual(result, blogs[0]);
  });

  test("should return the first blog with most likes when multiple blogs have the same number of likes", () => {
    const blogs = [
      {
        title: "First Blog",
        author: "Author A",
        likes: 10,
      },
      {
        title: "Second Blog",
        author: "Author B",
        likes: 15,
      },
      {
        title: "Third Blog",
        author: "Author C",
        likes: 15,
      },
    ];
    const result = listHelper.favoriteBlog(blogs);
    const expected = {
      title: "Second Blog",
      author: "Author B",
      likes: 15,
    };
    assert.deepStrictEqual(result, expected);
  });
});
