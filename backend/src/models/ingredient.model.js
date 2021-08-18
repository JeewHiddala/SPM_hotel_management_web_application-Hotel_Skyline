const mongoose = require('mongoose');       //import mongoose

const IngredientSchema = new mongoose.Schema({    //make schema
    
    name: { type: String, required: true, trim: true },
    quantity: { type: String, required: true, trim: true },
    chefName: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'employees'}],
    ingredientOrders: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'ingredientOrders'}]
    // array m:N
});

const Ingredient = mongoose.model('ingredients', IngredientSchema);        //give name for collection
module.exports = Ingredient;