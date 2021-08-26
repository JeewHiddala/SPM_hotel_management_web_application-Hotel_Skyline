const express = require('express');
const router = express.Router();
const foodorderController = require('../controllers/foodorder.controller')

module.exports = function () {
    router.post('/create', foodorderController.createFoodOrder);
    router.get('/', foodorderController.getAllFoodOrderDetails);
    router.get('/:id', foodorderController.getSelectedFoodOrderDetails);
    router.delete('/:id', foodorderController.deleteFoodOrder);


    return router;
}