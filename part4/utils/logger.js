const info = (...params) => {
  console.log("\x1b[34m", ...params, "\x1b[0m"); // Blue color
};

const error = (...params) => {
  console.log("\x1b[31m", ...params, "\x1b[0m"); // Red color
};

module.exports = {
  info,
  error,
};
