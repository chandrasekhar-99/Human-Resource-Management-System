const User = require('../models/user.model');
const {generateToken} = require('../utils/token');
const {hashPassword, comparePassword} = require('../utils/hash');
const {success, error} = require('../utils/response');
const {addLog} = require('../utils/activityLog');


const signUp = async (req, res) => {
  try {
    const {name, email, password} = req.body;

    const existingUser = await User.findOne({where: {email}});

    if (existingUser) {
      return error(res, "User already exists", 400);
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({name, email, password: hashedPassword});
    const token = generateToken(newUser);

    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax' });

    return success(res, "User registered successfully", { user: newUser }, 201);
  } catch (err) {
    console.log(err);
    return error(res, err.message);
  }
};


const login = async (req, res) => {
  try {
    const {email, password} = req.body; 
    const user = await User.findOne({where: {email}});

    if (!user) {
      return error(res, "Invalid email or password", 400);
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return error(res, "Invalid email or password", 400);
    }

    const token = generateToken(user);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
    });
    
    await addLog(user.id, `logged in.`);
    return success(res, "Login successful", { user }, 200);
  } catch (err) {
    return error(res, err.message);
  }
};

const logout = async (req, res) => {
  try{
    if (!req.user)
      return error(res, 'Unauthenticated', 401);

    res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax' });
    
    await addLog(req.user.id, `logged out.`);
    return success(res, "Logout successful", null, 200);
  } catch (err) {
    return error(res, err.message);
  }
};

const me = async (req, res) => {
  try {
    if (!req.user) return error(res, "Unauthorized", 401);

    return success(res, "User info", {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role
    });
  } catch (err) {
    return error(res, err.message, 500);
  }
};

module.exports = {signUp, login, logout, me};