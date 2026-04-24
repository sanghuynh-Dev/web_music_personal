var express = require('express');
var router = express.Router();

const profileController = require('../app/controllers/ProfileController');

router.get('/', profileController.profile);

module.exports = router;