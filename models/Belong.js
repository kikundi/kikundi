const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const belongSchema = new Schema({
  idUser: {type: Schema.Types.ObjectId, ref:'User'},
  idGrupo: String,	
  idRole: {type: String, enum: ['Admin', 'Member']}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Belong = mongoose.model('Belong', belongSchema);
module.exports = Belong;