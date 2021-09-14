const express = require('express');
const router = express.Router();
const roomController = require('../controllers/room.controller');

module.exports = function () {
    router.post('/create', roomController.createRoom);        // create employees.
    router.get('/', roomController.getAllRoomsDetails);       //get all employees.
    router.get('/availableRooms/', roomController.getAllAvailableRoomsDetails);       //get all working employees.
    router.get('/unavailableRooms/', roomController.getAllUnavailableRoomsDetails);       //get all retired employees.
    router.get('/checkoutRooms/', roomController.getRoomsDetailsByNo);       //get room by roomNo.
    router.get('/availableRooms/:id', roomController.getSelectedAvailableRoomDetails); //get selected available room details.
    router.get('/:id', roomController.getSelectedRoomDetails);       //get selected employees details.
    router.patch('/update/:id', roomController.updateSelectedRoomDetails); //update selected admin details.
    router.delete('/:id', roomController.deleteRoom);         //delete selected employees details.   

    return router;
}