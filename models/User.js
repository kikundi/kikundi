const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String, 
  picture: String,
  phone: String,
  cardNumber: String,
  cardName: String,
  cardMonth: Number,
  cardYear: Number,
  status: {type: String, enum:["Pending confirmation", "Active"], default:"Pending confirmation"}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
