const app = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");

app.listen(config.PORT, () =>
  logger.info(`Server listening on http://localhost:${config.PORT}`)
);
