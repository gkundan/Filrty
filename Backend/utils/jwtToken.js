//just make jwt token
const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  // Calculate expiration time
  const expires = new Date(
    Date.now() + Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
  ).getTime();
  // Option for cookies
  const options = {
    expires,
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
