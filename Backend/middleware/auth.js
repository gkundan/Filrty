//these all are the auth check code

const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

// check authentication
exports.isAuthenticateUser = catchAsyncError(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Extract token from the Authorization header
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    // Extract token from the cookie
    token = req.cookies.token;
  }

  if (!token) {
    return next(new ErrorHandler("Please LogIn to Access Resources!", 401));
  }

  try {
    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodeData.id);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid or expired token", 401));
  }
});

// check the user is admin or a user
exports.authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role && req.user.role !== "Admin") {
      return next(
        new ErrorHandler(
          `User role '${req.user.role}' not authorized to access this resource.`,
          403
        )
      );
    }
    next();
  };
};
