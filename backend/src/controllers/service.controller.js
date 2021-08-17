const Service = require('../models/service.model');       //import employee model
const mongoose = require("mongoose");

const createService = async (req, res) => {       //create a service to db.
    if (req.body) {
        const service = new Service(req.body);
        service.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllServicesDetails = async (req, res) => {       //get all services details.
    await Service.find({})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getSelectedServiceDetails = async (req, res) => {          //get selected service details.
    if (req.params && req.params.id) {
        await Service.findById(req.params.id)
            .then(data => {
                res.status(200).send({ data : data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const deleteService = async (req, res) => {               // delete selected service.
    if (req.params && req.params.id) {
        const {id} = req.params;            // fetching the id of the service
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No service with id: ${id}`);       //validating the service id.
        await Service.findByIdAndRemove(id);         // find service and remove service.
        res.json({message: "Service deleted successfully."});
    }
}

module.exports = {
    createService,
    getAllServicesDetails,
    getSelectedServiceDetails,
    deleteService
};