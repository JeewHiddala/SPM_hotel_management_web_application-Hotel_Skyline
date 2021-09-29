const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const FoodorderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, trim: true },
    foodName: { type: String, required: true, trim: true },
    price: { type: Number},
    quantity: { type: Number, required: true },
    pricenquantity: { type: Number},
    //totalPrice: { type: Number },
    foodorderings: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'foodorderings'}],
 
});

FoodorderSchema.plugin(mongoosePaginate);
const Foodorder = mongoose.model('foodorders', FoodorderSchema);
module.exports = Foodorder;