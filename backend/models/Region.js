"use strict";

const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const Region = sequelize.define(
    "Region",
    {
      id: {
        field: "region_id",
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        field: "region_name",
        type: DataTypes.STRING(60),
        unique: {
          args: true,
          msg: "Region already registered",
        },
      },
      createdAt: {
        field: "region_create_at",
        type: DataTypes.DATE,
        defaultValue: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
    },
    {
      underscored: true,
    }
  );
  return Region;
};
