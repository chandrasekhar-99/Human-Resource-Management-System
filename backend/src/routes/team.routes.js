const router = require('express').Router();
const verifyToken = require('../middlewares/auth.middleware');
const {
  getAllTeams,
  createTeam,
  deleteTeam,
} = require('../controllers/team.controller');

router.get('/', verifyToken, getAllTeams);
router.post('/createTeam', verifyToken, createTeam);
router.delete('/:id', verifyToken, deleteTeam);

module.exports = router;