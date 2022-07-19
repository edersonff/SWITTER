const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const env = require("dotenv").config().parsed;
module.exports = function generateToken(userCred) {
  const { email, password } = userCred;
  const token = jwt.sign(
    {
      email,
      password,
    },
    'f99@TK9asN&@'
  );

  return token;
};
