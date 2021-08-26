const mongoose = require('mongoose');
 
const BillingSchema = new mongoose.Schema({
    issuedDate: { type: String, required: true, trim: true },
    billNo: { type: String, required: true, trim: true },
    damageCost: {type: Number, required:true},
    bookingCost: {type: Number, required:true},
    serviceCost: {type: Number, required:true},
    daysOfStay: {type: Number, required:true},
    totalCost: { type: Number, required: true },
    receptionistName: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'employees'},
    bookingNo: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'bookings'}
});
 
const Billing = mongoose.model('bills', BillingSchema);
module.exports = Billing;