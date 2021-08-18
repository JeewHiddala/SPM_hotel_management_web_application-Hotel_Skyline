const Customer = require('../models/customer.model');       //import customer model
const mongoose = require("mongoose");

const createCustomer = async (req, res) => {       //create a Customer to db.
    if (req.body) {
        const customer = new Customer(req.body);
        customer.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllCustomersDetails = async (req, res) => {       //get all Customer details.
    await Customer.find({})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getSelectedCustomerDetails = async (req, res) => {          //get selected Customer details.
    if (req.params && req.params.id) {
        await Customer.findById(req.params.id)
            .then(data => {
                res.status(200).send({ data : data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const deleteCustomer = async (req, res) => {               // delete selected Customer.
    if (req.params && req.params.id) {
        const {id} = req.params;            // fetching the id of the Customer
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Customer with id: ${id}`);       //validating the Customer id.
        await Customer.findByIdAndRemove(id);         // find Customer and remove Customer.
        res.json({message: "Customer deleted successfully."});
    }
}

module.exports = {
    createCustomer,
    getAllCustomersDetails,
    getSelectedCustomerDetails,
    deleteCustomer
};