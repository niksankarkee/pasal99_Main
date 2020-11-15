const express = require('express');
const { signUp, signin } = require('../controller/auth');

const {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
} = require('../validators/auth');
const router = express.Router();

router.post('/signup', validateSignupRequest, isRequestValidated, signUp);
router.post('/signin', validateSigninRequest, isRequestValidated, signin);

module.exports = router;
