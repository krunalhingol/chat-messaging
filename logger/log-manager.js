const { createLogger, format, transports } = require("winston");
const fs = require("fs");
const path = require("path");
let logFilename;
let logLevel;
let logTransports;

/**
 *Configures settings required by logger like - LogDirectory, LogFile, LogLevel
 *
 * @param {*} configuration
 */
const configure = (configuration) => {
  // Create the log directory if it does not exist
  if (!fs.existsSync(configuration.logDir)) {
    fs.mkdirSync(configuration.logDir);
  }

  logFilename = path.join(configuration.logDir, configuration.logFileName);
  logLevel = configuration.logLevel;
  logTransports = configuration.transports;
};

/**
 *Based on configuration settings provided in configure() function creates and returns logger object.
 *
 * @param {*} caller
 * @returns {*} Logger object
 */
const logger = (caller) => {
  const allTransports = [];
  logTransports.forEach((element) => {
    allTransports.push(
      new transports[element]({
        filename: logFilename,
        format: format.combine(
          format.colorize(),
          format.printf((info) => {
            return `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`;
          }),
        ),
      }),
    );
  });

  return createLogger({
    level: logLevel,
    format: format.combine(
      format.label({ label: path.basename(caller) }),
      format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    ),
    transports: allTransports,
  });
};

module.exports = {
  logger,
  configure,
};
