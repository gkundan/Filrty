//Error Handler
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
//model
const User = require("../models/UserModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

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

//LogOut User
exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out !",
  });
});

//forgot password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      throw new ErrorHandler("User Not Found", 404);
    }

    //get resetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/password/reset/${resetToken}`;

    const message = `Your Password reset token is: ${resetPasswordUrl}. If you have not requested this email, please ignore it. Thank you.`;

    console.log(req.body);

    await sendEmail({
      email: user.email,
      subject: `Flirty Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email Sent to ${user.email} successfully!`,
    });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

//reset password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  //creating has token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  //find user from token
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("Reset Password Token is invalid or expire ", 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passowrd doesn't Password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});
