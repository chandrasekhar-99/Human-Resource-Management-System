const { verifyToken } = require('../utils/token');
const { User } = require('../models');
const { error } = require('../utils/response');

module.exports = async (req, res, next) => {
  try {
    
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
      return error(res, 'No token provided', 401);
    }
    
    const payload = verifyToken(token);

 
    const user = await User.findByPk(payload.id);
    if (!user) return error(res, 'Invalid token user', 401);

  
    req.user = { id: user.id, email: user.email, role: user.role || 'user' };

    next();
  } catch (err) {
    console.error('Auth Middleware Error:', err.message);
    return error(res, 'Invalid or expired token', 401);
  }
};
