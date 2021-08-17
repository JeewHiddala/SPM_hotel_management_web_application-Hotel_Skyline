const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service.controller');

module.exports = function () {
    router.post('/create', serviceController.createService);        // create service.
    router.get('/', serviceController.getAllServicesDetails);       //get all services.
    router.get('/:id', serviceController.getSelectedServiceDetails);       //get selected service details.
    router.delete('/:id', serviceController.deleteService);         //delete selected service details.

    return router;
}