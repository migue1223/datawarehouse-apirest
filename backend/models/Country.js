"use strict";

const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define(
    "Country",
    {
      id: {
        field: "country_id",
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        field: "country_name",
        type: DataTypes.STRING(60),
        unique: {
          args: true,
          msg: "Country already registered",
        },
      },
      createdAt: {
        field: "country_create_at",
        type: DataTypes.DATE,
        defaultValue: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
    },
    {
      underscored: true,
    }
  );
  return Country;
};
