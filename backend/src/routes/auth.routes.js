const router = require('express').Router();
const {signUp, login, logout} = require('../controllers/auth.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', auth, logout);
module.exports = router;