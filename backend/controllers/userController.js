const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// register a new user
// @route /api/users
// acess public
const registerUser = asyncHandler(async (req, res) => {
  const { name, surname, email, phoneNo, phoneNo2, password, city } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("pls include all fields");
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("user already exist");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    email,
    surname,
    phoneNo2,
    city,
    phoneNo: phoneNo,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      surname: user.surname,
      phoneNo2: user.phoneNo2,
      city: user.city,
      phoneNo: user.phoneNo,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invailed Data");
  }
  res.send(req.body);
});
// @desc login a  user
// @route /api/users/login
// acess public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      surname: user.surname,
      phoneNo2: user.phoneNo2,
      city: user.city,
      phoneNo: user.phoneNo,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("user doest not exist");
  }
});
// @desc update a  user
// @route PUT/api/users/login
// acess public
const updateUser = asyncHandler(async (req, res) => {
  // get user using th eid jwt
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  const ticket = await User.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("ticket not found");
  }
  if (ticket._id.toString() !== req.user.id) {
    res.status(401);
    throw new Error("not authorized");
  }
  const updatedTicket = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedTicket);
});

// @get current user
// @route /api/users/me
// acess private
const getME = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    phoneNo: req.user.phoneNo,
  };
  res.status(200).json(user);
});
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
module.exports = {
  registerUser,
  loginUser,
  updateUser,
  getME,
};
