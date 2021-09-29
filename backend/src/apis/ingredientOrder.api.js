const express = require('express');
const router = express.Router();
const ingredientOrderController = require('../controllers/ingredientOrder.controller');

module.exports = function () {
    router.post('/create', ingredientOrderController.createIngredientOrder);        // create ingredientOrder.
    router.get('/', ingredientOrderController.getAllIngredientOrdersDetails);       //get all ingredientOrder.
    router.get('/:id', ingredientOrderController.getSelectedIngredientOrderDetails); //get selected ingredientOrder details
    router.get('/search/:orderNumber', ingredientOrderController.getSearchedIngredientOrderDetailsByNo);  // get search food details using food number.
    router.patch('/update/:id', ingredientOrderController.updateSelectedIngredientOrderDetails); //update selected Ingredient details. 
    router.delete('/:id', ingredientOrderController.deleteIngredientOrder);// delete a ingredientOrder
    return router;
}