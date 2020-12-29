const express = require('express');
const router = express.Router();
const secure = require('../auth/secure');

const { body } = require('express-validator');

//import controller
const authController = require('../controllers/authController');
const channelController = require('../controllers/channelController');
const cityController = require('../controllers/cityController');
const companyController = require('../controllers/companyController');
const contactController = require('../controllers/contactController');
const countryController = require('../controllers/countryController');
const preferenceController = require('../controllers/preferenceController');
const regionController = require('../controllers/regionController');
const userController = require('../controllers/userController');

module.exports = function () {
  //auth
  router.post('/login', authController.login);

  //channel
  router.get('/channels', secure('isEnable'), channelController.listChannel);
  router.get('/channels/:id', secure('isEnable'), channelController.getChannel);
  router.post('/channels', secure('isEnable'), channelController.insertChannel);
  router.put(
    '/channels/:id',
    secure('isEnable'),
    channelController.updatedChannel
  );
  router.delete(
    '/channels/:id',
    secure('isAdmin'),
    channelController.deletedChannel
  );

  //city
  router.get('/cities', secure('isEnable'), cityController.listCity);
  router.get('/cities/:id', secure('isEnable'), cityController.getCity);
  router.post('/cities', secure('isEnable'), cityController.insertCity);
  router.put('/cities/:id', secure('isEnable'), cityController.updatedCity);
  router.delete('/cities/:id', secure('isEnable'), cityController.deletedCity);

  //company
  router.get('/companies', secure('isEnable'), companyController.listCompany);
  router.get('/companies/:id', secure('isEnable'), companyController.getCompany);
  router.post('/companies', secure('isEnable'), companyController.insertCompany);
  router.put(
    '/companies/:id',
    secure('isEnable'),
    companyController.updatedCompany
  );
  router.delete(
    '/companies/:id',
    secure('isEnable'),
    companyController.deletedCompany
  );

  //contact
  router.get('/contacts', secure('isEnable'), contactController.listContact);
  router.get('/contacts/:id', secure('isEnable'), contactController.getContact);
  router.post('/contacts', secure('isEnable'), contactController.insertContact);
  router.put(
    '/contacts/:id',
    secure('isEnable'),
    contactController.updatedContact
  );
  router.delete(
    '/contacts/:id',
    secure('isEnable'),
    contactController.deletedContact
  );

  //country
  router.get('/countries', secure('isEnable'), countryController.listCountry);
  router.get('/countries/:id', secure('isEnable'), countryController.getCountry);
  router.post('/countries', secure('isEnable'), countryController.insertCountry);
  router.put(
    '/countries/:id',
    secure('isEnable'),
    countryController.updatedCountry
  );
  router.delete(
    '/countries/:id',
    secure('isEnable'),
    countryController.deletedCountry
  );

  //preferences
  router.get(
    '/preferences',
    secure('isEnable'),
    preferenceController.listPreference
  );
  router.get(
    '/preferences/:id',
    secure('isEnable'),
    preferenceController.getPreference
  );
  router.post(
    '/preferences',
    secure('isEnable'),
    preferenceController.insertPreference
  );
  router.put(
    '/preferences/:id',
    secure('isEnable'),
    preferenceController.updatedPreference
  );
  router.delete(
    '/preferences/:id',
    secure('isEnable'),
    preferenceController.deletedPreference
  );

  //region
  router.get('/regions', secure('isEnable'), regionController.listRegion);
  router.get('/regions/:id', secure('isEnable'), regionController.getRegion);
  router.post('/regions', secure('isEnable'), regionController.insertRegion);
  router.put('/regions/:id', secure('isEnable'), regionController.updatedRegion);
  router.delete(
    '/regions/:id',
    secure('isEnable'),
    regionController.deletedRegion
  );

  //user
  router.get('/users', secure('isAdmin'), userController.listUser);
  router.get('/users/:id', secure('isAdmin'), userController.getUser);
  router.post(
    '/users',
    body('name').not().isEmpty().trim().escape(),
    body('lastname').not().isEmpty().trim().escape(),
    body('email').isEmail(),
    body('rol').not().isEmpty().trim().escape(),
    userController.insertUser
  );
  router.put(
    '/users/:id',
    secure('isEnable'),
    body('name').not().isEmpty().trim().escape(),
    body('lastname').not().isEmpty().trim().escape(),
    body('email').isEmail(),
    body('rol').not().isEmpty().trim().escape(),
    userController.updateUser
  );
  router.delete('/users/:id', secure('isAdmin'), userController.deletedUser);

  return router;
};
