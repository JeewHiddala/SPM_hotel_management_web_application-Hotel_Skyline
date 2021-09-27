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

const getAllIngredientOrdersDetails = async (req, res) => {   
    await IngredientOrder.find({}).populate('ingredients','ingredientName quantity chefName')
    .populate({
        path: 'ingredients',
        populate: {
            path: 'chefName'
        }
    })
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}



const getSelectedIngredientOrderDetails = async (req, res) => {          //get selected IngredientOrder details.
    if (req.params && req.params.id) {
        await IngredientOrder.findById(req.params.id).populate('ingredients','ingredientName quantity chefName')
        .populate({
            path: 'ingredients',
            populate: {
                path: 'chefName'
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

const deleteIngredientOrder = async (req, res) => {               // delete selected IngredientOrder.
    if (req.params && req.params.id) {
        const {id} = req.params;            // fetching the id of the IngredientOrder
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No IngredientOrder with id: ${id}`);       //validating the IngredientOrder id.
        await IngredientOrder.findByIdAndRemove(id);         // remove selected IngredientOrder details
        res.json({message: "IngredientOrder deleted successfully."}); // success message
    }
}

const updateSelectedIngredientOrderDetails = async (req, res) => {       //update selected Ingredient,Order
    if (req.params && req.params.id){
        const {id} = req.params;        // fetching the id of the Ingredient.
        const ingredientOrder = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No IngredientOrder With That id');      // validating the Ingredient id
        const updatedIngredientOrder = await IngredientOrder.findByIdAndUpdate(id, ingredientOrder,{new : true})
        .populate('ingredients','ingredientName quantity chefName')
        .populate({
            path: 'ingredients',
            populate: {
                path: 'chefName'
        }});    
          // find Ingredient
        res.json(updatedIngredientOrder);
    }
}

const getSearchedIngredientOrderDetailsByNo = async (req, res) => {          //get selected IngredientOrder details. //search
    var orderNumber = req.params.orderNumber;
    await IngredientOrder.findOne({orderNumber: orderNumber}).populate('ingredients','ingredientName quantity chefName')
    .populate({
        path: 'ingredients',
        populate: {
            path: 'chefName'
        }
    })
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

module.exports = {
    createIngredientOrder,
    getAllIngredientOrdersDetails,
    getSelectedIngredientOrderDetails,
    updateSelectedIngredientOrderDetails,
    deleteIngredientOrder,
    getSearchedIngredientOrderDetailsByNo
};