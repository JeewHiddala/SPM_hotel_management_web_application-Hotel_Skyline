const mongoose = require('mongoose');       //import mongoose

const IngredientSchema = new mongoose.Schema({    //make schema
    ingredientName: { type: String, required: true, trim: true },
    quantity: { type: String, required: true, trim: true },
    chefName: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'employees'},
    orderNumber: { type: String, required: true, trim: true },
    ingredientOrders: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'ingredientOrders'}
});

const Ingredient = mongoose.model('ingredients', IngredientSchema);        //give name for collection
module.exports = Ingredient;