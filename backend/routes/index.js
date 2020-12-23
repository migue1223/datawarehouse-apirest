const express = require("express");
const router = express.Router();
const secure = require("../auth/secure");

const { body } = require("express-validator");

//import controller
const authController = require("../controllers/authController");
const channelController = require("../controllers/channelController");
const cityController = require("../controllers/cityController");
const companyController = require("../controllers/companyController");
const contactController = require("../controllers/contactController");
const countryController = require("../controllers/countryController");
const preferenceController = require("../controllers/preferenceController");
const regionController = require("../controllers/regionController");
const userController = require("../controllers/userController");

module.exports = function () {
  //auth
  router.post("/login", authController.login);

  //channel
  router.get("/channel", secure("isEnable"), channelController.listChannel);
  router.get("/channel/:id", secure("isEnable"), channelController.getChannel);
  router.post("/channel", secure("isEnable"), channelController.insertChannel);
  router.put(
    "/channel/:id",
    secure("isEnable"),
    channelController.updatedChannel
  );
  router.delete(
    "/channel/:id",
    secure("isEnable"),
    channelController.deletedChannel
  );

  //city
  router.get("/city", secure("isEnable"), cityController.listCity);
  router.get("/city/:id", secure("isEnable"), cityController.getCity);
  router.post("/city", secure("isEnable"), cityController.insertCity);
  router.put("/city/:id", secure("isEnable"), cityController.updatedCity);
  router.delete("/city/:id", secure("isEnable"), cityController.deletedCity);

  //company
  router.get("/company", secure("isEnable"), companyController.listCompany);
  router.get("/company/:id", secure("isEnable"), companyController.getCompany);
  router.post("/company", secure("isEnable"), companyController.insertCompany);
  router.put(
    "/company/:id",
    secure("isEnable"),
    companyController.updatedCompany
  );
  router.delete(
    "/company/:id",
    secure("isEnable"),
    companyController.deletedCompany
  );

  //contact
  router.get("/contact", secure("isEnable"), contactController.listContact);
  router.get("/contact/:id", secure("isEnable"), contactController.getContact);
  router.post("/contact", secure("isEnable"), contactController.insertContact);
  router.put(
    "/contact/:id",
    secure("isEnable"),
    contactController.updatedContact
  );
  router.delete(
    "/contact/:id",
    secure("isEnable"),
    contactController.deletedContact
  );

  //country
  router.get("/country", secure("isEnable"), countryController.listCountry);
  router.get("/country/:id", secure("isEnable"), countryController.getCountry);
  router.post("/country", secure("isEnable"), countryController.insertCountry);
  router.put(
    "/country/:id",
    secure("isEnable"),
    countryController.updatedCountry
  );
  router.delete(
    "/country/:id",
    secure("isEnable"),
    countryController.deletedCountry
  );

  //preferences
  router.get(
    "/preference",
    secure("isEnable"),
    preferenceController.listPreference
  );
  router.get(
    "/preference/:id",
    secure("isEnable"),
    preferenceController.getPreference
  );
  router.post(
    "/preference",
    secure("isEnable"),
    preferenceController.insertPreference
  );
  router.put(
    "/preference/:id",
    secure("isEnable"),
    preferenceController.updatedPreference
  );
  router.delete(
    "/preference/:id",
    secure("isEnable"),
    preferenceController.deletedPreference
  );

  //region
  router.get("/region", secure("isEnable"), regionController.listRegion);
  router.get("/region/:id", secure("isEnable"), regionController.getRegion);
  router.post("/region", secure("isEnable"), regionController.insertRegion);
  router.put("/region/:id", secure("isEnable"), regionController.updatedRegion);
  router.delete(
    "/region/:id",
    secure("isEnable"),
    regionController.deletedRegion
  );

  //user
  router.get("/user", secure("isAdmin"), userController.listUser);
  router.get("/user/:id", secure("isAdmin"), userController.getUser);
  router.post(
    "/user",
    body("name").not().isEmpty().trim().escape(),
    body("lastname").not().isEmpty().trim().escape(),
    body("email").isEmail(),
    body("rol").not().isEmpty().trim().escape(),
    userController.insertUser
  );
  router.put(
    "/user/:id",
    secure("isAdmin"),
    body("name").not().isEmpty().trim().escape(),
    body("lastname").not().isEmpty().trim().escape(),
    body("email").isEmail(),
    body("rol").not().isEmpty().trim().escape(),
    userController.updateUser
  );
  router.put("/user/:id/enable", secure("isAdmin"), userController.enableUser);
  router.put("/user/:id/admin", secure("isAdmin"), userController.enableAdmin);
  router.delete("/user/:id", secure("isAdmin"), userController.deletedUser);

  return router;
};
