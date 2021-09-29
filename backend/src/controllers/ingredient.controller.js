const Ingredient = require('../models/ingredient.model');       //import Ingredient model
const mongoose = require("mongoose");

const createIngredient = async (req, res) => {       //create a Ingredient to db.
    if (req.body) {
        const ingredient = new Ingredient(req.body);
        ingredient.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllIngredientsDetails = async (req, res) => {       //get all Ingredient details.
    await Ingredient.find({})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getIngredientsInOrder = async (req, res) => {       //get all Ingredient details.
    var orderNo = req.params.orderNo;
    console.log(orderNo);
    await Ingredient.find({ orderNumber: orderNo }).populate('chefName','name')
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getSelectedIngredientDetails = async (req, res) => {          //get selected Ingredient details.
    if (req.params && req.params.id) {
        await Ingredient.findById(req.params.id).populate('chefName','name')
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}


const deleteIngredient = async (req, res) => {               // delete selected Ingredient.
    if (req.params && req.params.id) {
        const { id } = req.params;            // fetching the id of the Ingredient
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Ingredient with id: ${id}`);       //validating the Ingredient id.
        await Ingredient.findByIdAndRemove(id);         // remove selected Ingredient details
        res.json({ message: "Ingredient deleted successfully." }); // success message
    }
}

const updateSelectedIngredientDetails = async (req, res) => {       //update selected Ingredient
    if (req.params && req.params.id){
        const {id} = req.params;        // fetching the id of the Ingredient.
        const ingredient = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Ingredient With That id');      // validating the Ingredient id
        const updatedIngredient = await Ingredient.findByIdAndUpdate(id, ingredient,{new : true}).populate('chefName','name');      // find Ingredient
        res.json(updatedIngredient);
    }
}

module.exports = {
    createIngredient,
    getAllIngredientsDetails,
    getIngredientsInOrder,
    getSelectedIngredientDetails,
    updateSelectedIngredientDetails,
    deleteIngredient
};