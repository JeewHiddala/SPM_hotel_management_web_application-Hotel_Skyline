const CustomerService = require('../models/customerService.model');       //import CustomerService model
const mongoose = require("mongoose");

const createCustomerService = async (req, res) => {       //create a CustomerService to db.
    if (req.body) {
        const customerService = new CustomerService(req.body);
        customerService.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllCustomerServicesDetails = async (req, res) => {       //get all CustomerService details.
    await CustomerService.find({}).populate('bookingID','bookingNo')
    .populate('serviceName','name')
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getCustomerServicessInServiceList = async (req, res) => {       //get all customer service details.
    var bookingNo = req.params.bookingNo;
    console.log(bookingNo);
    await CustomerService.find({ bookingID: bookingNo })
    .then(data => {
        res.status(200).send({ data: data });
    })
    .catch(error => {
        res.status(500).send({ error: error.message });
    });
}

const getSelectedCustomerServiceDetails = async (req, res) => {          //get selected CustomerService details.
    if (req.params && req.params.id) {
        await CustomerService.findById(req.params.id)
        .populate('serviceName','name')
        .populate('bookingID','bookingNo')
            .then(data => {
                res.status(200).send({ data : data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}
const deleteCustomerService = async (req, res) => {               // delete selected CustomerService.
    if (req.params && req.params.id) {
        const {id} = req.params;            // fetching the id of the CustomerService
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No CustomerService with id: ${id}`);       //validating the CustomerService id.
        await CustomerService.findByIdAndRemove(id);         // remove selected CustomerService details
        res.json({message: "CustomerService deleted successfully."}); // success message
    }
}

const updateSelectedCustomerServiceDetails = async (req, res) => {       //update selected CustomerService
    if (req.params && req.params.id){
        const {id} = req.params;        // fetching the id of the CustomerService.
        const customerService = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No CustomerService With That id');      // validating the CustomerService id
        const updatedCustomerService = await CustomerService.findByIdAndUpdate(id, customerService,{new : true});      // find CustomerService
        res.json(updatedCustomerService);
    }
}

module.exports = {
    createCustomerService,
    getAllCustomerServicesDetails,
    getSelectedCustomerServiceDetails,
    getCustomerServicessInServiceList,
    updateSelectedCustomerServiceDetails,
    deleteCustomerService
};