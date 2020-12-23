"use strict";

const chalk = require("chalk");
const db = require("../store/db");
const response = require("../network/response");

const joinInclude = [
  {
    model: db.channel,
    attributes: ["id", "name"],
  },
  { model: db.preference, attributes: ["id", "name"] },
  { model: db.city, attributes: ["id", "name"] },
  { model: db.country, attributes: ["id", "name"] },
  { model: db.region, attributes: ["id", "name"] },
  { model: db.company, attributes: ["id", "name"] },
];

const joinAttributes = [
  "id",
  "name",
  "lastname",
  "email",
  "position",
  "address",
  "interests",
  "useraccount",
];

exports.listContact = async (req, res) => {
  try {
    let contacts;
    if (req.query.email) {
      contacts = await db.contact.findOne({
        where: {
          name: req.query.email,
        },
      });
    } else {
      contacts = await db.contact.findAll({
        include: joinInclude,
        attributes: joinAttributes,
      });
    }
    if (!contacts) {
      return response.error(req, res, "Not found", 404);
    }
    response.success(req, res, contacts, 200);
  } catch (err) {
    console.error(chalk.red("ctr-contact-list"), err);
    response.error(req, res, err.message, 500);
  }
};

exports.getContact = async (req, res) => {
  try {
    const contact = await db.contact.findOne({
      where: {
        id: req.params.id,
      },
      include: joinInclude,
      attributes: joinAttributes,
    });
    if (!contact) {
      return response.success(req, res, "Not found", 404);
    }
    response.success(req, res, contact, 200);
  } catch (err) {
    console.error(chalk.red("ctr-contact-getId"), err);
    response.error(req, res, err.message, 500);
  }
};

exports.insertContact = async (req, res) => {
  try {
    const create = await db.contact.create({
      name: req.body.name,
      lastname: req.body.lastname,
      position: req.body.position,
      email: req.body.email,
      CompanyId: +req.body.companyId,
      RegionId: +req.body.regionId,
      CountryId: +req.body.countryId,
      CityId: +req.body.cityId,
      address: req.body.address,
      interests: req.body.interests,
      ChannelId: +req.body.channelId,
      useraccount: req.body.useraccount,
      PreferenceId: +req.body.preferencesId,
    });
    if (create.dataValues) {
      const contact = await db.contact.findOne({
        where: {
          id: create.dataValues.id,
        },
        include: joinInclude,
        attributes: joinAttributes,
      });
      response.success(req, res, contact, 201);
    }
  } catch (err) {
    console.error(chalk.red("ctr-contact-insert"), err);
    response.error(req, res, err.message, 500);
  }
};

exports.updatedContact = async (req, res) => {
  try {
    const contact = await db.contact.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!contact) {
      return response.error(req, res, "Not found", 404);
    }

    await db.contact.update(
      {
        name: req.body.name,
        lastname: req.body.lastname,
        position: req.body.position,
        email: req.body.email,
        CompanyId: +req.body.companyId,
        RegionId: +req.body.regionId,
        CountryId: +req.body.countryId,
        CityId: +req.body.cityId,
        address: req.body.address,
        interests: req.body.interests,
        ChannelId: +req.body.channelId,
        useraccount: req.body.useraccount,
        PreferenceId: +req.body.preferencesId,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    const contactUpdated = await db.contact.findOne({
      where: {
        id: req.params.id,
      },
      include: joinInclude,
      attributes: joinAttributes,
    });
    response.success(req, res, contactUpdated, 200);
  } catch (err) {
    console.error(chalk.red("ctr-contact-updated"), err);
    response.error(req, res, err.message, 500);
  }
};

exports.deletedContact = async (req, res) => {
  try {
    const contact = await db.contact.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!contact) {
      return response.error(req, res, "Not found", 404);
    }
    await db.contact.destroy({
      where: {
        id: req.params.id,
      },
    });
    response.success(req, res, "The contact has been removed", 200);
  } catch (err) {
    console.error(chalk.red("ctr-contact-delete"), err);
    response.error(req, res, err.message, 500);
  }
};
