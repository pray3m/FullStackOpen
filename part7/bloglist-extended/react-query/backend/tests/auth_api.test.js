const { test, after, beforeEach, describe } = require("node:test");
const assert = require("assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const helper = require("./test_helper");
const User = require("../models/user");
const app = require("../app");
const api = supertest(app);

describe("LOGIN API Test", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("login succeeds with a valid username and password", async () => {
    const loginUser = {
      username: "root",
      password: "sekret",
    };

    const response = await api
      .post("/api/login")
      .send(loginUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(typeof response.body.token, "string");
    assert.strictEqual(response.body.username, "root");
  });

  test("login fails with 401 status and error message for invalid credentials", async () => {
    const invalidLogin = {
      username: "user",
      password: "wrongpassword",
    };

    const response = await api
      .post("/api/login")
      .send(invalidLogin)
      .expect(401)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.error, "invalid username or password");
  });

  test("login fails with 401 status and error message for non-existent username", async () => {
    const invalidUsername = {
      username: "nobody",
      password: "doesntmatter",
    };

    const response = await api
      .post("/api/login")
      .send(invalidUsername)
      .expect(401)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.error, "invalid username or password");
  });
});

after(async () => {
  await mongoose.connection.close();
});
