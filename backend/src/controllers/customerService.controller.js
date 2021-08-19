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
    await CustomerService.find({})//.populate('ingredients','name quantity chefName')
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getSelectedCustomerServiceDetails = async (req, res) => {          //get selected CustomerService details.
    if (req.params && req.params.id) {
        await CustomerService.findById(req.params.id)//.populate('ingredients','name quantity chefName')
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

module.exports = {
    createCustomerService,
    getAllCustomerServicesDetails,
    getSelectedCustomerServiceDetails,
    deleteCustomerService
};