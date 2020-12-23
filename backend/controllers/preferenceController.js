"use strict";

const chalk = require("chalk");
const db = require("../store/db");
const response = require("../network/response");

exports.listPreference = async (req, res) => {
  try {
    const preferences = await db.preference.findAll();
    response.success(req, res, preferences, 200);
  } catch (err) {
    console.error(chalk.red("ctr-preference-list"), err);
    response.error(req, res, err.message, 500);
  }
};

exports.getPreference = async (req, res) => {
  try {
    const preference = await db.preference.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!preference) {
      return response.success(req, res, "Not found", 404);
    }
    response.success(req, res, preference, 200);
  } catch (err) {
    console.error(chalk.red("ctr-preference-getId"), err);
    response.error(req, res, err.message, 500);
  }
};

exports.insertPreference = async (req, res) => {
  try {
    const { name } = req.body;

    const create = await db.preference.create({
      name,
    });
    if (create.dataValues) {
      response.success(req, res, create, 201);
    }
  } catch (err) {
    console.error(chalk.red("ctr-preference-insert"), err);
    response.error(req, res, err.message, 500);
  }
};

exports.updatedPreference = async (req, res) => {
  try {
    const preference = await db.preference.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!preference) {
      return response.error(req, res, "Not found", 404);
    }
    const { name } = req.body;
    await db.preference.update(
      {
        name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    const preferenceUpdated = await db.preference.findOne({
      where: {
        id: req.params.id,
      },
    });
    response.success(req, res, preferenceUpdated, 200);
  } catch (err) {
    console.error(chalk.red("ctr-preference-updated"), err);
    response.error(req, res, err.message, 500);
  }
};

exports.deletedPreference = async (req, res) => {
  try {
    const preference = await db.preference.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!preference) {
      return response.error(req, res, "Not found", 404);
    }
    await db.preference.destroy({
      where: {
        id: req.params.id,
      },
    });
    response.success(req, res, "The preference has been removed", 200);
  } catch (err) {
    console.error(chalk.red("ctr-preference-delete"), err);
    response.error(req, res, err.message, 500);
  }
};
