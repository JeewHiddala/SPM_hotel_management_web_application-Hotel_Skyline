const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer.controller');

module.exports = function () {
    router.post('/create', customerController.createCustomer);        // create customers.
    router.get('/', customerController.getAllCustomersDetails);       //get all customers.
    router.get('/:id', customerController.getSelectedCustomerDetails);       //get selected customers details.
    router.delete('/:id', customerController.deleteCustomer);         //delete selected customers details.

    return router;
}