const jwt = require('jsonwebtoken');
require('dotenv').config();


if (!process.env.JWT_SECRET) {
  console.error("ERROR: JWT_SECRET missing in .env");
}



const generateToken = (user) => {
  if(!user || !user.id || !user.email) {
    throw new Error('Invalid user object for token generation');
  }

  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d'
    }
  );
};

const verifyToken = (token) => {
  if (!token || typeof token !== 'string') {
    throw new Error('Invalid token');
  }
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };