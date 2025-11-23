const express = require('express');
const cors = require('cors');
const {sequelize} = require('./models');

const authRoutes = require('./routes/auth.routes');
const employeeRoutes = require('./routes/employee.routes');
const teamRoutes = require('./routes/team.routes');
const logRoutes = require('./routes/log.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/logs', logRoutes);

app.get("/", (req, res) => {
  res.send("HRMS Backend is running");
});


sequelize.sync();

module.exports = app;