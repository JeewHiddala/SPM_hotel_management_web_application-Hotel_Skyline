const mongoose = require('mongoose');

const KitchenorderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, trim: true },
    foodName: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true }
});
const Kitchenorder = mongoose.model('kitchenorders', KitchenorderSchema);
module.exports = Kitchenorder;