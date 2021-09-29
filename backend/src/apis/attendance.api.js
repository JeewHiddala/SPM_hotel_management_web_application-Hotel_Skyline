const express = require('express');
const router = express.Router();
const AttendanceController = require('../controllers/attendance.controller');

module.exports = function () {
    router.post('/create', AttendanceController.createAttendance);        // create attendance.
    router.get('/', AttendanceController.getAllAttendanceDetails);       //get all attendance.
    router.get('/:id', AttendanceController.getSelectedAttendanceDetails);       //get selected attendance details.
    router.get('/search/:nicNo', AttendanceController.getSearchedAttendanceDetailsByNIC); // get search attendance using employee nic number.

    router.patch('/:id', AttendanceController.updateSelectedAttendance);    //update selected attendance details.
    return router;
}