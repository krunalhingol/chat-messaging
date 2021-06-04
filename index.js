const express = require("express");
const config = require("config");
const bodyParser = require("body-parser");
const logger = require("./logger");

process.on("uncaughtException", (err) => {
  logger.error(
    `Exception occurred while starting rfts server.\nMessage=> ${err}\nStack=> ${err.stack}`,
  );
});

// Configure and start service
const PORT = config.get("chatServer.port") || 3334;

// create express app
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(require("cors")());
}
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// define a simple route
app.get("/", (req, res) => {
  logger.info("Welcome to chat server");
  res.json({ message: "Welcome to chat server." });
});

// listen for requests

const server = app.listen(PORT, () =>
  logger.info(`chat server is running on port: ${PORT}`),
);

module.exports = server;
