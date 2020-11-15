const express = require('express');
const { signUp, signin } = require('../../controller/admin/auth');
const {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
} = require('../../validators/auth');

const router = express.Router();

router.post('/admin/signup', validateSignupRequest, isRequestValidated, signUp);
router.post('/admin/signin', validateSigninRequest, isRequestValidated, signin);

module.exports = router;
