const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');

module.exports = function () {
    router.post('/create', employeeController.createEmployee);        // create employees.
    router.get('/', employeeController.getAllEmployeesDetails);       //get all employees.
    router.get('/workingEmployees/', employeeController.getAllWorkingEmployeesDetails);       //get all working employees.
    router.get('/retiredEmployees/', employeeController.getAllRetiredEmployeesDetails);       //get all retired employees.
    router.get('/workingChefs/', employeeController.getAllWorkingChefDetails);       //get all working employees.
    router.get('/:id', employeeController.getSelectedEmployeeDetails);       //get selected employees details.
    router.delete('/:id', employeeController.deleteEmployee);         //delete selected employees details.

    return router;
}