const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playSchema = new Schema({
  name: { type: String, required: true },
  score: { type: Number },
  km_left: { type: Number },
  placed_cities: { type: Array },
  current_city: { type: String },
  prev_coords: { type: Object },
  distance: { type: Number },
});

const Play = mongoose.model("Play", playSchema);

module.exports = Play;
