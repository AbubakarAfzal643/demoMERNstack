const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    if (conn) {
      console.log("MongoDB connected successfully !!");
    } else {
      console.log("MongoDB not connected !!");
    }
  } catch (error) {
    console.log("Connection error : ", error);
  }
};

module.exports = connectDB;
