const express = require('express');
const { signUp, signin, requireSignin } = require('../controller/auth');
const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signin);

module.exports = router;
