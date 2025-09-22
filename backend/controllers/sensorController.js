const SensorData = require("../models/SensorData");
const Animal = require("../models/Animal");
const { sendAlertIfNeeded } = require("../utils/alertChecker");

exports.addSensorData = async (req, res) => {
  try {
    const { animalId, temperature, heartRate, pressure, location } = req.body;

    if (!animalId || !location || location.lat == null || location.lng == null) {
      return res.status(400).json({ msg: "animalId and location (lat, lng) are required" });
    }

    const data = new SensorData({ animalId, temperature, heartRate, pressure, location });
    await data.save();

    console.log("✅ Sensor data saved:", data);

    const animal = await Animal.findById(animalId).populate("userId");
    if (!animal) return res.status(404).json({ msg: "Animal not found" });

    // Check for alerts
    await sendAlertIfNeeded(animal, data);

    res.json({ msg: "Sensor data added successfully", data });
  } catch (err) {
    console.error("❌ SensorController Error:", err.message);
    res.status(500).json({ msg: "Error adding sensor data", error: err.message });
  }
};
