"use strict";

const bcrypt = require("bcrypt");
const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const Auth = sequelize.define(
    "Auth",
    {
      id: {
        field: "auth_id",
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      password: {
        field: "auth_password",
        type: DataTypes.TEXT,
        validate: {
          notEmpty: {
            msg: "The password cannot be empty",
          },
        },
      },
      createAt: {
        field: "auth_create_at",
        type: DataTypes.DATE,
        defaultValue: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
    },
    {
      underscored: true,
    }
  );

  Auth.prototype.generateHash = function (password) {
    return bcrypt.hash(password, bcrypt.genSaltSync(10));
  };
  Auth.prototype.validPassword = function (password, hash) {
    return bcrypt.compareSync(password, hash);
  };

  return Auth;
};
