const mongoose = require('mongoose');       //import mongoose
const mongoosePaginate = require('mongoose-paginate-v2');

const EmployeeLeaveSchema = new mongoose.Schema({    //make schema
    leaveDate: { type: String, required: true, trim: true },
    reason: { type: String, required: true, trim: true },
    receptionistName: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'employees'},
    employeeNIC: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'employees'}
});

EmployeeLeaveSchema.plugin(mongoosePaginate);
const EmployeeLeave = mongoose.model('employeeleaves', EmployeeLeaveSchema);        //give name for collection
module.exports = EmployeeLeave;