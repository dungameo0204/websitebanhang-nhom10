const express = require("express");
const router = express.Router();
const cartController = require('../controllers/CartController');
const { authUserMiddleware } = require('../middleware/authMiddleware');

router.post('/create/:id', cartController.createCart);
router.get('/detail/:id', authUserMiddleware, cartController.getCart);
router.post('/update/changeItem/:id', authUserMiddleware, cartController.changeCartItem);
router.post('/update/removeItem/:id', authUserMiddleware, cartController.removeCartItem);
router.delete('/delete/:id', authUserMiddleware, cartController.deleteCart); 

module.exports = router;