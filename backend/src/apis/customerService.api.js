const express = require('express');
const router = express.Router();
const customerServiceController = require('../controllers/customerService.controller');

module.exports = function () {
    router.post('/create', customerServiceController.createCustomerService);        // create CustomerService.
    router.get('/', customerServiceController.getAllCustomerServicesDetails);       //get all CustomerService.
//router.get('/get-services-in-list/:bookingID', customerServiceController.getServicesInList);     
    router.get('/:id', customerServiceController.getSelectedCustomerServiceDetails); //get selected CustomerService
    router.get('/get-service/:id', customerServiceController.getCustomerServicessInServiceList);
    router.delete('/:id', customerServiceController.deleteCustomerService);// delete a CustomerService
    return router;
}