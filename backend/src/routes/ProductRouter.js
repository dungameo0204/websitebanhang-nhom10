const express = require("express");
const router = express.Router();
const productController = require('../controllers/ProductController');
const { authMiddleware } = require('../middleware/authMiddleware');



router.post('/create', productController.createProduct);
router.put('/update/:id', productController.updateProduct);
router.get('/detail/:id', productController.getProductDetails);
router.get('/detail/get-all',productController.getAllProduct);
router.delete('/delete/:id',authMiddleware, productController.deleteProduct);
router.delete('/delete-many',authMiddleware, productController.deleteManyProduct);


module.exports = router;
