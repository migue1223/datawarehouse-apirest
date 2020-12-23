"use strict";

const chalk = require("chalk");
const db = require("../store/db");
const response = require("../network/response");

exports.listChannel = async (req, res) => {
  try {
    const channels = await db.channel.findAll();
    response.success(req, res, channels, 200);
  } catch (err) {
    console.error(chalk.red("ctr-channel-list"), err);
    response.error(req, res, err.message, 500);
  }
};

exports.getChannel = async (req, res) => {
  try {
    const channel = await db.channel.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!channel) {
      return response.success(req, res, "Not found", 404);
    }
    response.success(req, res, channel, 200);
  } catch (err) {
    console.error(chalk.red("ctr-channel-getId"), err);
    response.error(req, res, err.message, 500);
  }
};

exports.insertChannel = async (req, res) => {
  try {
    const { name } = req.body;

    const create = await db.channel.create({
      name,
    });
    if (create.dataValues) {
      response.success(req, res, create, 201);
    }
  } catch (err) {
    console.error(chalk.red("ctr-channel-insert"), err);
    response.error(req, res, err.message, 500);
  }
};

exports.updatedChannel = async (req, res) => {
  try {
    const channel = await db.channel.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!channel) {
      return response.error(req, res, "Not found", 404);
    }
    const { name } = req.body;
    await db.channel.update(
      {
        name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    const channelUpdated = await db.channel.findOne({
      where: {
        id: req.params.id,
      },
    });
    response.success(req, res, channelUpdated, 200);
  } catch (err) {
    console.error(chalk.red("ctr-channel-updated"), err);
    response.error(req, res, err.message, 500);
  }
};

exports.deletedChannel = async (req, res) => {
  try {
    const channel = await db.channel.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!channel) {
      return response.error(req, res, "Not found", 404);
    }
    await db.channel.destroy({
      where: {
        id: req.params.id,
      },
    });
    response.success(req, res, "The channel has been removed", 200);
  } catch (err) {
    console.error(chalk.red("ctr-channel-delete"), err);
    response.error(req, res, err.message, 500);
  }
};
