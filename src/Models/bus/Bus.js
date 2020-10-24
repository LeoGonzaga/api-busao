const mongoose = require("mongoose");

const BusSchema = new mongoose.Schema({
  hour: { type: Array, required: true },
  cityStart: { type: String, required: true },
  cityEnd: { type: String, required: true },
  value: { type: Number, required: true },
  citys: { type: Array },
  company: { type: String, required: true },
  days: { type: Object, required: true },
  holidays: { type: Boolean },
});

module.exports = mongoose.model("Bus", BusSchema);
