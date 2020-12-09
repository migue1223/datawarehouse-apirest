"use strict";

const chalk = require("chalk");
const db = require("../store/db");
const response = require("../network/response");

exports.listCountry = async (req, res) => {
  try {
    const countrys = await db.country.findAll({
      include: [{ model: db.region, attributes: ["id", "name"] }],
      attributes: ["id", "name"],
    });
    response.success(req, res, countrys, 200);
  } catch (err) {
    console.error(chalk.red("ctr-country-list"), err);
    response.error(req, res, err.message, 500);
  }
};

exports.getCountry = async (req, res) => {
  try {
    const country = await db.country.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: db.region, attributes: ["id", "name"] }],
      attributes: ["id", "name"],
    });

    if (!country) {
      return response.error(req, res, "Not found", 404);
    }
    response.success(req, res, country, 200);
  } catch (err) {
    console.error(chalk.red("ctr-country-getId"), err);
    response.error(req, res, err.message, 500);
  }
};

exports.insertCountry = async (req, res) => {
  try {
    const { name, regionId } = req.body;

    const region = await db.region.findOne({
      where: {
        id: req.body.regionId,
      },
    });
    if (!region) {
      return response.error(req, res, "Not region found", 404);
    }

    const create = await db.country.create({
      name,
      RegionId: regionId,
    });

    if (create.dataValues) {
      const country = await db.country.findOne({
        where: {
          id: create.dataValues.id,
        },
        attributes: ["id", "name"],
        include: [
          {
            model: db.region,
            attributes: ["name"],
          },
        ],
      });
      response.success(req, res, country, 201);
    }
  } catch (err) {
    console.error(chalk.red("ctr-country-insert"), err);
    response.error(req, res, err.message, 500);
  }
};

exports.updatedCountry = async (req, res) => {
  try {
    const country = await db.country.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!country) {
      return response.error(req, res, "Not found", 404);
    }
    
    const region = await db.region.findOne({
      where: {
        id: req.body.regionId,
      },
    });
    if (!region) {
      return response.error(req, res, "Not region found", 404);
    }

    const { name } = req.body;
    await db.country.update(
      {
        name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    const countryUpdated = await db.country.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "name"],
      include: [{ model: db.region, attributes: ["id", "name"] }],
    });
    response.success(req, res, countryUpdated, 200);
  } catch (err) {
    console.error(chalk.red("ctr-country-updated"), err);
    response.error(req, res, err.message, 500);
  }
};

exports.deletedCountry = async (req, res) => {
  try {
    const country = await db.country.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!country) {
      response.error(req, res, "Not found", 404);
    }
    await db.country.destroy({
      where: {
        id: req.params.id,
      },
    });
    response.success(req, res, "The country has been removed", 200);
  } catch (err) {
    console.error(chalk.red("ctr-country-delete"), err);
    response.error(req, res, err.message, 500);
  }
};
