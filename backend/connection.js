const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Direct MongoDB URL  add 
const mongoURL = "mongodb+srv://Shivam:Shivam@cluster0.yk4kdyt.mongodb.net/mydb1100?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Database connected successfully");
})
.catch((err) => {
  console.error("Database connection failed:", err);
});

module.exports = mongoose;
