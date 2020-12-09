"use strict";

const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        field: "user_id",
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        field: "user_name",
        type: DataTypes.STRING(60),
      },
      lastname: {
        field: "user_lastname",
        type: DataTypes.STRING(60),
      },
      email: {
        field: "user_email",
        type: DataTypes.STRING(60),
        validate: {
          isEmail: {
            msg: "Agrega un Correo Válido",
          },
          notEmpty: {
            msg: "El e-mail no puede ir vacio",
          },
        },
        unique: {
          args: true,
          msg: "Usuario o Email ya registrado",
        },
      },
      rol: {
        field: "user_rol",
        type: DataTypes.STRING(15),
        defaultValue: "Empleado",
      },
      admin: {
        field: "user_admin",
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      enable: {
        field: "user_enable",
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      createdAt: {
        field: "user_created_at",
        type: DataTypes.DATE,
        defaultValue: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
    },
    {
      underscored: true,
    }
  );
  return User;
};
