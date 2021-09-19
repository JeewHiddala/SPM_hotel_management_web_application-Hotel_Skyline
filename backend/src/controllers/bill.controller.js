const Bill = require('../models/bill.model');
const mongoose = require("mongoose");

const createBill = async (req, res) => {
    if (req.body) {
        const bill = new Bill(req.body);
        bill.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllBillDetails = async (req, res) => {
    await Bill.find({})
        .populate('bookingNo', 'bookingNo')
        .populate('receptionistName', 'name')
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getBillDetailsByNumber = async (req, res) => {
    let billNo = req.query.billNo;
    console.log("dsds", billNo);
    await Bill.findOne({ billNo: billNo })
        // .populate('bookingNo', 'bookingNo')
        // .populate('receptionistName', 'name')
        .then(data => {
            res.status(200).send({ data: data._id });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getSelectedBillDetails = async (req, res) => {          //get selected bill details.
    if (req.params && req.params.id) {
        await Bill.findById(req.params.id)
            .populate('bookingNo', 'bookingNo')
            .populate('receptionistName', 'name')
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}


const updateSelectedBill = async (req, res) => {       //update selected bill
    if (req.params && req.params.id) {
        const { id } = req.params;        // fetching the bill id 
        const bill = req.body;
        const damageCost = req.body.damageCost;
        const totalCost = req.body.totalCost;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No bill With that id');      // validating the bill id
        const updatedBill = await Bill.findByIdAndUpdate(id, {$set: {
            damageCost: damageCost,
            totalCost: totalCost
        }});      // find and update bill
        res.json(updatedBill);
    }
}

const deleteBill = async (req, res) => {
    if (req.params && req.params.id) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Bill with id: ${id}`);
        await Bill.findByIdAndRemove(id);
        res.json({ message: "Bill deleted successfully." });
    }
}

module.exports = {
    createBill,
    getAllBillDetails,
    getBillDetailsByNumber,
    getSelectedBillDetails,
    updateSelectedBill,
    deleteBill
};