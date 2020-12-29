'use strict';

const db = require('../store/db');
const chalk = require('chalk');
const jwt = require('../auth/');
const response = require('../network/response');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const getUser = await db.user.findOne({
      where: {
        email: email,
      },
      include: [
        {
          model: db.auth,
        },
      ],
    });
    if (!getUser) {
      return response.error(req, res, 'User or email does not exist', 404);
    }
    if (getUser.dataValues.enable !== 0) {
      const auth_password = getUser.Auths[0].dataValues.password;
      const result = await db.auth.prototype.validPassword(
        password,
        auth_password
      );
      if (!result) {
        return response.error(req, res, 'Incorrect password', 403);
      }
      const token = jwt.sign({
        id: getUser.dataValues.id,
        email: getUser.dataValues.email,
        isAdmin: getUser.dataValues.admin,
        active: getUser.dataValues.enable,
      });
      const user = {
        id: getUser.dataValues.id,
        email: getUser.dataValues.email,
        isAdmin: getUser.dataValues.admin,
        active: getUser.dataValues.enable,
      };
      const data = {
        token: token,
        user: user,
      };
      return response.success(req, res, data, 200);
    } else {
      return response.error(
        req,
        res,
        'Inactive user contact administrator',
        401
      );
    }
  } catch (err) {
    console.error(chalk.red('auth-ctr'), err);
    response.error(req, res, err.message, 500);
  }
};
