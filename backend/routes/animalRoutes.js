// const express = require("express");
// const router = express.Router();

// const {
//   createAnimal,
//   getMyAnimals,
//   getAnimalDetails   // <-- add this
// } = require("../controllers/animalController");

// // Create new animal
// router.post("/create", createAnimal);

// // Get all animals of a user
// router.get("/my/:userId", getMyAnimals);

// // Get animal details with sensor history
// router.get("/details/:animalId", getAnimalDetails);

// module.exports = router;
const express = require("express");
const router = express.Router();

const {
  createAnimal,
  getMyAnimals,
  getAnimalDetails,
  deleteAnimal  // <-- add this import
} = require("../controllers/animalController");

// Create new animal
router.post("/create", createAnimal);

// Get all animals of a user
router.get("/my/:userId", getMyAnimals);

// Get animal details with sensor history
router.get("/details/:animalId", getAnimalDetails);

// Delete an animal
router.delete("/delete/:animalId", deleteAnimal);  // <-- add this route

module.exports = router;