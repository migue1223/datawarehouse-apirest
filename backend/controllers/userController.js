'use strict';

const db = require('../store/db');
const chalk = require('chalk');
const response = require('../network/response');
const bcrypt = require('bcrypt');

exports.listUser = async (req, res) => {
  console.log('listUser');
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
      return response.error(req, res, 'Not found', 404);
    }
    response.success(req, res, users, 200);
  } catch (err) {
    console.error(chalk.red('err-ctr-user-list'), err);
    response.error(req, res, err.message, 501);
  }
};

exports.getUser = async (req, res) => {
  console.log('getUser');
  try {
    const user = await db.user.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!user) {
      return response.error(req, res, 'Not found', 404);
    }
    response.success(req, res, user, 200);
  } catch (err) {
    console.error(chalk.red('err-ctr-user-findOne'), err);
    response.error(req, res, 'Internal Server Error', 500);
  }
};

exports.insertUser = async (req, res) => {
  try {
    const { name, lastname, email, password, rol } = req.body;
    let admin;
    rol === 'Administrador' ? (admin = 1) : (admin = 0);
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
    console.error(chalk.red('err-ctr-user-insert'), err);
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
      return response.error(req, res, 'Not Found', 404);
    }
    const { name, lastname, email, rol, password } = req.body;
    let admin, userUpdated;
    rol === 'Administrador' ? (admin = 1) : (admin = 0);
    if (req.body.email) {
      if (+req.user.isAdmin === 1) {
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
        if (password !== '') {
          await comparePassword(req.params.id, password);
        }
        userUpdated = await db.user.findOne({
          where: {
            id: req.params.id,
          },
        });
      } else {
        if (+req.user.id === +req.params.id) {
          await db.user.update(
            {
              name,
              lastname,
              email,
              rol: 'Empleado',
              admin,
            },
            {
              where: {
                id: req.user.id,
              },
            }
          );
          if (password !== '') {
            await comparePassword(req.user.id, password);
          }
          userUpdated = await db.user.findOne({
            where: {
              id: req.user.id,
            },
          });
        } else {
          response.error(req, res, 'You can not do this', 401);
        }
      }
      response.success(req, res, userUpdated, 200);
    } else {
      if (req.query) {
        if (+req.user.isAdmin === 1) {
          if (req.query.enable || req.query.admin) {
            const userQuery = await updateUserQuery(req);
            response.success(req, res, userQuery, 200);
          } else {
            response.error(req, res, 'You can not do this', 401);
          }
        } else {
          response.error(req, res, 'You can not do this', 401);
        }
      }
    }
  } catch (err) {
    console.error(chalk.red('err-ctr-user-update'), err);
    response.error(req, res, err.message, 500);
  }
};

async function updateUserQuery(req) {
  let updated;
  if (req.query.enable) {
    updated = await db.user.update(
      {
        enable: req.query.enable,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
  }
  if (req.query.admin) {
    updated = await db.user.update(
      {
        admin: req.query.admin,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
  }
  if (req.query.password) {
    updated = await comparePassword(req.params.id, req.query.password);
  }
  const user = await db.user.findOne({
    where: { id: req.params.id },
  });
  return user;
}

exports.deletedUser = async (req, res) => {
  try {
    const user = await db.user.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!user) {
      return response.error(req, res, 'Not Found', 404);
    }
    await db.user.destroy({
      where: {
        id: req.params.id,
      },
    });
    response.success(req, res, 'User has been deleted', 200);
  } catch (err) {
    console.error(chalk.red('err-ctr-user-deleted'), err);
    response.error(req, res, err.message, 500);
  }
};

async function comparePassword(id, password) {
  const user = await db.user.findOne({
    where: {
      id: id,
    },
    include: [{ model: db.auth }],
  });
  const isEqual = await bcrypt.compareSync(
    password,
    user.dataValues.Auths[0].password
  );
  if (!isEqual) {
    const hashPass = await bcrypt.hash(password, bcrypt.genSaltSync(10));
    await db.auth.update(
      {
        password: hashPass,
      },
      {
        where: {
          UserId: id,
        },
      }
    );
  }
}
