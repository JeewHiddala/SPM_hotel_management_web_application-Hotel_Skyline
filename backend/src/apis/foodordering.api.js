const express = require('express');
const router = express.Router();
const foodorderingController = require('../controllers/foodordering.controller');

module.exports = function () {
    router.post('/create', foodorderingController.createFoodOrdering);
    router.get('/', foodorderingController.getAllFoodOrderingDetails);
    // router.get('/get', foodorderingController.getAllDetailsPaginate);
    
    router.get('/:id', foodorderingController.getSelectedFoodOrderingDetails);
    router.delete('/:id', foodorderingController.deleteFoodOrdering);
    router.get('/charge/:id', foodorderingController.calculateOrderCharge);
    router.patch('/update/:id', foodorderingController.updateSelectedFoodOrderingDetails);
    router.get('/get-foods-in-order/:orderNo', foodorderingController.getFoodsInOrdering);
    router.get('/search/:orderId', foodorderingController.searchFoodOrderDetailsByOrderId); 
   

    return router;
}