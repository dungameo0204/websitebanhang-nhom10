const express = require('express');
const routes = express.Router();
const userController = require('../controllers/UserController');
const { authMiddleware, authUserMiddleware } = require('../middleware/authMiddleware');


routes.post('/sign-up', userController.createUser);
routes.post('/sign-in', userController.loginUser);
routes.post('/log-out', userController.logoutUser);
routes.get('/user-detail/:id', authUserMiddleware, userController.getUserDetail);
routes.put('/update-user/:id', authMiddleware, userController.updateUser);
routes.delete('/delete-user/:id', authMiddleware, userController.deleteUser);
routes.get('/get-all', authMiddleware, userController.getAllUser);
routes.post('/refresh-token', userController.refreshToken);
routes.post('/delete-many', authMiddleware, userController.deleteManyUser);
module.exports = routes;