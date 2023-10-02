const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`mango db connect: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(` eroor: ${error.message}`.red.underline);
  }
};

module.exports = connectDB;
