const mongoose = require('mongoose');       //import mongoose
const mongoosePaginate = require('mongoose-paginate-v2');

const FoodOrderingSchema = new mongoose.Schema({    //make schema
    orderId: { type: String, required: true, trim: true },
    totalCharge: {type: Number},
    foodorders: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'foodorders'}],
    //array and m :N
});

FoodOrderingSchema.plugin(mongoosePaginate);
const FoodOrdering = mongoose.model('foodorderings', FoodOrderingSchema);        //give name for collection
module.exports = FoodOrdering;