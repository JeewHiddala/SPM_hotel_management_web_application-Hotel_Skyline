
const mongoose = require("mongoose");
const Foodorder = require('../models/foodorder.model');

const createFoodOrder = async (req, res) => {
    if (req.body) {
        const foodorder = new Foodorder(req.body);
        foodorder.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllFoodOrderDetails = async (req, res) => {
    await Foodorder.find({})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getSelectedFoodOrderDetails = async (req, res) => {
    if (req.params && req.params.id) {
        await Foodorder.findById(req.params.id)
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

const deleteFoodOrder = async (req, res) => {
    if (req.params && req.params.id) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No food order with id: ${id}`);
        await Foodorder.findByIdAndRemove(id);
        res.json({ message: "food order deleted successfully." });
    }
}

module.exports = {
    createFoodOrder,
    getAllFoodOrderDetails,
    getSelectedFoodOrderDetails,
    deleteFoodOrder

};