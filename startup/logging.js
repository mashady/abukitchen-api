const winston = require("winston");
// require('winston-mongodb');
//require("express-async-errors");

module.exports = function () {
  winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
      //
      // - Write all logs with level `error` and below to `error.log`
      // - Write all logs with level `info` and below to `combined.log`
      //
      new winston.transports.File({ filename: "error.log", level: "error" }),
      new winston.transports.File({ filename: "info.log", level: "info" }),
    ],
  });
  if (process.env.NODE_ENV !== "production") {
    winston.add(
      new winston.transports.Console({
        format: winston.format.simple(),
      })
    );
  }
};
