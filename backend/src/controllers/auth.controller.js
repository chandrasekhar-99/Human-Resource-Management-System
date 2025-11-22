const User = require('../models/user.model');
const generateToken = require('../utils/token');
const {hashPassword, comparePassword} = require('../utils/hash');
const {success, error} = require('../utils/response');


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

    return success(res, "User registered successfully", { token }, 201);
  } catch (err) {
    console.log(err);
    return error(res, "Internal Server Error", 500);
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
    return success(res, "Login successful", { token }, 200);
  } catch (err) {
    return error(res, "Internal Server Error", 500);
  }
};

const logout = async (req, res) => {
  return success(res, "Logout successful", null, 200);
};
module.exports = {signUp, login, logout};