const mongoose = require('mongoose');       //import mongoose
//const mongoosePaginate = require('mongoose-paginate-v2');

const ServiceListSchema = new mongoose.Schema({    //make schema
    bookingID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'bookings'}, //need to change booking id array
    createdDate: { type: String, required: true, trim: true },
    total: { type: Number, required: true },
    customerServices: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'customerServices'}]

    //array and m :N
});

// ServiceListSchema.plugin(mongoosePaginate);
const ServiceList = mongoose.model('serviceLists', ServiceListSchema);        //give name for collection
module.exports = ServiceList;