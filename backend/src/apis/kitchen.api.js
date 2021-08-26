const express = require('express');
const router = express.Router();
const kitchenorderController = require('../controllers/kitchenorder.controller')

module.exports = function () {
    router.post('/create', kitchenorderController.createKitchenOrder);
    router.get('/', kitchenorderController.getAllKitchenOrderDetails);
    router.get('/:id', kitchenorderController.getSelectedKitchenOrderDetails);
    router.delete('/:id', kitchenorderController.deleteKitchenOrder);


    return router;
}