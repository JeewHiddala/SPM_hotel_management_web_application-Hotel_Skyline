const Attendance = require('../models/attendance.model');       //import Attendance model
const mongoose = require("mongoose");

const createAttendance = async (req, res) => {       //create a Attendance to db.
    if (req.body) {
        const attendance = new Attendance(req.body);
        attendance.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllAttendanceDetails = async (req, res) => {       //get all Attendance details.
    let page = req.query.page;
    var abc = [{ path: 'receptionist', select: 'name' }, { path: 'employee', select: 'nicNo' }];
    const options = {
        page: page,
        populate: abc,
        limit: 5
    }
    console.log("Page", req.query.page);
    await Attendance.paginate({}, options)
        .then(data => {
            res.status(200).send({ data: data });
        })
}

const getSelectedAttendanceDetails = async (req, res) => {          //get selected Attendance details.
    if (req.params && req.params.id) {
        await Attendance.findById(req.params.id)
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getSearchedAttendanceDetailsByNIC = async (req, res) => {          //get selected search details. //search
    var nicNo = req.params.nicNo;
    await Attendance.findOne({employee: nicNo})
        .populate('receptionist', 'name')
        .populate('employee', 'nicNo')
        .then(data => {
            res.status(200).send({ data: data });
            console.log("444"+nicNo);
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const updateSelectedAttendance = async (req, res) => {       //update selected Attendance
    if (req.params && req.params.id) {
        const { id } = req.params;        // fetching the Attendance id 
        const attendance = req.body;
        const status = req.body.status;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Attendance With that id');      // validating the Attendance id
        const updatedAttendance = await Attendance.findByIdAndUpdate(id, {
            $set: {
                status: status
            }
        });      // find and update Attendance
        res.json(updatedAttendance);
    }
}

module.exports = {
    createAttendance,
    getAllAttendanceDetails,
    getSelectedAttendanceDetails,
    getSearchedAttendanceDetailsByNIC,
    updateSelectedAttendance
};