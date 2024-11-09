const express = require('express');
const routes = express.Router();
const userController = require('../controllers/UserController');
routes.post('/sign-up', userController.createUser);
routes.post('/sign-in', userController.loginUser);
routes.put('/update-user/:id', userController.updateUser);
routes.post('/refresh-token', userController.refreshToken);
module.exports = routes;
