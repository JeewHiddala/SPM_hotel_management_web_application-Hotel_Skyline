
const mongoose = require('mongoose');

const FoodorderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, trim: true },
    foodName: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    pricenquantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true }
});
const Foodorder = mongoose.model('foodorders', FoodorderSchema);
module.exports = Foodorder;