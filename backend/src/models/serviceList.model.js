const mongoose = require('mongoose');       //import mongoose

const ServiceListSchema = new mongoose.Schema({    //make schema
    bookingID: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'bookings'}], //need to change booking id array
    date: { type: String, required: true, trim: true },
    total: { type: Number, required: true },
    customerServices: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'customerServices'}]
    //array and m :N
});

const ServiceList = mongoose.model('serviceLists', ServiceListSchema);        //give name for collection
module.exports = ServiceList;