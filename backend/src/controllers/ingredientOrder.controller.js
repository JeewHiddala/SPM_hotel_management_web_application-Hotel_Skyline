const IngredientOrder = require('../models/ingredientOrder.model');       //import IngredientOrder model
const mongoose = require("mongoose");

const createIngredientOrder = async (req, res) => {       //create a IngredientOrder to db.
    if (req.body) {
        const ingredientOrder = new IngredientOrder(req.body);
        ingredientOrder.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllIngredientOrdersDetails = async (req, res) => {       //get all IngredientOrder details.
    await IngredientOrder.find({}).populate('ingredients','name quantity chefName')
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getSelectedIngredientOrderDetails = async (req, res) => {          //get selected IngredientOrder details.
    if (req.params && req.params.id) {
        await IngredientOrder.findById(req.params.id).populate('ingredients','name quantity chefName')
            .then(data => {
                res.status(200).send({ data : data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const deleteIngredientOrder = async (req, res) => {               // delete selected IngredientOrder.
    if (req.params && req.params.id) {
        const {id} = req.params;            // fetching the id of the IngredientOrder
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No IngredientOrder with id: ${id}`);       //validating the IngredientOrder id.
        await IngredientOrder.findByIdAndRemove(id);         // remove selected IngredientOrder details
        res.json({message: "IngredientOrder deleted successfully."}); // success message
    }
}

module.exports = {
    createIngredientOrder,
    getAllIngredientOrdersDetails,
    getSelectedIngredientOrderDetails,
    deleteIngredientOrder
};