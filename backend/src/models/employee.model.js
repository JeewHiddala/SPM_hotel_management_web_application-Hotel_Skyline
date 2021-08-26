const mongoose = require('mongoose');       //import mongoose
const mongoosePaginate = require('mongoose-paginate-v2');

const EmployeeSchema = new mongoose.Schema({    //make schema
    name: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    mobileNumber: { type: Number, required: true },
    nicNo: { type: String, required: true, trim: true },
    salary: { type: Number, required: true },
    isWorking: {type: Boolean, default:true},
    userName: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    userData: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'users'}
});
EmployeeSchema.plugin(mongoosePaginate);
const Employee = mongoose.model('employees', EmployeeSchema);        //give name for collection
module.exports = Employee;