const express = require('express');
const router = express.Router();
const cashpaymentController = require('../controllers/cashpayment.controller')

module.exports = function () {
    router.post('/create', cashpaymentController.createCashPayment);
    router.get('/', cashpaymentController.getAllCashPaymentDetails);
    router.get('/:id', cashpaymentController.getSelectedCashPaymentDetails);
    router.delete('/:id', cashpaymentController.deleteCashPayment);


    return router;
}