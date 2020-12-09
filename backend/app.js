"use strict";

require("dotenv").config();
const bodyParser = require("body-parser");
const config = require("./config");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const routes = require("./routes");
const swaggerUi = require("swagger-ui-express");

const db = require("./store/db");

db.sequelize
  .sync()
  .then(() => console.log("Conectado al Servidor"))
  .catch((error) => console.log(error));

const errors = require("./network/errors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());

const swaggerDoc = require("./swagger.json");

// routes docs api
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

//routes api
app.use("/", routes());

app.use(errors);

app.listen(config.api.port, () => {
  console.log(`Api escuchando el puerto: ${config.api.port}`);
});
