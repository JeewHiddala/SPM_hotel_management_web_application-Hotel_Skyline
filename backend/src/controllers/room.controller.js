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
    let page = req.query.page; 
    const options = {
        page: page,
        limit: 5
      }
    await Room.paginate({},options)         //pagination
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getAllAvailableRoomsDetails = async (req, res) => {       //get all available rooms details.
    let page = req.query.page; 
    const options = {
        page: page,
        limit: 5
      }
    await Room.paginate({isAvailable:true},options)         //pagination
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getAllUnavailableRoomsDetails = async (req, res) => {       //get all not available rooms details.
    let page = req.query.page; 
    const options = {
        page: page,
        limit: 5
      }
    await Room.paginate({isAvailable:false},options)         //pagination
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}


// const getSelectedAvailableRoomDetails = async (req, res) => {          //get selected room details.
//     if (req.params && req.params.id) {
//         await Room.findById(req.params.id)
//             .then(data => {
//                 res.status(200).send({ data: data });
//             })
//             .catch(error => {
//                 res.status(500).send({ error: error.message });
//             });
//     }
// }

const getSelectedRoomDetails = async (req, res) => {          //get selected room details.
    if (req.params && req.params.id) {
        await Room.findById(req.params.id)
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getSearchedRoomDetailsByNo = async (req, res) => {          //get selected room details. //search
        var roomNo = req.params.roomNo;
        await Room.findOne({roomNo: roomNo})
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }

const getSelectedAvailableRoomDetails = async (req, res) => {          //get selected available room details.
    if (req.params && req.params.id) {
        await Room.findById(req.params.id)
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getRoomsDetailsByNo = async (req, res) => {       //get all available rooms details.
    var roomNo = req.query.roomNo;
    await Room.findOne({roomNo: roomNo})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const deleteRoom = async (req, res) => {               // delete selected room.
    if (req.params && req.params.id) {
        const { id } = req.params;            // fetching the id of the room
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No room with id: ${id}`);       //validating the room id.
        await Room.findByIdAndRemove(id);         // find room and remove room.
        res.json({ message: "Room deleted successfully." });
    }
}

const updateSelectedRoomDetails = async (req, res) => {       //update selected editor
    if (req.params && req.params.id){
        const {id} = req.params;        // fetching the id of the editor.
        const room = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No room With That id');      // validating the room id
        const updatedRoom = await Room.findByIdAndUpdate(id, room,{new : true});      // find room and room editor
        res.json(updatedRoom);
    }
}

module.exports = {
    createRoom,
    getAllRoomsDetails,
    getAllAvailableRoomsDetails,
    getAllUnavailableRoomsDetails,
    getSelectedAvailableRoomDetails,
    getSelectedRoomDetails,
    getSelectedAvailableRoomDetails,
    getRoomsDetailsByNo,
    getSearchedRoomDetailsByNo,
    updateSelectedRoomDetails,
    deleteRoom
};