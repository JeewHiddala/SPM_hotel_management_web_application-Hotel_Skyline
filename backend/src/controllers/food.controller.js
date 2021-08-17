const Food = require('../models/food.model');       //import food model
const mongoose = require("mongoose");

const createFood = async (req, res) => {       //create a food to db.
    if (req.body) {
        const food = new Food(req.body);
        food.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllFoodsDetails = async (req, res) => {       //get all foods details.
    await Food.find({})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getSelectedFoodDetails = async (req, res) => {          //get selected food details.
    if (req.params && req.params.id) {
        await Food.findById(req.params.id)
            .then(data => {
                res.status(200).send({ data : data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const deleteFood = async (req, res) => {               // delete selected food.
    if (req.params && req.params.id) {
        const {id} = req.params;            // fetching the id of the food
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No food with id: ${id}`);       //validating the employee id.
        await Food.findByIdAndRemove(id);         // remove selected food details
        res.json({message: "Food deleted successfully."});
    }
}

module.exports = {
    createFood,
    getAllFoodsDetails,
    getSelectedFoodDetails,
    deleteFood
};