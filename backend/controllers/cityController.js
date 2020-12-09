"use strict";

const chalk = require("chalk");
const db = require("../store/db");
const response = require("../network/response");

exports.listCity = async (req, res) => {
  try {
    const citys = await db.city.findAll({
      include: [
        {
          model: db.country,
          attributes: ["id", "name"],
          include: [{ model: db.region, attributes: ["id", "name"] }],
        },
      ],
      attributes: ["id", "name"],
    });
    response.success(req, res, citys, 200);
  } catch (err) {
    console.error(chalk.red("ctr-city-list"), err);
    response.error(req, res, err.message, 500);
  }
};

exports.getCity = async (req, res) => {
  try {
    const city = await db.city.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: db.country,
          attributes: ["id", "name"],
          include: [{ model: db.region, attributes: ["id", "name"] }],
        },
      ],
      attributes: ["id", "name"],
    });

    if (!city) {
      return response.error(req, res, "Not found", 404);
    }
    response.success(req, res, city, 200);
  } catch (err) {
    console.error(chalk.red("ctr-city-getId"), err);
    response.error(req, res, err.message, 500);
  }
};

exports.insertCity = async (req, res) => {
  try {
    const { name, countryId } = req.body;

    const country = await db.country.findOne({
      where: {
        id: req.body.countryId,
      },
    });
    if (!country) {
      return response.error(req, res, "Not country found", 404);
    }

    const create = await db.city.create({
      name,
      CountryId: countryId,
    });

    if (create.dataValues) {
      const city = await db.city.findOne({
        where: {
          id: create.dataValues.id,
        },
        include: [
          {
            model: db.country,
            attributes: ["id", "name"],
            include: [{ model: db.region, attributes: ["id", "name"] }],
          },
        ],
        attributes: ["id", "name"],
      });
      response.success(req, res, city, 201);
    }
  } catch (err) {
    console.error(chalk.red("ctr-city-insert"), err);
    response.error(req, res, err.message, 500);
  }
};

exports.updatedCity = async (req, res) => {
  try {
    const city = await db.city.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!city) {
      return response.error(req, res, "Not found", 404);
    }
    
    const country = await db.country.findOne({
      where: {
        id: req.body.countryId,
      },
    });
    if (!country) {
      return response.error(req, res, "Not country found", 404);
    }

    const { name, countryId } = req.body;
    await db.city.update(
      {
        name,
        CountryId: countryId,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    const cityUpdated = await db.city.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: db.country,
          attributes: ["id", "name"],
          include: [{ model: db.region, attributes: ["id", "name"] }],
        },
      ],
      attributes: ["id", "name"],
    });
    response.success(req, res, cityUpdated, 200);
  } catch (err) {
    console.error(chalk.red("ctr-city-updated"), err);
    response.error(req, res, err.message, 500);
  }
};

exports.deletedCity = async (req, res) => {
  try {
    const city = await db.city.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!city) {
      response.error(req, res, "Not found", 404);
    }
    await db.city.destroy({
      where: {
        id: req.params.id,
      },
    });
    response.success(req, res, "The city has been removed", 200);
  } catch (err) {
    console.error(chalk.red("ctr-city-delete"), err);
    response.error(req, res, err.message, 500);
  }
};