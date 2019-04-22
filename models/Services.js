const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  platform: String,
});

const Service = mongoose.model("Tribe", serviceSchema);
module.exports = Service;