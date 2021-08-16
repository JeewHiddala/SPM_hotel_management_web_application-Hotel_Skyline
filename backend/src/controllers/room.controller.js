const Room = require('../models/room.model');       //import room model
const mongoose = require("mongoose");

const createRoom = async (req, res) => {       //create a room to db.
    if (req.body) {
        const room = new Room(req.body);
        room.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllRoomsDetails = async (req, res) => {       //get all room details.
    await Room.find({})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getAllAvailableRoomsDetails = async (req, res) => {       //get all available rooms details.
    await Room.find({isAvailable:true})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getAllUnavailableRoomsDetails = async (req, res) => {       //get all not available rooms details.
    await Room.find({isAvailable:false})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getSelectedRoomDetails = async (req, res) => {          //get selected room details.
    if (req.params && req.params.id) {
        await Room.findById(req.params.id)
            .then(data => {
                res.status(200).send({ data : data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const deleteRoom = async (req, res) => {               // delete selected room.
    if (req.params && req.params.id) {
        const {id} = req.params;            // fetching the id of the room
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No room with id: ${id}`);       //validating the room id.
        await Room.findByIdAndRemove(id);         // find room and remove room.
        res.json({message: "Room deleted successfully."});
    }
}

module.exports = {
    createRoom,
    getAllRoomsDetails,
    getAllAvailableRoomsDetails,
    getAllUnavailableRoomsDetails,
    getSelectedRoomDetails,
    deleteRoom
};