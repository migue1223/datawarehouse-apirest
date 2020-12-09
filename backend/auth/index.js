"use strict";

const jwt = require("jsonwebtoken");
const config = require("../config");
const response = require("../network/response");
const error = require("../utils/error");

const secret = config.jwt.secret;

function sign(data) {
  return jwt.sign(data, secret);
}

function verify(token) {
  return jwt.verify(token, secret);
}

const check = {
  isAdmin: function (req, res) {
    const decoded = decodeHeader(req, res);
    if (+decoded.isAdmin !== 1) {
      response.error(req, res, "Unauthorized, contact the administrator", 401);
    }
  },
  isEnable: function (req, res) {
    const decoded = decodeHeader(req, res);
    if (+decoded.active !== 1) {
      response.error(req, res, "Inactive user contact administrator", 401);
    }
  },
  logged: function (req, res) {
    const decoded = decodeHeader(req, res);
  },
  updated: function (req, res) {
    const decoded = decodeHeader(req, res);
    if (+decoded.id !== +req.params.id) {
      response.error(req, res, "You can not do this", 401);
    }
  },
};

function getToken(auth) {
  if (!auth) {
    throw error("No token comes", 401);
  }
  if (auth.indexOf("Bearer ") === -1) {
    throw error("Invalid format", 401);
  }
  let token = auth.replace("Bearer ", "");
  return token;
}

function decodeHeader(req, res) {
  const authorization = req.headers.authorization || "";
  const token = getToken(authorization);
  const decoded = verify(token);
  req.user = decoded;
  return decoded;
}

module.exports = {
  sign,
  check,
};
