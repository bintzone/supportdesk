const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getME,
  updateUser,
} = require("../controllers/userController");
const { protect } = require("../middleWare/authMiddleWare");
router.post("/", registerUser);

router.post("/login", loginUser);
router.get("/me", protect, getME);
router.put("/:id", protect, updateUser);
module.exports = router;
