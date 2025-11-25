const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth.routes');
const employeeRoutes = require('./routes/employee.routes');
const teamRoutes = require('./routes/team.routes');
const logRoutes = require('./routes/log.routes');


const app = express();

app.use(cors({ origin: ["http://localhost:5173",process.env.CORS_ORIGIN], credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/logs', logRoutes);


app.get('/', (req, res) => {
  res.send('HRMS Backend is running');
});

module.exports = app;
