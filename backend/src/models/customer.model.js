const mongoose = require('mongoose');       //import mongoose

const CustomerSchema = new mongoose.Schema({    //make schema
    fullname: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    mobileNumber: { type: String, required: true },
    nicNo: { type: String, required: true, trim: true },
    userName: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    userData: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users'}

});

const Customer = mongoose.model('customers', CustomerSchema);        //give name for collection
module.exports = Customer;