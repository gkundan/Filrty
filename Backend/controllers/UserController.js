//Error Handler
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
//model
const User = require("../models/UserModel");
const sendToken = require("../utils/jwtToken");

//register a user
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      //temp data
      public_id: "sample Id",
      url: "profilePicUrl",
    },
  });

  sendToken(user, 201, res);
});

//log in user
exports.logInUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // Checking if user has given both email and password
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});
