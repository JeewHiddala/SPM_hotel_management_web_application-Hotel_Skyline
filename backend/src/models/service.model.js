const mongoose = require('mongoose');       //import mongoose
const mongoosePaginate = require('mongoose-paginate-v2');

const ServiceSchema = new mongoose.Schema({    //make schema
    serviceNo: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    addedDate: { type: String, required: true, trim: true },
    pricePerHour: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    employeeCount: { type: Number, required: true }
});
ServiceSchema.plugin(mongoosePaginate);
const Service = mongoose.model('services', ServiceSchema);        //give name for collection
module.exports = Service;