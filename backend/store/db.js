'use strict';

const config = require('../config/');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  config.mysql.database,
  config.mysql.user,
  config.mysql.password,
  {
    host: config.mysql.host,
    port: config.mysql.port,
    dialect: 'mysql',
    charset: 'utf8',
    collate: 'utf8_general_ci',
    loggin: true,
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
    timezone: '+05:30',
    define: {
      timestamps: false,
      underscored: true,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.auth = require('../models/Auth')(sequelize, Sequelize);
db.user = require('../models/User')(sequelize, Sequelize);
db.channel = require('../models/Channel')(sequelize, Sequelize);
db.city = require('../models/City')(sequelize, Sequelize);
db.company = require('../models/Company')(sequelize, Sequelize);
db.contact = require('../models/Contact')(sequelize, Sequelize);
db.country = require('../models/Country')(sequelize, Sequelize);
db.preference = require('../models/Preference')(sequelize, Sequelize);
db.region = require('../models/Region')(sequelize, Sequelize);

db.auth.belongsTo(db.user, { onDelete: 'CASCADE' });
db.user.hasMany(db.auth);

db.company.belongsTo(db.region);
db.region.hasMany(db.company);
db.company.belongsTo(db.country);
db.country.hasMany(db.company);
db.company.belongsTo(db.city);
db.city.hasMany(db.company);

db.country.belongsTo(db.region, { onDelete: 'CASCADE' });
db.region.hasMany(db.country);

db.city.belongsTo(db.country, { onDelete: 'CASCADE' });
db.country.hasMany(db.city);

db.contact.belongsTo(db.channel);
db.channel.hasMany(db.contact);
db.contact.belongsTo(db.preference);
db.preference.hasMany(db.contact);
db.contact.belongsTo(db.region);
db.region.hasMany(db.contact);
db.contact.belongsTo(db.country);
db.country.hasMany(db.contact);
db.contact.belongsTo(db.city);
db.city.hasMany(db.contact);
db.contact.belongsTo(db.company);
db.company.hasMany(db.contact);

module.exports = db;
