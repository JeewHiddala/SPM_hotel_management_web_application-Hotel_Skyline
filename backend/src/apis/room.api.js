const express = require('express');
const router = express.Router();
const roomController = require('../controllers/room.controller');

module.exports = function () {
    router.post('/create', roomController.createRoom);        // create employees.
    router.get('/', roomController.getAllRoomsDetails);       //get all employees.
    router.get('/availableRooms/', roomController.getAllAvailableRoomsDetails);       //get all working employees.
    router.get('/unavailableRooms/', roomController.getAllUnavailableRoomsDetails);       //get all retired employees.
    router.get('/:id', roomController.getSelectedRoomDetails);       //get selected employees details.
    router.delete('/:id', roomController.deleteRoom);         //delete selected employees details.

    return router;
}