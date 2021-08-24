const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    bookingNo: { type: String, required: true, trim: true },
    customerId: { type: String, required: true, trim: true },
    roomNo: { type: String, trim: true },
    boardingType: { type: String, required: true, trim: true },
    bookingDate: { type: Date },
    noOfGuests: { type: Number, required: true },
    days: { type: Number, required: true },
    arrivalDate: { type: Date },
    remarks: { type: String, required: true, trim: true },
    room: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'rooms' }],
});


const Booking = mongoose.model('bookings', BookingSchema);
module.exports = Booking;