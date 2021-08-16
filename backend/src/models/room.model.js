const mongoose = require('mongoose');       //import mongoose

const RoomSchema = new mongoose.Schema({    //make schema
    roomNo: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    airConditioningCategory: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    description: { type: String, required: true, trim: true },
    salary: { type: Number, required: true },
    isAvailable: {type: Boolean, default:true}
});

const Room = mongoose.model('rooms', RoomSchema);        //give name for collection
module.exports = Room;