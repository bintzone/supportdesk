const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
// @get  user ticket
// @route get/api/tickets
// acess private
const getTickets = asyncHandler(async (req, res) => {
  // get user using th eid jwt
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  const tickets = await Ticket.find({ user: req.user.id });
  res.status(200).json(tickets);
});

// @get  user ticket
// @route post/api/tickets
// acess private
const createTicket = asyncHandler(async (req, res) => {
  const { product, problem, purchase_date, serial, note } = req.body;
  if (!product || !problem) {
    res.status(400);
    throw new Error("please add product and issue");
  }
  // get user using th eid jwt
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  const ticket = await Ticket.create({
    product,
    problem,
    user: req.user.id,
    purchase_date,
    serial,
    note,
    // created_date,
    // created_time,
    status: "active",
  });
  res.status(201).json(ticket);
});
// @get  user ticket
// @route get/api/tickets
// acess private
const getTicket = asyncHandler(async (req, res) => {
  // get user using th eid jwt
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("ticket not found");
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("not authorized");
  }

  res.status(200).json(ticket);
});

// delete
const deleteTicket = asyncHandler(async (req, res) => {
  // get user using th eid jwt
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("ticket not found");
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("not authorized");
  }
  await ticket.deleteOne();
  res.status(200).json({ success: true });
});
// @get  user ticket
// @route put/api/tickets
// acess private
const updateTicket = asyncHandler(async (req, res) => {
  // get user using th eid jwt
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("user not found");
    ("");
  }
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("ticket not found");
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("not authorized");
  }
  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedTicket);
});

module.exports = {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
};
