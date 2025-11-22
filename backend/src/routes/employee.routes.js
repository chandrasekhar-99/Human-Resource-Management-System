const router = require('express').Router();
const verifyToken = require('../middlewares/auth.middleware');
const {
  createEmployee,
  getAllEmployees,
  deleteEmployee,
  assignEmployeeToTeam,
} = require('../controllers/employee.controller');

router.get('/', verifyToken, getAllEmployees);
router.post('/create', verifyToken, createEmployee);
router.delete('/:id', verifyToken, deleteEmployee);
router.post('/assign-team', verifyToken, assignEmployeeToTeam);

module.exports = router;