const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const CreditPaymentSchema = new mongoose.Schema({
    billNo: { type: String, required: true, trim: true },
    receptionistName: { type: String, trim: true },
    cardNo: { type: String, required: true, trim: true },
    amount: { type: Number, required: true },
    cvc: { type: Number, required: true },
    expireDate: { type: Date },
    holderName: { type: String, required: true, trim: true }
});

CreditPaymentSchema.plugin(mongoosePaginate);
const CreditPayment = mongoose.model('creditpayments', CreditPaymentSchema);
module.exports = CreditPayment;