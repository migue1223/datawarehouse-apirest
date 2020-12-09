"use strict";

const db = require("../store/db");
const chalk = require("chalk");
const response = require("../network/response");

exports.listUser = async (req, res) => {
  try {
    let users;

    if (req.query.email) {
      users = await db.user.findOne({
        where: {
          email: req.query.email,
        },
      });
    } else {
      users = await db.user.findAll();
    }
    if (!users) {
      return response.error(req, res, "Not found", 404);
    }
    response.success(req, res, users, 200);
  } catch (err) {
    console.error(chalk.red("err-ctr-user-list"), err);
    response.error(req, res, err.message, 501);
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await db.user.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!user) {
      return response.error(req, res, "Not found", 404);
    }
    response.success(req, res, user, 200);
  } catch (err) {
    console.error(chalk.red("err-ctr-user-findOne"), err);
    response.error(req, res, "Internal Server Error", 500);
  }
};

exports.insertUser = async (req, res) => {
  try {
    const { name, lastname, email, password, rol } = req.body;
    let admin;
    rol === "Administrador" ? (admin = 1) : (admin = 0);
    const create = await db.user.create({
      name,
      lastname,
      email,
      rol,
      admin,
    });
    if (create.dataValues) {
      await db.auth.create({
        password: await db.auth.prototype.generateHash(password),
        UserId: +create.dataValues.id,
      });
      response.success(req, res, create, 201);
    }
  } catch (err) {
    console.error(chalk.red("err-ctr-user-insert"), err);
    response.error(req, res, err.message, 500);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await db.user.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!user) {
      return response.error(req, res, "Not Found", 404);
    }
    const { name, lastname, email, rol, password } = req.body;
    let admin;
    rol === "Administrador" ? (admin = 1) : (admin = 0);
    await db.user.update(
      {
        name,
        lastname,
        email,
        rol,
        admin,
      },
      { where: { id: req.params.id } }
    );
    const userUpdated = await db.user.findOne({
      where: {
        id: req.params.id,
      },
    });
    response.success(req, res, userUpdated, 200);
  } catch (err) {
    console.error(chalk.red("err-ctr-user-update"), err);
    response.error(req, res, err.message, 500);
  }
};

exports.enableUser = async (req, res) => {
  try {
    const user = await db.user.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!user) {
      return response.error(req, res, "Not Found", 404);
    }
    const { enable } = req.body;
    await db.user.update(
      {
        enable,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    const userUpdated = await db.user.findOne({
      where: {
        id: req.params.id,
      },
    });
    response.success(req, res, userUpdated, 200);
  } catch (err) {
    console.error(chalk.red("err-ctr-user-enable"), err);
    response.error(req, res, err.message, 500);
  }
};

exports.enableAdmin = async (req, res) => {
  try {
    const user = await db.user.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!user) {
      return response.error(req, res, "Not Found", 404);
    }
    const { admin } = req.body;
    await db.user.update(
      {
        admin,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    const userUpdated = await db.user.findOne({
      where: {
        id: req.params.id,
      },
    });
    response.success(req, res, userUpdated, 200);
  } catch (err) {
    console.error(chalk.red("err-ctr-user-enable"), err);
    response.error(req, res, err.message, 500);
  }
};

exports.deletedUser = async (req, res) => {
  try {
    const user = await db.user.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!user) {
      return response.error(req, res, "Not Found", 404);
    }
    await db.user.destroy({
      where: {
        id: req.params.id,
      },
    });
    response.success(req, res, "User has been deleted", 200);
  } catch (err) {
    console.error(chalk.red("err-ctr-user-deleted"), err);
    response.error(req, res, err.message, 500);
  }
};
