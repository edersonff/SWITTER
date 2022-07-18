const crypt = require("bcrypt");
module.exports = async function hashPassword(password) {
  if(!password) return;
  const salt = await crypt.genSalt(10);
  return (hashedPassword = await crypt.hash(password, salt));
};
