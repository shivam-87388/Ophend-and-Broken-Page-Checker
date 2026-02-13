const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then((result) => {
        console.log('database connected');
    }).catch((err) => {
        console.log(err);
    });

module.exports = mongoose;