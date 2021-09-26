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
    let page = req.query.page; 
    var abc = ({ path: 'chefName', select: 'name' });
    const options = {
        page: page,
        populate: abc,
        limit: 5
      }
    console.log("Page", req.query.page);  
    await Food.paginate({},options)
        .then(data => {
            res.status(200).send({ data: data });
        })
        // .catch(error => {
        //     res.status(500).send({ error: error.message });
        // });
}

const getSelectedFoodDetails = async (req, res) => {          //get selected food details.
    if (req.params && req.params.id) {
        await Food.findById(req.params.id).populate('chefName','name')
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
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No food with id: ${id}`);       //validating the food id.
        await Food.findByIdAndRemove(id);         // remove selected food details
        res.json({message: "Food deleted successfully."}); // success message
    }
}

const updateSelectedFoodDetails = async (req, res) => {       //update selected food
    if (req.params && req.params.id){
        const {id} = req.params;        // fetching the id of the food.
        const food = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Food With that id');      // validating the food id
        const updatedFood = await Food.findByIdAndUpdate(id, food,{new : true});      // find food 
        res.json(updatedFood);
    }
}

const getSearchedFoodDetailsByNo = async (req, res) => {          //get selected food details. //search
    var foodNumber = req.params.foodNumber;
    await Food.findOne({foodNumber: foodNumber}).populate('chefName','name')
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

module.exports = {
    createFood,
    getAllFoodsDetails,
    getSelectedFoodDetails,
    updateSelectedFoodDetails,
    deleteFood,
    getSearchedFoodDetailsByNo
};