const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const logger = require("./utils/logger");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const blogsRouter = require("./controllers/blog");

const app = express();

mongoose.set("strictQuery", false);

logger.info("Connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info("Connected to MongoDB!"))
  .catch((error) =>
    logger.error("Error connecting to MongoDB : ", error.message)
  );

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

//  Request logger
morgan.token("data", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

// API Routes
app.use("/api/blogs", blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
