"use strict";

const chalk = require("chalk");

function errorHandler(err, req, res, next) {
  console.log(err);
  if (res.headersSent) {
    console.log(err);
    return next(err);
  }
  console.log(chalk.red("error", err));
  res.status(500);
  res.send("Internal Server Error");
}

module.exports = errorHandler;
