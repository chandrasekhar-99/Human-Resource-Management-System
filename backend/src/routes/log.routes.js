const router = require('express').Router();
const authenticateToken = require('../middlewares/auth.middleware');
const {getAllLogs} = require('../controllers/log.controller');

router.get('/', authenticateToken, getAllLogs);

module.exports = router;