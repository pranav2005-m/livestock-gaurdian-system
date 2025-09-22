const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema({
  animalId: { type: mongoose.Schema.Types.ObjectId, ref: "Animal" },
  temperature: Number,
  heartRate: Number,
  pressure: Number,
  location: { lat: Number, lng: Number },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SensorData", sensorSchema);
