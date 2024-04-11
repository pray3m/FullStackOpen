const { test, after, beforeEach, describe } = require("node:test");
const assert = require("assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
let bcrypt = require("bcrypt");

const Blog = require("../models/blog");
const User = require("../models/user");

let authToken;
beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }

  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "root", passwordHash });
  const userId = user._id;

  await user.save();

  const response = await api
    .post("/api/login")
    .send({ username: "root", password: "sekret" });

  authToken = response.body.token;
});

describe("💿 Fetching blogs", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const res = await api.get("/api/blogs");

    assert.strictEqual(res.body.length, helper.initialBlogs.length);
  });

  test("the unique identifier property of blog posts is named by id", async () => {
    const res = await api.get("/api/blogs");
    assert(res.body[0].id, "id property not found");
  });

  test("a specific blog can be viewed", async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToView = blogsAtStart[0];

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.deepStrictEqual(resultBlog.body, blogToView);
  });
});

describe("🟢 Adding blogs", () => {
  test("a valid blog post can be added with token", async () => {
    const newBlog = {
      title: "How to test the post request ?",
      author: "Prem Codes",
      url: "https://premgautam.com.np",
      likes: 34,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${authToken}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

    const contents = blogsAtEnd.map((b) => b.title);
    assert(contents.includes("How to test the post request ?"));
  });

  test("adding a blog without token should return 401 Unauthorized", async () => {
    const newBlog = {
      title: "Unauthorized Blog",
      author: "Prem Codes",
      url: "https://premgautam.com.np",
      likes: 20,
    };

    await api.post("/api/blogs").send(newBlog).expect(401);
  });

  test("the likes is 0 if the likes property is missing", async () => {
    const newBlog = {
      title: "How to test the post request ?",
      author: "Prem Codes",
      url: "https://premgautam.com.np",
    };

    const res = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${authToken}`)
      .send(newBlog)
      .expect(201);
    assert.strictEqual(res.body.likes, 0);
  });

  test("creating a new blog without title and url should return 400 Bad Request", async () => {
    const newBlog = {
      author: "Prem Codes",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${authToken}`)
      .send(newBlog)
      .expect(400);
  });
});

describe("🔄 Updating blogs", () => {
  test("a blog can be updated with valid data", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = {
      ...blogToUpdate,
      title: "Updated Title",
      likes: 50,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const updatedBlogInDb = blogsAtEnd.find((b) => b.id === blogToUpdate.id);

    assert.strictEqual(updatedBlogInDb.title, "Updated Title");
    assert.strictEqual(updatedBlogInDb.likes, 50);
  });

  test("updating a blog with invalid data should return 400 Bad Request", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const invalidUpdate = {
      ...blogToUpdate,
      title: "", // Invalid title
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(invalidUpdate)
      .expect(400);
  });

  test("updating a non-existent blog should return 404 Not Found", async () => {
    const nonExistentId = "60f5f5b9c9dcd4f0c8306b97";

    const updatedBlog = {
      title: "Updated Title",
      author: "Updated Author",
      url: "https://updatedurl.com",
      likes: 50,
    };

    await api.put(`/api/blogs/${nonExistentId}`).send(updatedBlog).expect(404);
  });
});

after(async () => {
  await mongoose.connection.close();
});
