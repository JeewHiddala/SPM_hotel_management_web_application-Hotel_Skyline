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


const getFoodsInOrder = async (req, res) => {       //get all Ingredient details.
    
    var orderNo = req.params.orderNo;
    console.log(orderNo);

    await Foodorder.find({ orderId: orderNo })
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}


const getAllFoodOrderDetails = async (req, res) => {
    
    let page = req.query.page; 
    const options = {
        page: page,
        limit: 5
      }
    // await Foodorder.find({})
    await Foodorder.paginate({},options)
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

const updateSelectedFoodOrderDetails = async (req, res) => {       //update selected editor
    if (req.params && req.params.id){
        const {id} = req.params;        // fetching the id of the editor.
        const foodorder = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No foodorder With That id');      // validating the room id
        const updatedFoodorder = await Foodorder.findByIdAndUpdate(id, foodorder,{new : true});      // find room and room editor
        res.json(updatedFoodorder);
    }
}



const deleteFoodOrder = async (req, res) => {
    if (req.params && req.params.id) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No food order with id: ${id}`);
        await Foodorder.findByIdAndRemove(id);
        res.json({ message: "food order deleted successfully." });
    }
}

// const getChargeForOrder = async (req, res) => {
//     var orderNo = req.params.orderNo;
//     console.log(orderNo);
   
//       const foodorder = await Foodorder.find({orderId: orderNo }).populate('foodorders', 'price quantity pricenquantity')
     
//       let totalPrice = 0;
      
//       if (foodorder.foodorderings.length > 0) {
//         foodorder.foodorderings.map((foodordering) => {
         
//           totalPrice += (foodordering.pricenquantity) 
         
//         });
//       }
//       res.status(200).send({ totalPrice: totalPrice });
    
//   }
  

// const getChargeForOrder = async (req, res) => {       
    
//     var orderNo = req.params.orderNo;
//     console.log(orderNo);

//     await Foodorder.find({ orderId: orderNo })
//         .then(data => {
//             res.status(200).send({ data: data });
//         })
//         .catch(error => {
//             res.status(500).send({ error: error.message });
//         });
// }


module.exports = {
    createFoodOrder,
    getAllFoodOrderDetails,
    getSelectedFoodOrderDetails,
    updateSelectedFoodOrderDetails,
    getFoodsInOrder,
    // getChargeForOrder,
    deleteFoodOrder

};