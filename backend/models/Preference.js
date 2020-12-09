"use strict";

const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const Preference = sequelize.define(
    "Preference",
    {
      id: {
        field: "pref_id",
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        field: "pref_name",
        type: DataTypes.STRING(60),
        unique: {
          args: true,
          msg: "Payment already registered",
        },
      },
      createdAt: {
        field: "pref_create_at",
        type: DataTypes.DATE,
        defaultValue: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
    },
    {
      underscored: true,
    }
  );
  return Preference;
};
