"use strict";

const chalk = require("chalk");
const db = require("../store/db");
const response = require("../network/response");

exports.listCompany = async (req, res) => {
  try {
    const companys = await db.company.findAll({
      include: [
        {
          model: db.city,
          attributes: ["id", "name"],
          include: [
            {
              model: db.country,
              attributes: ["id", "name"],
              include: [{ model: db.region, attributes: ["id", "name"] }],
            },
          ],
        },
      ],
      attributes: ["id", "name", "address"],
    });
    response.success(req, res, companys, 200);
  } catch (err) {
    console.error(chalk.red("ctr-company-list"), err);
    response.error(req, res, err.message, 500);
  }
};

exports.getCompany = async (req, res) => {
  try {
    const company = await db.company.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: db.city,
          attributes: ["id", "name"],
          include: [
            {
              model: db.country,
              attributes: ["id", "name"],
              include: [{ model: db.region, attributes: ["id", "name"] }],
            },
          ],
        },
      ],
      attributes: ["id", "name", "address"],
    });
    if (!company) {
      return response.success(req, res, "Not found", 404);
    }
    response.success(req, res, company, 200);
  } catch (err) {
    console.error(chalk.red("ctr-company-getId"), err);
    response.error(req, res, err.message, 500);
  }
};

exports.insertCompany = async (req, res) => {
  try {
    const { name, address, cityId } = req.body;

    const city = await db.city.findOne({
      where: {
        id: cityId,
      },
    });

    if (!city) {
      return response.error(req, res, "Not city found", 404);
    }

    const create = await db.company.create({
      name,
      address,
      CityId: cityId,
    });
    if (create.dataValues) {
      const company = await db.company.findOne({
        where: {
          id: create.dataValues.id,
        },
        include: [
          {
            model: db.city,
            attributes: ["id", "name"],
            include: [
              {
                model: db.country,
                attributes: ["id", "name"],
                include: [{ model: db.region, attributes: ["id", "name"] }],
              },
            ],
          },
        ],
        attributes: ["id", "name", "address"],
      });
      response.success(req, res, company, 201);
    }
  } catch (err) {
    console.error(chalk.red("ctr-company-insert"), err);
    response.error(req, res, err.message, 500);
  }
};

exports.updatedCompany = async (req, res) => {
  try {
    const { name, address, cityId } = req.body;

    const company = await db.company.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!company) {
      return response.error(req, res, "Not found", 404);
    }

    const city = await db.city.findOne({
      where: {
        id: cityId,
      },
    });
    if (!city) {
      return response.error(req, res, "Not city found", 404);
    }

    await db.company.update(
      {
        name,
        address,
        CityId: cityId,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    const companyUpdated = await db.company.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: db.city,
          attributes: ["id", "name"],
          include: [
            {
              model: db.country,
              attributes: ["id", "name"],
              include: [{ model: db.region, attributes: ["id", "name"] }],
            },
          ],
        },
      ],
      attributes: ["id", "name", "address"],
    });
    response.success(req, res, companyUpdated, 200);
  } catch (err) {
    console.error(chalk.red("ctr-company-updated"), err);
    response.error(req, res, err.message, 500);
  }
};

exports.deletedCompany = async (req, res) => {
  try {
    const company = await db.company.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!company) {
      return response.error(req, res, "Not found", 404);
    }
    await db.company.destroy({
      where: {
        id: req.params.id,
      },
    });
    response.success(req, res, "The company has been removed", 200);
  } catch (err) {
    console.error(chalk.red("ctr-company-delete"), err);
    response.error(req, res, err.message, 500);
  }
};
