
const mongoose = require("mongoose");
const CreditPayment = require('../models/creditpayment.model');

const createCreditPayment = async (req, res) => {
    if (req.body) {
        const creditpayment = new CreditPayment(req.body);
        creditpayment.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}



const getAllCreditPaymentDetails = async (req, res) => {
    let page = req.query.page; 
    const options = {
        page: page,
        limit: 5
      }
    await CreditPayment.paginate({},options)
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}



const getSelectedCreditPaymentDetails = async (req, res) => {
    if (req.params && req.params.id) {
        await CreditPayment.findById(req.params.id)
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const deleteCreditPayment = async (req, res) => {
    if (req.params && req.params.id) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No credit payment with id: ${id}`);
        await CreditPayment.findByIdAndRemove(id);
        res.json({ message: "Credit payment removed successfully." });
    }
}

module.exports = {
    createCreditPayment,
    getAllCreditPaymentDetails,
    getSelectedCreditPaymentDetails,
    deleteCreditPayment
};