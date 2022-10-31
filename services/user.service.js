const User = require("../models/User");

exports.signupService = async (userInfo) => {
  const user = await User.create(userInfo);
  return user;
};

exports.findUserByEmailService = async (email) => {
  const user = await User.findOne({ email }).select({ password: 0 });
  return user;
};

exports.findUserByTokenService = async (token) => {
  const user = await User.findOne({ confirmationToken: token });
  return user;
};
