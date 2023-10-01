const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add a name"],
    },
    surname: {
      type: String,
      required: [true, "please add a surname"],
    },
    email: {
      type: String,
      required: [true, "please add  email"],
    },
    phoneNo: {
      type: String,
      required: [true, "please add  phone number"],
    },
    phoneNo2: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: [true, "please add  city"],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    password: {
      type: String,
      required: [true, "please add a password"],
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("User", userSchema);
