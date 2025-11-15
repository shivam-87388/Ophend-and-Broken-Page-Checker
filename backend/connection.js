const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = process.env.MONGO_URL;

if (!mongoURL) {
  console.error("Error: MONGO_URL is not defined in .env file");
  process.exit(1);
}

mongoose.connect(mongoURL)
.then(() => {
  console.log("Database connected successfully");
})
.catch((err) => {
  console.error("Database connection failed:", err);
});

module.exports = mongoose;
