const {Team} = require('../models');
const {success, error} = require('../utils/response');


const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.findAll();
    return success(res, 'Teams retrieved successfully', teams, 200);
  } catch (err) {
    console.log("getAllTeams error:", err);
    return error(res, 'Server error', 500);
  }
};

const createTeam = async (req, res) => {
  try {
    const {name, description} = req.body;

    if (!name || !description) {
      return error(res, 'Name and description are required', 400);
    }

    const createdBy = req.user.id;

    const newTeam = await Team.create({name, description, createdBy});
    
    return success(res, 'Team created successfully', newTeam, 201);
  } catch (err) {
    console.log("createTeam error:", err);
    return error(res, 'Server error', 500);
  }
};

const deleteTeam = async (req, res) => {
  try {
    const {id} = req.params;
    const team = await Team.findByPk(id);
    if (!team) {
      return error(res, 'Team not found', 404);
    }
    await team.destroy();
    return success(res, 'Team deleted successfully', null, 200);
  } catch (err) {
    console.log("deleteTeam error:", err);
    return error(res, 'Server error', 500);
  }
};

module.exports = { createTeam, deleteTeam, getAllTeams };