const mongoose = require('mongoose');       //import mongoose

const CustomerServiceSchema = new mongoose.Schema({    //make schema
    
    name: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    noOfHours: { type: Number, required: true },
    price: { type: Number, required: true },
    cost: { type: Number, required: true },
    // serviceLists: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'serviceLists'}]
    // array m:N
});

const CustomerService = mongoose.model('customerServices', CustomerServiceSchema);        //give name for collection
module.exports = CustomerService;