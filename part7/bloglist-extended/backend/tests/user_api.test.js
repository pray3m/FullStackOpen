const { test, after, beforeEach, describe } = require("node:test");
const assert = require("assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");

const helper = require("./test_helper");
const User = require("../models/user");
const app = require("../app");
const api = supertest(app);

describe("USERS API Test", () => {
  describe("when there is initially one user in db", () => {
    beforeEach(async () => {
      await User.deleteMany({});

      const passwordHash = await bcrypt.hash("sekret", 10);
      const user = new User({ username: "root", passwordHash });

      await user.save();
    });

    test("creation succeeds with a fresh username", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "testuser",
        name: "Test User",
        password: "testpassword",
      };

      await api
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

      const usernames = usersAtEnd.map((u) => u.username);
      assert(usernames.includes(newUser.username));
    });

    test("creation fails with proper statuscode and message if username already taken", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "root",
        name: "Superuser",
        password: "anotherone",
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      assert(result.body.error.includes("expected `username` to be unique"));

      assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    });

    test("creation fails if the user is invalid", async () => {
      const usersAtStart = await helper.usersInDb();
      const invalidUser = {
        username: "ro", // at least 3
        name: "prem",
        password: "",
      };

      const result = await api.post("/api/users").send(invalidUser).expect(400);

      const usersAtEnd = await helper.usersInDb();
   

      assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
