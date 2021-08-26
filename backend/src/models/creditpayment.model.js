const mongoose = require('mongoose');

const CreditPaymentSchema = new mongoose.Schema({
    billNo: { type: String, required: true, trim: true },
    receptionistName: { type: String, trim: true },
    cardNo: { type: String, required: true, trim: true },
    amount: { type: Number, required: true },
    cvc: { type: Number, required: true },
    expireDate: { type: Date },
    holderName: { type: String, required: true, trim: true }
});
const CreditPayment = mongoose.model('creditpayments', CreditPaymentSchema);
module.exports = CreditPayment;