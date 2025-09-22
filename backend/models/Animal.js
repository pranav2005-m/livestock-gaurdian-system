const mongoose = require("mongoose");

const AnimalSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // FIXED
    type: { type: String, required: true }, // cow, goat, buffalo
    name: { type: String, required: true },
    milkLitre: { type: Number, default: 0 },
    vaccination: { type: String, default: "Not Provided" },
    zoneLocation: {
      northEast: { type: [Number], default: null }, // [lat, lng]
      southWest: { type: [Number], default: null }, // [lat, lng]
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Animal", AnimalSchema);
