const bcrypt = require('bcryptjs');
require('dotenv').config();

const hashPassword = async (password) => {
  const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '10', 10);
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = { hashPassword, comparePassword };