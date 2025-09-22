require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const animalRoutes = require("./routes/animalRoutes");
const sensorRoutes = require("./routes/sensorRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Debug: check env values
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);
console.log("Loaded PORT:", process.env.PORT);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/animals", animalRoutes);
app.use("/api/sensor", sensorRoutes);

// Connect DB and Start Server
connectDB().then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`🚀 Server running on port ${process.env.PORT}`)
  );
});
