const express = require('express');
const routes = express.Router();
const userController = require('../controllers/UserController');
const { authMiddleware, authUserMiddleware } = require('../middleware/authMiddleware');


routes.post('/sign-up', userController.createUser);
routes.post('/sign-in', userController.loginUser);
routes.put('/update-user/:id', userController.updateUser);
routes.delete('/delete-user/:id', authMiddleware, userController.deleteUser);
routes.get('/user-detail/:id', authUserMiddleware, userController.getUserDetail);
routes.get('/get-all', authMiddleware, userController.getAllUser);
routes.post('/refresh-token', authMiddleware, userController.refreshToken);
routes.delete('/delete-many', authMiddleware, userController.deleteManyUser);
module.exports = routes;