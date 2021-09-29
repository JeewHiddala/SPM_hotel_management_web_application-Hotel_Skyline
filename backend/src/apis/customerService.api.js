const express = require('express');
const router = express.Router();
const customerServiceController = require('../controllers/customerService.controller');

module.exports = function () {
    router.post('/create', customerServiceController.createCustomerService);        // create CustomerService.
    router.get('/', customerServiceController.getAllCustomerServicesDetails);       //get all CustomerService.
    router.get('/:id', customerServiceController.getSelectedCustomerServiceDetails); //get selected CustomerService
    router.get('/get-service/:id', customerServiceController.getCustomerServicessInServiceList);
    router.patch('/update/:id', customerServiceController.updateSelectedCustomerServiceDetails); //update selected Customer service details. 
    router.delete('/:id', customerServiceController.deleteCustomerService);// delete a CustomerService
    return router;
}