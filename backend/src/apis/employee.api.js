const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');

module.exports = function () {
    router.post('/create', employeeController.createEmployee);        // create employees.
    router.get('/', employeeController.getAllEmployeesDetails);       //get all employees.
    router.get('/workingEmployees/', employeeController.getAllWorkingEmployeesDetails);       //get all working employees.
    router.get('/retiredEmployees/', employeeController.getAllRetiredEmployeesDetails);       //get all retired employees.
    router.get('/workingChefs/', employeeController.getAllWorkingChefsDetails);       //get all working employees.
    router.get('/workingReceptionists/', employeeController.getAllWorkingReceptionistsDetails);       //get all working employees.
    router.get('/totalWorkingEmployeeSalary/', employeeController.getAllWorkingEmployeesSalaryCount);       //get total salary amount all employees.
    router.get('/:id', employeeController.getSelectedEmployeeDetails);       //get selected employees details.
    router.get('/get-employee/:userData', employeeController.getEmployeeDetails);       //get employees.
    router.get('/search/:nicNo', employeeController.getSearchedEmployeeDetailsByNIC); // get search employee details using employee nic number.
    router.get('/searchRetiredEmployee/:nicNo', employeeController.getSearchedRetiredEmployeeDetailsByNIC); // get search retired employee details using employee nic number.
    router.patch('/update/:id', employeeController.updateSelectedEmployeeDetails); //update selected employees details.
    router.patch('/resign/:id', employeeController.resignSelectedEmployee);         //resign selected employees details.
    router.patch('/update-profile/:id', employeeController.updateEmployeeProfile);         //update employee profile
    router.delete('/:id', employeeController.deleteEmployee);         //delete selected employees details.

    return router;
}