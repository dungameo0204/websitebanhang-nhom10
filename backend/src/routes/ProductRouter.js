const express = require("express");
const router = express.Router();
const productController = require('../controllers/ProductController');
const { authMiddleware } = require('../middleware/authMiddleware');




router.post('/create', productController.createProduct);
router.put('/update/:id', authMiddleware, productController.updateProduct); 
router.get('/detail/:id',productController.getDetailedProduct);
router.get('/get-all',productController.getAllProduct);
router.delete('/delete/:id', authMiddleware, productController.deleteProduct); 
router.post('/delete-many',authMiddleware, productController.deleteManyProduct); 
router.get('/get-all-type', productController.getAllType); 



module.exports = router;
