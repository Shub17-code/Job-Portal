export const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  path: "/",
};

export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();
  const options = {
    ...cookieOptions,
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    ),
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};
