const express = require("express");
const router = express.Router();
const {
  registerUser,
  logInUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/UserController");
const { isAuthenticateUser, authorizeRole } = require("../middleware/auth");

// Register
router.route("/register").post(registerUser);

// Login
router.route("/login").post(logInUser);

// Forgot password
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

// Logout
router.route("/logout").get(logout);

// User detail
router.route("/me").get(isAuthenticateUser, getUserDetails);
router.route("/me/update").put(isAuthenticateUser, updateProfile);
router.route("/password/update").put(isAuthenticateUser, updatePassword);

// User detail (admin)
router
  .route("/admin/users")
  .get(isAuthenticateUser, authorizeRole("admin"), getAllUsers);

// User detail single (admin)
router
  .route("/admin/user/:id")
  .get(isAuthenticateUser, authorizeRole("admin"), getSingleUser)
  .put(isAuthenticateUser, authorizeRole("admin"), updateUserRole)
  .delete(isAuthenticateUser, authorizeRole("admin"), deleteUser);

module.exports = router;
