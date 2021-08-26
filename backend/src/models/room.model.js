const mongoose = require('mongoose');       //import mongoose
const mongoosePaginate = require('mongoose-paginate-v2');

const RoomSchema = new mongoose.Schema({    //make schema
    roomNo: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    airConditioningCategory: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    isAvailable: {type: Boolean, default:true},
    price: { type: Number, required: true }
});
RoomSchema.plugin(mongoosePaginate);
const Room = mongoose.model('rooms', RoomSchema);        //give name for collection
module.exports = Room;