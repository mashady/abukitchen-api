const express = require("express");
const winston = require("winston");
const config = require("config");

const app = express();
require("./startup/logging")();
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();

port = 8000 || config.get("port");
app.listen(port, () => winston.info(`Listening on port ${port}...`));
