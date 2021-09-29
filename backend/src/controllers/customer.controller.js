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

const getCustomersDetails = async (req, res) => {       //get Customer details 
    var userData = req.params.userData;
    await Customer.findOne({userData: userData})
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

const updateSelectedCustomer = async (req, res) => {       //update selected customer
    if (req.params && req.params.id) {
        const { id } = req.params;        // fetching the customer id 
        const customer = req.body;
        // const damageCost = req.body.damageCost;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No customer With that id');      // validating the customer id
        const updatedCustomer = await Customer.findByIdAndUpdate(id, {$set: {
            fullname: customer.fullname,
            address: customer.address,
            nicNo: customer.nicNo,
            mobileNumber: customer.mobileNumber,
            email: customer.email,
            password: customer.password
        }});      // find and update customer
        res.json(updatedCustomer);
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
    getCustomersDetails,
    getSelectedCustomerDetails,
    updateSelectedCustomer,
    deleteCustomer
};