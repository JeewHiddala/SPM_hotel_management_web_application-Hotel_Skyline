const mongoose = require('mongoose');       //import mongoose
const mongoosePaginate = require('mongoose-paginate-v2');

const FoodSchema = new mongoose.Schema({    //make schema
    foodNumber: { type: String, required: true, trim: true },
    foodName: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    description: { type: String, required: true, trim: true },
    createDate: { type: String, required: true, trim: true },
    status: {type: String, required:true},
    chefName: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'employees'}]
});

FoodSchema.plugin(mongoosePaginate);
const Food = mongoose.model('foods', FoodSchema);        //give name for collection
module.exports = Food;