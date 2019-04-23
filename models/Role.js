const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const roleSchema = new Schema({
  name: String,
  picture: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Role = mongoose.model('Role', roleSchema);
module.exports = Role;
