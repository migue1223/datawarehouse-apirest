"use strict";

const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define(
    "Channel",
    {
      id: {
        field: "channel_id",
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        field: "channel_name",
        type: DataTypes.STRING(60),
        unique: {
          args: true,
          msg: "Payment already registered",
        },
      },
      createdAt: {
        field: "channel_create_at",
        type: DataTypes.DATE,
        defaultValue: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
    },
    {
      underscored: true,
    }
  );
  return Channel;
};
