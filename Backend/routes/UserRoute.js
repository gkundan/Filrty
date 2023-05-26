const express = require("express");
const { registerUser, logInUser } = require("../controllers/UserController");
const router = express.Router();

//
router.route("/register").post(registerUser);
//
router.route("/login").post(logInUser);

module.exports = router;
