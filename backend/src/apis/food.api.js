const express = require('express');
const router = express.Router();
const foodController = require('../controllers/food.controller');

module.exports = function () {
    router.post('/create', foodController.createFood);        // create food.
    router.get('/', foodController.getAllFoodsDetails);       //get all food.
    router.get('/:id', foodController.getSelectedFoodDetails); //get selected food details
    router.get('/search/:foodNumber', foodController.getSearchedFoodDetailsByNo);  // get search food details using food number.
    router.patch('/update/:id', foodController.updateSelectedFoodDetails); //update selected admin details.
    router.delete('/:id', foodController.deleteFood);// delete a food
    return router;
}