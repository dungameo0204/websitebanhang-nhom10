const Cart = require("../models/CartModel");
const mongoose = require("mongoose");

const createCart = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUserID = await Cart.findOne({ user: userId });

      if (checkUserID !== null) {
        reject({
          status: "ERROR",
          message: "Duplicate Cart's UserID in DB",
        });
      }

      const createdCart = await Cart.create({
        cartItems: [],
        user: userId,
      });

      if (createdCart) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createdCart,
        });
      }
    } catch (error) {
      reject({
        status: "ERROR",
        message:
          error.message ||
          "an error occured when creating new product item-service",
      });
    }
  });
};

const changeCartItem = (userId, cartItems, type) => {
  return new Promise(async (resolve, reject) => {
    try {
      let cart = await Cart.findOne({ user: userId });

      if (!cart) {
        reject({
          status: "ERROR",
          message: "can not found Cart belongs to this UserID",
        });
      }

      if (type === "add") {
        const existingItem = cart.cartItems.find(
          (item) => item.product.toString() === cartItems.product.toString()
        );
        if (existingItem) {
          existingItem.amount += cartItems.amount;
        } else {
          cart.cartItems.push(cartItems);
        }
      } else if (type === "change") {
        for (const item of cartItems) {
          const existingItem = cart.cartItems.find(
            (itemChecked) =>
              itemChecked.product.toString() === item.product.toString()
          );
          if (existingItem) {
            existingItem.amount += item.amount;
          }
        }
      }

      await cart.save();

      resolve({
        status: "OK",
        message: "SUCCESS",
      });
    } catch (error) {
      reject({
        status: "ERROR",
        message: error.message || "An error occurred when changing cart item",
      });
    }
  });
};

const removeCartItem = (userId, cartItemIdList) => {
  return new Promise(async (resolve, reject) => {
    try {
      let cart = await Cart.findOne({ user: userId });

      if (!cart) {
        return {
          status: "ERROR",
          message: "Cart for the user not found",
        };
      }

        cartItemIdList.forEach((itemToDeleteId) => {
        const itemIndex = cart.cartItems.findIndex(
          (item) => item.product.toString() === itemToDeleteId
        );

        if (itemIndex !== -1) {
          cart.cartItems.splice(itemIndex, 1);
        }
      });
      await cart.save();

      resolve({
        status: "OK",
        message: "SUCCESS",
      });
    } catch (error) {
      reject({
        status: "ERROR",
        message: error.message || "An error occurred when removing cart item",
      });
    }
  });
};

const getCart = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cart = await Cart.findOne({ user: userId });

      if (!cart) {
        reject({
          status: "ERROR",
          message: "Cart not found with this userID",
        });
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: cart,
      });
    } catch (error) {
      reject({
        status: "ERROR",
        message:
          error.message || "An error occurred when getting cart from service",
      });
    }
  });
};

const deleteCart = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cartToDelete = await Cart.findOneAndDelete({ user: userId });

      if (!cartToDelete) {
        return reject({
          status: "ERROR",
          message: "NO CART FOUND WITH THIS USERID",
        });
      }

      resolve({
        status: "OK",
        message: "CART DELETE SUCCESSFULLY",
      });
    } catch (error) {
      reject({
        status: "ERROR",
        message:
          error.message || "An error occurred when deleting cart from service",
      });
    }
  });
};

module.exports = {
  createCart,
  getCart,
  changeCartItem,
  removeCartItem,
  deleteCart,
};
