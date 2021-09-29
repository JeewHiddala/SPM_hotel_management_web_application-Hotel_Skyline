const express = require('express');
const router = express.Router();
const foodorderController = require('../controllers/foodorder.controller')

module.exports = function () {
    router.post('/create', foodorderController.createFoodOrder);
    router.get('/', foodorderController.getAllFoodOrderDetails);
    //router.get('/', foodorderController.getAllFoodDetails);
    router.get('/:id', foodorderController.getSelectedFoodOrderDetails);
    router.delete('/:id', foodorderController.deleteFoodOrder);
    router.patch('/update/:id', foodorderController.updateSelectedFoodOrderDetails);
    router.get('/get-foods-in-order/:orderNo', foodorderController.getFoodsInOrder);
   


    return router;
}