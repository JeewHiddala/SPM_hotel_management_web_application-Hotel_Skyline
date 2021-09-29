const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const BookingSchema = new mongoose.Schema({
    bookingNo: { type: String, required: true, trim: true },
    customerId: { type: String, required: true, trim: true },
    roomNo: { type: String, trim: true },
    boardingType: { type: String, required: true, trim: true },
    bookingDate: { type: Date},
    noOfGuests: { type: Number, required: true },
    days: { type: Number, required: true },
    arrivalDate: { type: Date ,  required: true},
    remarks: { type: String, required: true, trim: true },
    room: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'rooms' }],
});


BookingSchema.plugin(mongoosePaginate);
const Booking = mongoose.model('bookings', BookingSchema);
module.exports = Booking;