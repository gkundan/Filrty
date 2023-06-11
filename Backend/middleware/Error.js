const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("./catchAsyncError");

// Error handling middleware
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong MongoDB id error (CastError)
  if (err.name === "CastError") {
    const message = `Resource not found: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  ///wrong jwt token
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is Invalid, Try Again!`;
    err = new ErrorHandler(message, 400);
  }
  /// jwt token expire
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Invalid, Try Again!`;
    err = new ErrorHandler(message, 400);
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
};


