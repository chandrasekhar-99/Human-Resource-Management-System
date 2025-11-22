const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../models');
const { error } = require('../utils/response');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return error(res, 'Authorization header missing or invalid', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the full user object from DB
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return error(res, 'User not found', 401);
    }

    req.user = user; 
    next();
  } catch (err) {
    return error(res, 'Invalid token', 401);
  }
};

module.exports = authMiddleware;
