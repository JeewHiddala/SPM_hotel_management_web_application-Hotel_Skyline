const express = require('express');
const router = express.Router();
const roomController = require('../controllers/room.controller');

module.exports = function () {
    router.post('/create', roomController.createRoom);        // create room.
    router.get('/', roomController.getAllRoomsDetails);       //get all rooms.
    router.get('/availableRooms/', roomController.getAllAvailableRoomsDetails);       //get all available rooms.
    router.get('/unavailableRooms/', roomController.getAllUnavailableRoomsDetails);       //get all unavailable rooms.
    router.get('/checkoutRooms/', roomController.getRoomsDetailsByNo);       //get room by roomNo.
    router.get('/availableRooms/:id', roomController.getSelectedAvailableRoomDetails); //get selected available room details.

    router.get('/search/:roomNo', roomController.getSearchedRoomDetailsByNo);       //get room by roomNo.

    router.get('/:id', roomController.getSelectedRoomDetails);       //get selected room details.
    router.patch('/update/:id', roomController.updateSelectedRoomDetails); //update selected room details.
    router.delete('/:id', roomController.deleteRoom);         //delete selected room details.   

    return router;
}