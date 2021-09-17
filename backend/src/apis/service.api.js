const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service.controller');

module.exports = function () {
    router.post('/create', serviceController.createService);        // create service.
    router.get('/', serviceController.getAllServicesDetails);       //get all services.
    router.get('/get/', serviceController.getAllServicesDetailsForReceptionist);       //get selected service details.
    router.get('/:id', serviceController.getSelectedServiceDetails);       //get selected service details.
    router.get('/search/:serviceNo', serviceController.getSearchedServiceDetailsByNo);  // get search service details using service number.
    router.patch('/update/:id', serviceController.updateSelectedServiceDetails); //update selected service details.
    router.delete('/:id', serviceController.deleteService);         //delete selected service details.

    return router;
}