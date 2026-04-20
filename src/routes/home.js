var express = require('express');
var router = express.Router();

const homeController = require('../app/controllers/HomeController');

router.get('/', homeController.home);

module.exports = router;
