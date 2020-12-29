'use strict';

const chalk = require('chalk');
const db = require('../store/db');
const response = require('../network/response');

exports.listRegion = async (req, res) => {
  try {
    let regions;
    if (req.query.name) {
      regions = await db.region.findOne({
        where: {
          region_name: req.query.name,
        },
      });
    } else {
      regions = await db.region.findAll({
        order: [['region_name', 'ASC']],
      });
    }
    if (!regions) {
      response.error(req, res, 'Not found', 404);
    }
    response.success(req, res, regions, 200);
  } catch (err) {
    console.error(chalk.red('ctr-region-list'), err);
    response.error(req, res, err.message, 500);
  }
};

exports.getRegion = async (req, res) => {
  try {
    const region = await db.region.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!region) {
      return response.success(req, res, 'Not found', 404);
    }
    response.success(req, res, region, 200);
  } catch (err) {
    console.error(chalk.red('ctr-region-getId'), err);
    response.error(req, res, err.message, 500);
  }
};

exports.insertRegion = async (req, res) => {
  try {
    const { name } = req.body;

    const create = await db.region.create({
      name,
    });
    if (create.dataValues) {
      response.success(req, res, create, 201);
    }
  } catch (err) {
    console.error(chalk.red('ctr-region-insert'), err);
    response.error(req, res, err.message, 500);
  }
};

exports.updatedRegion = async (req, res) => {
  try {
    const region = await db.region.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!region) {
      return response.error(req, res, 'Not found', 404);
    }
    const { name } = req.body;
    await db.region.update(
      {
        name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    const regionUpdated = await db.region.findOne({
      where: {
        id: req.params.id,
      },
    });
    response.success(req, res, regionUpdated, 200);
  } catch (err) {
    console.error(chalk.red('ctr-region-updated'), err);
    response.error(req, res, err.message, 500);
  }
};

exports.deletedRegion = async (req, res) => {
  try {
    const region = await db.region.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!region) {
      return response.error(req, res, 'Not found', 404);
    }
    await db.region.destroy({
      where: {
        id: req.params.id,
      },
    });
    response.success(req, res, 'The region has been removed', 200);
  } catch (err) {
    console.error(chalk.red('ctr-region-delete'), err);
    response.error(req, res, err.message, 500);
  }
};
