var express = require('express');
var router = express.Router();

const logoutController = require('../app/controllers/LogoutController');

router.get('/', logoutController.logout);

module.exports = router;
