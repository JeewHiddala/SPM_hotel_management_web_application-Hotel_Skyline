const express = require('express');
const router = express.Router();
const roomController = require('../controllers/room.controller');

module.exports = function () {
    router.post('/create', roomController.createRoom);
    router.get('/', roomController.getAllRoomsDetails);
    router.get('/availableRooms/', roomController.getAllAvailableRoomsDetails);
    router.get('/unavailableRooms/', roomController.getAllUnavailableRoomsDetails);
    router.get('/:id', roomController.getSelectedRoomDetails);
    router.delete('/:id', roomController.deleteRoom);
    router.get('/availableRooms/:id', roomController.getSelectedAvailableRoomDetails);

    return router;
}