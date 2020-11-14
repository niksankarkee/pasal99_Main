const express = require('express');
const {
  signUp,
  signin,
  requireSignin,
} = require('../../controller/admin/auth');
const router = express.Router();

router.post('/admin/signup', signUp);
router.post('/admin/signin', signin);

module.exports = router;
