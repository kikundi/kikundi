const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const paymentSchema = new Schema({
  users: [{ type : Schema.Types.ObjectId, ref: "User" }],
  users: [{ type : Schema.Types.ObjectId, ref: "User" }], 
  deadline: Date,
  amount: Number,
  pending: Number
});

const Payment = mongoose.model("Tribe", paymentSchema);
module.exports = Payment;