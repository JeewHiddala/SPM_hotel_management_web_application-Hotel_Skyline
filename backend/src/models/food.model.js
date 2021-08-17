const mongoose = require('mongoose');       //import mongoose

const FoodSchema = new mongoose.Schema({    //make schema
    foodNumber: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    description: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    status: {type: String, required:true},
    chefName: { type: String, required: true, trim: true }
    
});

const Food = mongoose.model('foods', FoodSchema);        //give name for collection
module.exports = Food;