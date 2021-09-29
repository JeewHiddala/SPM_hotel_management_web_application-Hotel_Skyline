const mongoose = require("mongoose");
const Kitchenorder = require('../models/kitchenorder.model');

const createKitchenOrder = async (req, res) => {
    if (req.body) {
        const kitchenorder = new Kitchenorder(req.body);
        kitchenorder.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllKitchenOrderDetails = async (req, res) => {

    await Kitchenorder.find({}).populate('foodorders','foodName quantity price pricenquantity')
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getSelectedKitchenOrderDetails = async (req, res) => {
    if (req.params && req.params.id) {
        await Kitchenorder.findById(req.params.id).populate('foodorders','foodName quantity price pricenquantity')
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}




// const updateSelectedReviewer = async (req, res) => {      
//     if (req.params && req.params.id){
//         const {id} = req.params;       
//         const reviewer = req.body;

//         if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No reviewer With That id');    
//         const updatedReviewer = await Reviewer.findByIdAndUpdate(id, reviewer,{new : true});      
//         res.json(updatedReviewer);
//     }
// }




const deleteKitchenOrder = async (req, res) => {
    if (req.params && req.params.id) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No food order with id: ${id}`);
        await Kitchenorder.findByIdAndRemove(id);
        res.json({ message: "order sent to kitchen deleted successfully." });
    }
}

module.exports = {
    createKitchenOrder,
    getAllKitchenOrderDetails,
    getSelectedKitchenOrderDetails,
    deleteKitchenOrder

};