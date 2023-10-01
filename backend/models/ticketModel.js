const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product: {
      type: String,
      required: [true, "please select a  product"],
    },
    problem: {
      type: String,
      required: [true, "please enter a description of the issue"],
    },
    purchase_date: {
      type: String,
      required: false,
    },
    serial: {
      type: String,
      required: false,
    },
    note: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "rejected", "closed"],
      default: "active",
    },
    // created_date: {
    //   type: String,
    //   required: [false, "created date is missing"],
    // },
    // created_time: {
    //   type: String,
    //   required: [false, "created date is missing"],
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);
