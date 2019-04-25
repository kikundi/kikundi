const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const paymentSchema = new Schema({
  idUser: {type: Schema.Types.ObjectId, ref:'User'},
  idGrupo: {type: Schema.Types.ObjectId, ref:'Group'},	
  idGroupLeader: {type: Schema.Types.ObjectId, ref:'User'},
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