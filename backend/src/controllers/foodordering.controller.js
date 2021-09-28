const mongoose = require("mongoose");
const Foodordering = require('../models/foodOrdering.model');


const createFoodOrdering = async (req, res) => {       //create a IngredientOrder to db.
    if (req.body) {
        const foodOrdering = new Foodordering(req.body);
        foodOrdering.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}




const getFoodsInOrdering = async (req, res) => {       //get all Ingredient details.
    
    var orderNo = req.params.orderNo;
    console.log(orderNo);

    await Foodordering.find({ orderId: orderNo })
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}


const searchFoodOrderDetailsByOrderId = async (req, res) => {          
    var orderId = req.params.orderId;
    await Foodordering.findOne({orderId: orderId}).populate('foodorders', 'price quantity pricenquantity')
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}


const getAllFoodOrderingDetails = async (req, res) => {   
    // let page = req.query.page; 
    // var abc = [{ path: 'ingredients', select: 'ingredientName quantity chefName' },{ path: 'chefName', select: 'name' }];
   
    // const options = {
    //     page: page,
    //     populate: abc,   
    //     limit: 5
    //   }
      
    // console.log("Page", req.query.page);      //get all IngredientOrder details.


    await Foodordering.find({}).populate('foodorders','foodName quantity price pricenquantity totalPrice')
  
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}


// const getAllDetailsPaginate = async (req, res) => {
//     let page = req.query.page; 
//     const options = {
//         page: page,
//         limit: 5
//       }
//       await Foodordering.paginate({},options)

//         .then(data => {
//             res.status(200).send({ data: data });
//         })
//         .catch(error => {
//             res.status(500).send({ error: error.message });
//         });
// }


const calculateOrderCharge = async (req, res) => {
    // var orderId = req.params.orderId;
    // console.log(orderId);
   
    //   const foodorder = await Foodorder.find({orderId: orderNo })
     
    if (req.params && req.params.id) {
      const foodOrdering = await Foodordering.findById(req.params.id).populate('foodorders', 'price quantity pricenquantity')
     
      let totalPrice = 0;
      
      if (foodOrdering.foodorders.length > 0) {
        foodOrdering.foodorders.map((foodorder) => {
         
          totalPrice += (foodorder.pricenquantity) 
         
        });
      }
      res.status(200).send({ totalPrice: totalPrice });
   }
  }
  

const getSelectedFoodOrderingDetails = async (req, res) => {          //get selected IngredientOrder details.
    if (req.params && req.params.id) {
        await Foodordering.findById(req.params.id).populate('foodorders','foodName quantity price pricenquantity')
      
    
            .then(data => {
                res.status(200).send({ data : data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const deleteFoodOrdering = async (req, res) => {               // delete selected IngredientOrder.
    if (req.params && req.params.id) {
        const {id} = req.params;            // fetching the id of the IngredientOrder
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No order with id: ${id}`);       //validating the IngredientOrder id.
        await Foodordering.findByIdAndRemove(id);         // remove selected IngredientOrder details
        res.json({message: "Ordered item deleted successfully."}); // success message
    }
}


const updateSelectedFoodOrderingDetails = async (req, res) => {       //update selected editor
    if (req.params && req.params.id){
        const {id} = req.params;        // fetching the id of the editor.
        const foodOrdering = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No foodorder With That id');      // validating the room id
        const updatedFoodordering = await Foodordering.findByIdAndUpdate(id, foodOrdering,{new : true});      // find room and room editor
        res.json(updatedFoodordering);
    }
}


module.exports = {
    createFoodOrdering,
    getAllFoodOrderingDetails,
    getSelectedFoodOrderingDetails,
    calculateOrderCharge,
    updateSelectedFoodOrderingDetails,
    getFoodsInOrdering,
    searchFoodOrderDetailsByOrderId,
    // getAllDetailsPaginate,
    deleteFoodOrdering
};
