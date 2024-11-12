const Product = require("../models/ProductModel")
const ProductService = require("../services/ProductService")
const mongoose = require('mongoose');

const createProduct = async (req,res) => {
    try{
        const {name, image, type, price, countInStock, rating, description} = req.body

        //Nếu thiếu input thì báo input lỗi
        if(!name || !image || !type || !price || !countInStock || !rating || !description){
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }

        const response = await ProductService.createProduct(req.body);

        return res.status(200).json(response);
    }catch (error){
        return res.status(500).json({
            status: 'ERROR',
            message : error.message || 'An unexpected error occurred while creating'
        })
    }
}

const updateProduct = async (req,res) => {
    try{
        const productId = req.params.id;
        const data = req.body;
        
        //Nếu ProductID không theo cấu trúc của DB
        if(!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'ProductId is not valid'
            })
        }

        const response = await ProductService.updateProduct(productId,data);

        return res.status(200).json(response);
    }catch (error){
        return res.status(500).json({
            status: 'ERROR',
            message : error.message || 'An unexpected error occurred while updating the product'
        })
    }
}

const getProductDetails = async (req,res) => {
    try{
        //Lấy productID từ req
        const productId = req.params.id;
        
        if(!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'ProductId is not valid'
            })
        }

        const response = await ProductService.getProductDetails(productId);

        return res.status(200).json(response);
    }catch (error){
        return res.status(404).json({
            status: 'ERROR',
            message : error.message || 'An unexpected error occurred while getting product details'
        })
    }
}

const getAllProduct = async (req, res) => {
    try {        
        // Lấy chỉ số page hiện tại từ query hoặc sử dụng giá trị mặc định
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 7;

        // Lấy sort từ query
        const sortParams = req.query.sort;
      
        //lấy filter từ query
        const filterParams = req.query.filter;

        // Service lấy dữ liệu toàn bộ sản phẩm trong trang
        const response = await ProductService.getAllProduct(page, limit, sortParams,filterParams);

        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            status: 'ERROR',
            message: error.message || 'An unexpected error occurred while getting all product'
        });
    }
}

const deleteProduct = async (req,res) => {
    try{
        const productId = req.params.id;
        
        if(!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'ProductId is not valid'
            })
        }

        const response = await ProductService.deleteProduct(productId);

        return res.status(200).json(response);
    }catch (error){
        return res.status(500).json({
            status: 'ERROR',
            message : error.message || 'An unexpected error occurred while deleting product'
        })
    }
}

const deleteManyProduct = async (req,res) => {
    try{
        const ids = req.body;
        
        if(!ids || ids.length === 0) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'ProductIds is required'
            })
        }

        const response = await ProductService.deleteManyProduct(ids);

        return res.status(200).json(response);
    }catch (error){
        return res.status(500).json({
            status: 'ERROR',
            message : error.message || 'An unexpected error occurred while deleting product'
        })
    }
}

module.exports = {
    createProduct,
    updateProduct,
    getProductDetails,
    getAllProduct,
    deleteProduct,
    deleteManyProduct
}


