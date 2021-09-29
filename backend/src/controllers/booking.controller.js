
const mongoose = require("mongoose");
const Booking = require('../models/booking.model');

const createBooking = async (req, res) => {
    if (req.body) {
        const booking = new Booking(req.body);
        booking.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllBookings = async (req, res) => {
    let page = req.query.page; 
    const options = {
        page: page,
        limit: 5
      }
    await Booking.paginate({},options)
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}



const getAllBookingDetails = async (req, res) => {       
    await Booking.find({})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}


const getRoomsInBooking = async (req, res) => {
    if (req.params && req.params.id) {
        //   await Booking.findById(req.params.id)
        await Booking.findOne({ room: roomNo }).populate('room').execPopulate()
            //   .populate('room', 'roomNo category airConditioningCateory description price')
            .then(data => {
                res.status(200).send({ room: data.room });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllAvailableBookingDetails = async (req, res) => {
    await Booking.find({ isWorking: true })
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getAllUnavailableBookingDetails = async (req, res) => {
    await Booking.find({ isWorking: false })
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getSelectedBookingDetails = async (req, res) => {
    if (req.params && req.params.id) {
        await Booking.findById(req.params.id)
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}



const updateSelectedRoomBookingDetails = async (req, res) => {       //update selected editor
    if (req.params && req.params.id){
        const {id} = req.params;        // fetching the id of the editor.
        const booking = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No booking With That id');      // validating the room id
        const updatedBooking = await Booking.findByIdAndUpdate(id, booking,{new : true});      // find room and room editor
        res.json(updatedBooking);
    }
}

const deleteBooking = async (req, res) => {
    if (req.params && req.params.id) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No booking with id: ${id}`);
        await Booking.findByIdAndRemove(id);
        res.json({ message: "Booking removed successfully." });
    }
}

module.exports = {
    createBooking,
    getAllBookingDetails,
    getAllAvailableBookingDetails,
    getRoomsInBooking,
    getAllBookings,
    getAllUnavailableBookingDetails,
    getSelectedBookingDetails,
    updateSelectedRoomBookingDetails,
    deleteBooking
};
