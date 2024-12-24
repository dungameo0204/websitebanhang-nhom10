const Cart = require("../models/CartModel")
const CartService = require("../services/CartService")
const mongoose = require('mongoose');

const createCart = async (req,res) => {
    try{
        const userId = req.params.id

        if(!userId){
            return res.status(404).json({
                status: 'ERROR',
                message: 'userID required'
            })
        }

        const response = await CartService.createCart(userId);

        return res.status(200).json(response);
    }catch (error){
        return res.status(500).json({
            status: 'ERROR',
            message : error.message || 'An unexpected error occurred while creating cart - controller'
        })
    }
}

const changeCartItem = async (req,res) => {
    try{
        const userId = req.params.id;
        const {cartItem, type} = req.body;
        
        if(!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'userId is not valid'
            })
        }

        if(!cartItem) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'cartItem is not valid'
            })
        }

        const response = await CartService.changeCartItem(userId, cartItem, type);

        return res.status(200).json(response);
    }catch (error){
        return res.status(500).json({
            status: 'ERROR',
            message : error.message || 'An unexpected error occurred while changing cart item'
        })
    }
}

const removeCartItem = async (req,res) => {
    try{
        const userId = req.params.id;
        const cartItemIdList = req.body;

        if(!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'userId is not valid'
            })
        }

        if(!cartItemIdList) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'cartItem is not valid'
            })
        }

        const response = await CartService.removeCartItem(userId, cartItemIdList);

        return res.status(200).json(response);
    }catch (error){
        return res.status(500).json({
            status: 'ERROR',
            message : error.message || 'An unexpected error occurred while adding cart item'
        })
    }
}

const getCart = async (req,res) => {
    try{        
        const userId = req.params.id
        
        if(!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'userId is not valid'
            })
        }

        const response = await CartService.getCart(userId);

        return res.status(200).json(response);
    }catch (error){
        return res.status(404).json({
            status: 'ERROR',
            message : error.message || 'An unexpected error occurred while getting cart details'
        })
    }
}

const deleteCart = async (req, res) => {
    try{
            const userId = req.params.id
            
            if(!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({
                    status: 'ERROR',
                    message: 'Carts UserID is not valid'
                })
            }
    
            const response = await CartService.deleteCart(userId);
    
            return res.status(200).json(response);
        }catch (error){
            return res.status(500).json({
                status: 'ERROR',
                message : error.message || 'An unexpected error occurred while deleting product'
            })
        }
}

module.exports = {
    createCart,
    getCart,
    changeCartItem,
    removeCartItem,
    deleteCart
}


