const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');

const {
  addCategory,
  getCategories,
  updateCategories,
} = require('../controller/category');

const router = express.Router();
const multer = require('multer');
const shortId = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, shortId.generate() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  '/category/create',
  requireSignin,
  adminMiddleware,
  upload.single('categoryImage'),
  addCategory
);
router.post(
  '/category/update',
  requireSignin,
  adminMiddleware,
  upload.array('categoryImage'),
  updateCategories
);
router.get('/category/getcategory', getCategories);

module.exports = router;
