// const Animal = require("../models/Animal");
// const SensorData = require("../models/SensorData");

// /**
//  * Create a new animal (cow, goat, buffalo)
//  */
// exports.createAnimal = async (req, res) => {
//   try {
//     const { userId, type, name, milkLitre, vaccination, zoneLocation } = req.body;

//     // Validation
//     if (!userId || !type || !name) {
//       return res.status(400).json({ msg: "userId, type, and name are required" });
//     }

//     // Create animal
//     const animal = new Animal({
//       userId,
//       type,
//       name,
//       milkLitre: milkLitre || 0,
//       vaccination: vaccination || "",
//       zoneLocation: zoneLocation || null, // { northEast: [lat,lng], southWest: [lat,lng] }
//     });

//     await animal.save();
//     res.json({ msg: "Animal created successfully", animal });
//   } catch (err) {
//     res.status(500).json({ msg: "Error creating animal", error: err.message });
//   }
// };

// /**
//  * Get all animals of a specific user
//  */
// exports.getMyAnimals = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     if (!userId) return res.status(400).json({ msg: "userId required" });

//     const animals = await Animal.find({ userId });
//     res.json(animals);
//   } catch (err) {
//     res.status(500).json({ msg: "Error fetching animals", error: err.message });
//   }
// };

// /**
//  * Get full details of a specific animal + latest 10 sensor readings
//  */
// exports.getAnimalDetails = async (req, res) => {
//   try {
//     const { animalId } = req.params;
//     if (!animalId) return res.status(400).json({ msg: "animalId required" });

//     const animal = await Animal.findById(animalId);
//     if (!animal) return res.status(404).json({ msg: "Animal not found" });

//     // Fetch latest 10 sensor readings
//     const sensors = await SensorData.find({ animalId })
//       .sort({ createdAt: -1 })
//       .limit(10);

//     res.json({ animal, sensors });
//   } catch (err) {
//     res.status(500).json({ msg: "Error fetching animal details", error: err.message });
//   }
// };
const Animal = require("../models/Animal");
const SensorData = require("../models/SensorData");

/**
 * Create a new animal (cow, goat, buffalo)
 */
exports.createAnimal = async (req, res) => {
  try {
    const { userId, type, name, milkLitre, vaccination, zoneLocation } = req.body;

    // Validation
    if (!userId || !type || !name) {
      return res.status(400).json({ msg: "userId, type, and name are required" });
    }

    // Create animal
    const animal = new Animal({
      userId,
      type,
      name,
      milkLitre: milkLitre || 0,
      vaccination: vaccination || "",
      zoneLocation: zoneLocation || null, // { northEast: [lat,lng], southWest: [lat,lng] }
    });

    await animal.save();
    res.json({ msg: "Animal created successfully", animal });
  } catch (err) {
    res.status(500).json({ msg: "Error creating animal", error: err.message });
  }
};

/**
 * Get all animals of a specific user
 */
exports.getMyAnimals = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ msg: "userId required" });

    const animals = await Animal.find({ userId });
    res.json(animals);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching animals", error: err.message });
  }
};

/**
 * Get full details of a specific animal + latest 10 sensor readings
 */
exports.getAnimalDetails = async (req, res) => {
  try {
    const { animalId } = req.params;
    if (!animalId) return res.status(400).json({ msg: "animalId required" });

    const animal = await Animal.findById(animalId);
    if (!animal) return res.status(404).json({ msg: "Animal not found" });

    // Fetch latest 10 sensor readings
    const sensors = await SensorData.find({ animalId })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({ animal, sensors });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching animal details", error: err.message });
  }
};

/**
 * Delete an animal by ID
 */
exports.deleteAnimal = async (req, res) => {
  try {
    const { animalId } = req.params;
    const { userId } = req.body; // Get userId from request body for ownership validation

    if (!animalId) {
      return res.status(400).json({ msg: "animalId required" });
    }

    // Find the animal first to check ownership
    const animal = await Animal.findById(animalId);
    if (!animal) {
      return res.status(404).json({ msg: "Animal not found" });
    }

    // Check if the animal belongs to the requesting user (optional but recommended for security)
    if (userId && animal.userId.toString() !== userId) {
      return res.status(403).json({ msg: "Not authorized to delete this animal" });
    }

    // Delete associated sensor data first (cascade deletion)
    const deletedSensors = await SensorData.deleteMany({ animalId });

    // Delete the animal
    await Animal.findByIdAndDelete(animalId);

    res.json({ 
      msg: "Animal deleted successfully", 
      animalId,
      deletedSensorsCount: deletedSensors.deletedCount
    });

  } catch (err) {
    res.status(500).json({ msg: "Error deleting animal", error: err.message });
  }
};

/**
 * Update an animal's information
 */
exports.updateAnimal = async (req, res) => {
  try {
    const { animalId } = req.params;
    const { userId, type, name, milkLitre, vaccination, zoneLocation } = req.body;

    if (!animalId) {
      return res.status(400).json({ msg: "animalId required" });
    }

    // Find the animal first
    const animal = await Animal.findById(animalId);
    if (!animal) {
      return res.status(404).json({ msg: "Animal not found" });
    }

    // Check ownership (optional but recommended)
    if (userId && animal.userId.toString() !== userId) {
      return res.status(403).json({ msg: "Not authorized to update this animal" });
    }

    // Update the animal
    const updatedAnimal = await Animal.findByIdAndUpdate(
      animalId,
      {
        ...(type && { type }),
        ...(name && { name }),
        ...(milkLitre !== undefined && { milkLitre }),
        ...(vaccination !== undefined && { vaccination }),
        ...(zoneLocation !== undefined && { zoneLocation })
      },
      { new: true, runValidators: true }
    );

    res.json({ 
      msg: "Animal updated successfully", 
      animal: updatedAnimal 
    });

  } catch (err) {
    res.status(500).json({ msg: "Error updating animal", error: err.message });
  }
};

/**
 * Get a single animal by ID (without sensor data)
 */
exports.getAnimalById = async (req, res) => {
  try {
    const { animalId } = req.params;
    const { userId } = req.query; // Optional: for ownership validation

    if (!animalId) {
      return res.status(400).json({ msg: "animalId required" });
    }

    const animal = await Animal.findById(animalId);
    if (!animal) {
      return res.status(404).json({ msg: "Animal not found" });
    }

    // Optional ownership check
    if (userId && animal.userId.toString() !== userId) {
      return res.status(403).json({ msg: "Not authorized to view this animal" });
    }

    res.json({ animal });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching animal", error: err.message });
  }
};