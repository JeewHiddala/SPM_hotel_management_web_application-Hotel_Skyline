const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');

module.exports = function () {
    router.post('/create', bookingController.createBooking);
    router.get('/', bookingController.getAllBookingDetails);
    router.get('/get/', bookingController.getAllBookings);
    router.get('/availableBookings/', bookingController.getAllAvailableBookingDetails);
    router.get('/unavailableBookings/', bookingController.getAllUnavailableBookingDetails);
    router.get('/:id', bookingController.getSelectedBookingDetails);
    router.delete('/:id', bookingController.deleteBooking);
    router.get('./room/:id', bookingController.getRoomsInBooking);
    router.patch('/update/:id', bookingController.updateSelectedRoomBookingDetails);
   
    return router;
}