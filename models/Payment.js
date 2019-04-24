const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const paymentSchema = new Schema({
  idUser: String,
  idGrupo: String,	
  idGroupLeader: String,
  quota: Number,
  status: String,
  limitDay: Date,
  invoice: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;