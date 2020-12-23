"use strict";

const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    "Contact",
    {
      id: {
        field: "contact_id",
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        field: "contact_name",
        type: DataTypes.STRING(60),
      },
      lastname: {
        field: "contact_lastname",
        type: DataTypes.STRING(60),
      },
      email: {
        field: "contact_email",
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
      position: {
        field: "contact_position",
        type: DataTypes.STRING(20),
      },
      address: {
        field: "contact_address",
        type: DataTypes.STRING(60),
      },
      interests: {
        field: "contact_interests",
        type: DataTypes.STRING(10),
      },
      useraccount: {
        field: "contact_user",
        type: DataTypes.STRING(60),
      },
      createdAt: {
        field: "contact_created_at",
        type: DataTypes.DATE,
        defaultValue: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
    },
    {
      underscored: true,
    }
  );
  return Contact;
};
