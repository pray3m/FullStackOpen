const { test, after, beforeEach } = require("node:test");
const assert = require("assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
];

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("the unique identifier property of blog posts is named by id", async () => {
  const res = await api.get("/api/blogs");
  assert(res.body[0].id, "id property not found");
});

test("a new blog post can be added", async () => {
  const newBlog = {
    title: "How to test the post request ?",
    author: "Prem Codes",
    url: "https://premgautam.com.np",
    likes: "34",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const res = await api.get("/api/blogs");

  const contents = res.body.map((r) => r.title);

  assert.strictEqual(res.body.length, initialBlogs.length + 1);

  assert(contents.includes("How to test the post request ?"));
});

test("the likes is 0 if the likes property is missing", async () => {
  const newBlog = {
    title: "How to test the post request ?",
    author: "Prem Codes",
    url: "https://premgautam.com.np",
  };

  const res = await api.post("/api/blogs").send(newBlog).expect(201);
  assert.strictEqual(res.body.likes, 0);
});

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

after(async () => {
  await mongoose.connection.close();
});
