const express = require("express");
const {
  registerUser,
  logInUser,
  logout,
} = require("../controllers/UserController");
const router = express.Router();

//
router.route("/register").post(registerUser);
//
router.route("/login").post(logInUser);
//
router.route("/logout").get(logout);
module.exports = router;
