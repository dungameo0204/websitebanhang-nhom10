const express = require("express");
const router = express.Router();
const productController = require('../controllers/ProductController');
const { authMiddleware } = require('../middleware/authMiddleware');




router.post('/create', productController.createProduct);// Thêm middleware authe sau khi FE có xử lý token
router.put('/update/:id', authMiddleware, productController.updateProduct); // Thêm middleware authe sau khi FE có xử lý token
router.get('/detail/:id', productController.getDetailedProduct);
router.get('/get-all',productController.getAllProduct);
router.delete('/delete/:id', productController.deleteProduct); // Thêm middleware authe sau khi FE có xử lý token
router.delete('/delete-many',authMiddleware, productController.deleteManyProduct); 
router.get('/get-all-type', productController.getAllType); 



module.exports = router;
