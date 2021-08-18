const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/ingredient.controller');

module.exports = function () {
    router.post('/create', ingredientController.createIngredient);        // create Ingredient.
    router.get('/', ingredientController.getAllIngredientsDetails);       //get all Ingredient.
    router.get('/:id', ingredientController.getSelectedIngredientDetails); //get selected Ingredient details
    router.delete('/:id', ingredientController.deleteIngredient);// delete a Ingredient
    return router;
}