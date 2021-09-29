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
    let page = req.query.page; 
    const options = {
        page: page,
        limit: 5
      }
    await Service.paginate({},options)         //pagination
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getAllServicesDetailsForReceptionist = async (req, res) => {       //get all services details.
    await Service.find({})         //pagination
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

const getSearchedServiceDetailsByNo = async (req, res) => {          //get selected search details. //search
    var serviceNo = req.params.serviceNo;
    await Service.findOne({serviceNo: serviceNo})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const deleteService = async (req, res) => {               // delete selected service.
    if (req.params && req.params.id) {
        const {id} = req.params;            // fetching the id of the service
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No service with id: ${id}`);       //validating the service id.
        await Service.findByIdAndRemove(id);         // find service and remove service.
        res.json({message: "Service deleted successfully."});
    }
}

const updateSelectedServiceDetails = async (req, res) => {       //update selected service
    if (req.params && req.params.id){
        const {id} = req.params;        // fetching the id of the service.
        const service = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No service With That id');      // validating the service id
        const updatedService = await Service.findByIdAndUpdate(id, service,{new : true});      // find service and service editor
        res.json(updatedService);
    }
}

module.exports = {
    createService,
    getAllServicesDetails,
    getSelectedServiceDetails,
    getAllServicesDetailsForReceptionist,
    getSearchedServiceDetailsByNo,
    updateSelectedServiceDetails,
    deleteService
};