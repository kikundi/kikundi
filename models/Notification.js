const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const notificationSchema = new Schema({
  idUserFrom: {type: Schema.Types.ObjectId, ref:'User'},
  idUserTo: {type: Schema.Types.ObjectId, ref:'User'},	
  idGroup: {type: Schema.Types.ObjectId, ref:'Group'},
  status: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;