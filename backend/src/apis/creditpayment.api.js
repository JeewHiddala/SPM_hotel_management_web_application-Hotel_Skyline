const express = require('express');
const router = express.Router();
const creditpaymentController = require('../controllers/creditpayment.controller')

module.exports = function () {
    router.post('/create', creditpaymentController.createCreditPayment);
    router.get('/', creditpaymentController.getAllCreditPaymentDetails);
    router.get('/:id', creditpaymentController.getSelectedCreditPaymentDetails);
    router.delete('/:id', creditpaymentController.deleteCreditPayment);


    return router;
}