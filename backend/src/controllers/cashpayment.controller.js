
const mongoose = require("mongoose");
const CashPayment = require('../models/cashpayment.model');

const createCashPayment = async (req, res) => {
    if (req.body) {
        const cashpayment = new CashPayment(req.body);
        cashpayment.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}




const getAllCashPaymentDetails = async (req, res) => {
    let page = req.query.page; 
    const options = {
        page: page,
        limit: 5
      }
    await CashPayment.paginate({},options)
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}



const getSelectedCashPaymentDetails = async (req, res) => {
    if (req.params && req.params.id) {
        await CashPayment.findById(req.params.id)
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const deleteCashPayment = async (req, res) => {
    if (req.params && req.params.id) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No cash payment with id: ${id}`);
        await CashPayment.findByIdAndRemove(id);
        res.json({ message: "Cash payment removed successfully." });
    }
}

module.exports = {
    createCashPayment,
    getAllCashPaymentDetails,
    getSelectedCashPaymentDetails,
    deleteCashPayment
};