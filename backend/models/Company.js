"use strict";

const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define(
    "Company",
    {
      id: {
        field: "comp_id",
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        field: "comp_name",
        type: DataTypes.STRING(60),
        validate: {
          notEmpty: {
            msg: "Name cannot be empty",
          },
        },
        unique: {
          args: true,
          msg: "Company already registered",
        },
      },
      address: {
        field: "comp_address",
        type: DataTypes.STRING(60),
      },
      createdAt: {
        field: "comp_create_at",
        type: DataTypes.DATE,
        defaultValue: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
    },
    {
      underscored: true,
    }
  );
  return Company;
};
