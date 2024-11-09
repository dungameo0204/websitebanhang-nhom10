const mongoose = require('mongoose');

const orderProductSchema = new mongoose.Schema({
    orderItems: [
        {
            name: { type: String, required: true },
            amount: { type: Number, required: true },
            image : { type: String, required: true },
            price: { type: Number, required: true },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            }
        }
    ],
    shippingAddress: {
        fullName: { type: String, required: true },
        address : { type: String, required: true },
        city : { type: String, required: true },
        phone : { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isPaid: { type: Boolean,  default: false },
    paidAt: { type: Date },
    isDelerved: { type: Boolean,  default: false },
    delivereAt: { type: Date },
},
{
    timestamps: true,
});

const Order = mongoose.model('OrderProduct', orderProductSchema);

module.exports = Order;