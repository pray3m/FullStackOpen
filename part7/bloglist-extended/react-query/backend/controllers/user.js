const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (req, res, next) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
  });
  res.json(users);
});

usersRouter.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate("blogs", {
      url: 1,
      author: 1,
      title: 1,
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).end();
    }
  } catch (ex) {
    next(ex);
  }
});

usersRouter.post("/", async (req, res, next) => {
  const { username, name, password } = req.body;
  console.log(req.body);
  if (!username || !name || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (exception) {
    next(exception);
  }
});

module.exports = usersRouter;
