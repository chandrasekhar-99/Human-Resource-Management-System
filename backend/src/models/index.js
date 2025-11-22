const sequelize = require('../config/db');

const User = require('./user.model');
const Employee = require('./employee.model');
const Team = require('./team.model');
const EmployeeTeam = require('./employeeTeam.model');


Team.belongsTo(User, { foreignKey: 'createdBy' });
Employee.belongsTo(User, { foreignKey: 'createdBy' });


Team.belongsToMany(Employee, { through: EmployeeTeam });
Employee.belongsToMany(Team, { through: EmployeeTeam });

module.exports = { sequelize, User, Employee, Team, EmployeeTeam };