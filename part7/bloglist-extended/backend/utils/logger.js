const info = (...params) => {
  if (process.env.NODE_ENV !== "test")
    console.log("\x1b[34m", ...params, "\x1b[0m"); // Blue color
};

const error = (...params) => {
  if (process.env.NODE_ENV !== "test")
    console.log("\x1b[31m", ...params, "\x1b[0m"); // Red color
};

module.exports = {
  info,
  error,
};
