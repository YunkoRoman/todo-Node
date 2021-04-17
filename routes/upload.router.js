const router = require('express').Router();

const uploadController = require('../controllers/upload.controller');

router.post('/', uploadController.saveLogo);

module.exports = router;