const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const belongSchema = new Schema({
  idUser: String,
  idGrupo: String,	
  idRole: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Belong = mongoose.model('Belong', belongSchema);
module.exports = Belong;