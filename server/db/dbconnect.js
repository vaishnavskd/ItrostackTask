const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.MONGODB_URL
const connect = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to database");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
};

module.exports = connect
