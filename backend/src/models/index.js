const sequelize = require('../config/db');

const User = require('./user.model');
const Employee = require('./employee.model');
const Team = require('./team.model');
const EmployeeTeam = require('./employeeTeam.model');
const Log = require('./log.model');


Team.belongsTo(User, { foreignKey: 'createdBy' ,as: 'creator'});
Employee.belongsTo(User, { foreignKey: 'createdBy', as: 'creator'});


Team.belongsToMany(Employee, { through: EmployeeTeam, as: 'employees' });
Employee.belongsToMany(Team, { through: EmployeeTeam, as: 'teams' });

Log.belongsTo(User, { foreignKey: 'userId', as: 'user' });



module.exports = { sequelize, User, Employee, Team, EmployeeTeam, Log };