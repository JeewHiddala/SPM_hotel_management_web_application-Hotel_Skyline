const express = require('express');
const router = express.Router();
const serviceListController = require('../controllers/serviceList.controller');

module.exports = function () {
    router.post('/create', serviceListController.createServiceList);        // create serviceList.
    router.get('/', serviceListController.getAllServiceListsDetails);       //get all serviceList.
    router.get('/:id', serviceListController.getSelectedServiceListDetails); //get selected serviceList details
    router.patch('/update/:id', serviceListController.updateSelectedServiceListDetails); //update selected  service list details. 
    router.delete('/:id', serviceListController.deleteServiceList);// delete a serviceList
    return router;
}