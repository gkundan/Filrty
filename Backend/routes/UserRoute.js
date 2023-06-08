const express = require("express");
const {
  registerUser,
  logInUser,
  logout,
  forgotPassword,
  resetPassword,
} = require("../controllers/UserController");
const router = express.Router();

//register
router.route("/register").post(registerUser);

//login
router.route("/login").post(logInUser);

//forgot password
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
//logout
router.route("/logout").get(logout);

module.exports = router;
