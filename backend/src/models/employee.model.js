const mongoose = require('mongoose');       //import mongoose

const EmployeeSchema = new mongoose.Schema({    //make schema
    name: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    mobileNumber: { type: Number, required: true },
    nicNo: { type: String, required: true, trim: true },
    salary: { type: Number, required: true },
    userName: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },

});

const Employee = mongoose.model('employees', EmployeeSchema);        //give name for collection
module.exports = Employee;