const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    cartItems: [
        {
            name: { type: String, required: true },
            amount: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            discount: {type:Number, required: true},
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
        },
    ],
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
} , {
    timestamps: true
    }
);

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;