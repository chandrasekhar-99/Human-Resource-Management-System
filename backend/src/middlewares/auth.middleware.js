const { verifyToken } = require('../utils/token');
const { User } = require('../models');
const { error } = require('../utils/response');

module.exports = async (req, res, next) => {
  try {
    
    let token = null;
    const header = req.headers['authorization'];
    
    if (header) {
      const parts = header.split(' ');
      if (parts.length === 2 && parts[0] === 'Bearer') {
        token = parts[1];
      } else {
        return error(res, 'Invalid authorization format. Use Bearer <token>', 401);
      }
    } else if (req.query && req.query.token) {
      token = req.query.token;
    }

    if (!token) {
      return error(res, 'Token missing. Provide in Authorization header or ?token= query', 401);
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
