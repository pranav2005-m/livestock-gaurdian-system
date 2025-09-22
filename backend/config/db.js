const mongoose = require("mongoose");

const connectDB = () => {
  if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI not found in .env file");
    process.exit(1);
  }

  return mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("✅ MongoDB Connected...");
    })
    .catch((error) => {
      console.error("❌ DB Connection Error:", error.message);
      process.exit(1);
    });
};

module.exports = connectDB;
