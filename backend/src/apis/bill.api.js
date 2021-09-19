const express = require('express');
const router = express.Router();
const billController = require('../controllers/bill.controller');

module.exports = function () {
    router.post('/create', billController.createBill);        // create bills.
    router.get('/', billController.getAllBillDetails);       //get all bills.
    router.get('/search/', billController.getBillDetailsByNumber);  
    router.get('/:id', billController.getSelectedBillDetails);       //get selected bill details.
    
    router.patch('/:id', billController.updateSelectedBill);    //update selected bill details.
    router.delete('/:id', billController.deleteBill);         //delete selected bills details.
    return router;
}