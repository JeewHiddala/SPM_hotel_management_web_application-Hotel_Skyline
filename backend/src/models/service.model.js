const mongoose = require('mongoose');       //import mongoose

const serviceSchema = new mongoose.Schema({    //make schema
    serviceNo: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    addedDate: { type: String, required: true, trim: true },
    pricePerHour: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    employeeCount: { type: Number, required: true }
});

const Service = mongoose.model('services', serviceSchema);        //give name for collection
module.exports = Service;