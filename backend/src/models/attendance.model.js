const mongoose = require('mongoose');       //import mongoose
const mongoosePaginate = require('mongoose-paginate-v2');

const AttendenceSchema = new mongoose.Schema({    //make schema
    // date: { type: String, required: true, trim: true },
    // startingTime: { type: String, required: true, trim: true },
    // leavingTime: { type: String, required: true, trim: true },
    receptionist: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'employees' },
    employee: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'employees' },
    status: { type: String, required: false }
}, {timestamps: true});
AttendenceSchema.plugin(mongoosePaginate);
const Attendence = mongoose.model('attendences', AttendenceSchema);        //give name for collection
module.exports = Attendence;