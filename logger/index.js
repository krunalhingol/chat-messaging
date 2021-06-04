const config = require("config");
const logManager = require("./log-manager");

logManager.configure(config.get("chatServer.logging"));
const logger = logManager.logger(__filename);

module.exports = logger;
