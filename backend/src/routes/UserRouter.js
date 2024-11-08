const express = require('express');
const routes = express.Router();
const userController = require('../controllers/UserController');
routes.post('/', userController.createUser);

module.exports = routes;
