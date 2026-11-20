const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/NextGen-Hire";

mongoose.connect(mongoURI)
    .then(() => {
        console.log("Connected to MongoDB successfully.");
    })
    .catch((err) => {
        console.error("MongoDB connection warning / error:", err.message);
    });
