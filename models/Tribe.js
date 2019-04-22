const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const tribeSchema = new Schema({
  name: String,
  leader: [{ type : Schema.Types.ObjectId, ref: "User" }], 
  status: String
});

const Tribe = mongoose.model("Tribe", tribeSchema);
module.exports = Tribe;