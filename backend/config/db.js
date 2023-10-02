const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mango db connect: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(` eroor: ${error.message}`.red.underline);
  }
};

module.exports = connectDB;
