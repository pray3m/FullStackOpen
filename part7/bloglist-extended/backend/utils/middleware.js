const logger = require("./logger");
const morgan = require("morgan");

const jwt = require("jsonwebtoken");
const User = require("../models/user");

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (authorization && authorization.startsWith("Bearer ")) {
    req.token = authorization.substring(7);
  }
  next();
};

const userExtractor = async (req, res, next) => {
  if (!req.token) {
    return res.status(401).json({ error: "token missing" });
  }
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!decodedToken) {
    return res.status(401).json({ error: "token invalid" });
  }
  req.user = await User.findById(decodedToken.id);
  next();
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return res.status(400).json({ error: "expected `username` to be unique" });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "token missing or invalid" });
  }
  next(error);
};

module.exports = {
  unknownEndpoint,
  tokenExtractor,
  userExtractor,
  errorHandler,
};
