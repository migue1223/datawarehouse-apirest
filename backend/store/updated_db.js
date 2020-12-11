"use-strict";
require("dotenv").config();
const bcrypt = require("bcrypt");

const db = require("./db");
const mysql = require("mysql");
const config = require("../config/");

const dbconf = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  port: config.mysql.port,
};

let connection;

function handleCon() {
  connection = mysql.createConnection(dbconf);

  connection.connect((err) => {
    if (err) {
      console.error("[db err]", err);
      setTimeout(handleCon, 2000);
    } else {
      console.log("DB Connected!");
    }
  });
}

handleCon();

const channels = [
  {
    channel_name: "Teléfono",
  },
  {
    channel_name: "Whatsapp",
  },
  {
    channel_name: "Instagram",
  },
  {
    channel_name: "Facebook",
  },
  {
    channel_name: "Linkedin",
  },
];

const preferences = [
  {
    pref_name: "Sin preferencia",
  },
  {
    pref_name: "Canal favorito",
  },
  {
    pref_name: "No molestar",
  },
];

const regions = [
  {
    region_name: "Suramérica",
  },
];

const country = [
  {
    country_name: "Colombia",
    region_id: 1,
  },
];

const city = [
  {
    city_name: "Medellín",
    country_id: 1,
  },
  {
    city_name: "Bogotá",
    country_id: 1,
  },
  {
    city_name: "Cali",
    country_id: 1,
  },
  {
    city_name: "Barranquilla",
    country_id: 1,
  },
  {
    city_name: "Cartagena",
    country_id: 1,
  },
];

async function insert(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

async function updatedDb(table, data) {
  data.forEach(async (item) => await insert(table, item));
}

async function createUser() {
  const user = {
    user_name: "Admin",
    user_lastname: "Admin",
    user_email: "admin@admin.com",
    user_rol: "Administrador",
    user_admin: 1,
  };
  const insertUser = await insert("users", user);
  const auth = {
    auth_password: await bcrypt.hash("admin123", bcrypt.genSaltSync(10)),
    user_id: +insertUser.insertId,
  };
  await insert("auths", auth);
}

db.sequelize
  .sync()
  .then(async () => {
    console.log("Conectado al Servidor");
    await createUser();
    await updatedDb("channels", channels);
    await updatedDb("preferences", preferences);
    await updatedDb("regions", regions);
    await updatedDb("countries", country);
    await updatedDb("cities", city);
    await connection.end();
    await db.sequelize.close();
    console.log("Desconectado del servidor");
  })
  .catch((error) => console.log(error));
