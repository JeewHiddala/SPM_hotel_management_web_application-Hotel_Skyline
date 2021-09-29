const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const KitchenorderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, trim: true },
    totalPrice: { type: Number, required: true },
    foodorders: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'foodorders'}],
});

KitchenorderSchema.plugin(mongoosePaginate);
const Kitchenorder = mongoose.model('kitchenorders', KitchenorderSchema);
module.exports = Kitchenorder;