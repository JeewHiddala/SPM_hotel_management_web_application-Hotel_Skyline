const express = require('express');
const router = express.Router();
const employeeLeavesController = require('../controllers/employeeLeaves.controller');

module.exports = function () {
    router.post('/create', employeeLeavesController.createEmployeeLeaves);        // create employees.
    router.get('/', employeeLeavesController.getAllEmployeesLeavesDetails);       //get all employees.
    router.get('/search/:nicNo', employeeLeavesController.getSearchedEmployeeLeavesDetailsByNIC); // get search employee details using employee nic number.
    router.patch('/update/:id', employeeLeavesController.updateSelectedEmployeeLeavesDetails); //update selected employees details.
    router.delete('/:id', employeeLeavesController.deleteEmployeeLeaves);         //delete selected employees details.

    return router;
}