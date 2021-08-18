const mongoose = require('mongoose');       //import mongoose

const IngredientOrderSchema = new mongoose.Schema({    //make schema
    orderNumber: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    ingredients: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'ingredients'}]
    //array and m :N
});

const IngredientOrder = mongoose.model('ingredientOrders', IngredientOrderSchema);        //give name for collection
module.exports = IngredientOrder;