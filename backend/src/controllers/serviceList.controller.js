const ServiceList = require('../models/serviceList.model');       //import ServiceList model
const mongoose = require("mongoose");

const createServiceList = async (req, res) => {       //create a ServiceList to db.
    if (req.body) {
        const serviceList = new ServiceList(req.body);
        serviceList.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllServiceListsDetails = async (req, res) => {       //get all ServiceList details.
    await ServiceList.find({}).populate('customerServices','serviceName date noOfHours price cost')
    .populate('bookingID','bookingNo')
    .populate({
        path: 'customerServices',
        populate: {
            path: 'serviceName'
        }
    })
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getSelectedServiceListDetails = async (req, res) => {  //get selected ServiceList details.
    if (req.params && req.params.id) {
        await ServiceList.findById(req.params.id).populate('customerServices','serviceName date noOfHours price cost')
        .populate({
            path: 'customerServices',
            populate: {
                path: 'serviceName'
            }
        })
            .then(data => {
                res.status(200).send({ data : data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const deleteServiceList = async (req, res) => {               // delete selected ServiceList.
    if (req.params && req.params.id) {
        const {id} = req.params;            // fetching the id of the ServiceList
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No ServiceList with id: ${id}`);       //validating the ServiceList id.
        await ServiceList.findByIdAndRemove(id);         // remove selected ServiceList details
        res.json({message: "ServiceList deleted successfully."}); // success message
    }
}

const updateSelectedServiceListDetails = async (req, res) => {       //update selected ServiceListDetails
    if (req.params && req.params.id){
        const {id} = req.params;        // fetching the id of the ServiceListDetails.
        const serviceList = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No ServiceList With That id');      // validating the ServiceListDetails id
        const updatedServiceList = await ServiceList.findByIdAndUpdate(id, serviceList,{new : true});      // find ServiceListDetails
        res.json(updatedServiceList);
    }
}

module.exports = {
    createServiceList,
    getAllServiceListsDetails,
    getSelectedServiceListDetails,
    updateSelectedServiceListDetails,
    deleteServiceList
};