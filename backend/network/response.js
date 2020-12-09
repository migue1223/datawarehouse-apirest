"use strict";

exports.success = function (req, res, message, status) {
  let statusCode = status || 200;
  let statusMessage = message || "";
  res.status(status).send({
    status: status,
    data: message,
  });
};

exports.error = function (req, res, message, status) {
  let statusCode = status || 500;
  let statusMessage = message || "Internal server error";
  res.status(status).send({
    status: status,
    data: message,
  });
};
