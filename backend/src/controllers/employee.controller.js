const {Employee, Team} = require('../models');
const {success, error} = require('../utils/response');



const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    return success(res, 'Employees retrieved successfully', employees, 200);
  } catch (err) {
    console.log("getAllEmployees error:", err);
    return error(res, 'Server error', 500);
  }
};

const createEmployee = async (req, res) => {
  try {
    const {name, email, position} = req.body;
    const newEmployee = await Employee.create({name, email, position});
    return success(res, 'Employee created successfully', newEmployee, 201);
  } catch (err) {
    console.log("createEmployee error:", err);
    return error(res, 'Server error', 500);
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const {id} = req.params;
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return error(res, 'Employee not found', 404);
    }
    await employee.destroy();
    return success(res, 'Employee deleted successfully', null, 200);
  } catch (err) {
    console.log("deleteEmployee error:", err);
    return error(res, 'Server error', 500);
  }
};

const assignEmployeeToTeam = async (req, res) => {
  try {
    const {employeeId, teamId} = req.body;
    const employee = await Employee.findByPk(employeeId);

    if (!employee) {
      return error(res, 'Employee or Team not found', 404);
    }

    const team = await Team.findByPk(teamId);
    if (!team) {
      return error(res, 'Employee or Team not found', 404);
    }

    await employee.addTeam(team);
    return success(res, 'Employee assigned to team successfully', null, 200);
  } catch (err) {
    console.log("assignEmployeeToTeam error:", err);
    return error(res, 'Server error', 500);
  }
};

module.exports = { createEmployee, getAllEmployees, deleteEmployee, assignEmployeeToTeam};