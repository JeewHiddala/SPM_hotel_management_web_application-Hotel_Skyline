const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const CashPaymentSchema = new mongoose.Schema({
    billNo: { type: String, required: true, trim: true },
    totalBillValue: { type: Number, required: true },
    receptionistName: { type: String, trim: true },
    paymentDate: { type: Date },
    remarks: { type: String, required: true, trim: true }
});

CashPaymentSchema.plugin(mongoosePaginate);
const CashPayment = mongoose.model('cashpayments', CashPaymentSchema);
module.exports = CashPayment;