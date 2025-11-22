const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');


const EmployeeTeam = sequelize.define('EmployeeTeam', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  EmployeeId: {
    type: DataTypes.INTEGER,  
    allowNull: false
  },
  TeamId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'employee_teams',
  timestamps: true
});

module.exports = EmployeeTeam;  