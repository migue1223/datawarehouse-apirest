"use strict";

const jwt = require("jsonwebtoken");
const config = require("../config");

const secret = config.jwt.secret;

function verify(token) {
  return jwt.verify(token, secret);
}

function decodeHeader(token) {
  const decoded = verify(token);
  return decoded;
}

module.exports = {
  decodeHeader,
};
