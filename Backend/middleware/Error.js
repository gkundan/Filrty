const ErrorHandler = require("../utils/ErrorHandler");

// Error handling middleware

// **************/ //
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Serve Error";

  //wrong mongodb id error(CastError)
  if ((err.name = "CastError")) {
    const message = `Resource not Found ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
