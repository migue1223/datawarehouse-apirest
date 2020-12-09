"use strict";

const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define(
    "City",
    {
      id: {
        field: "city_id",
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        field: "city_name",
        type: DataTypes.STRING(60),
        unique: {
          args: true,
          msg: "Payment already registered",
        },
      },
      createdAt: {
        field: "city_create_at",
        type: DataTypes.DATE,
        defaultValue: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
    },
    {
      underscored: true,
    }
  );
  return City;
};
