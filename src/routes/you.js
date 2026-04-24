var express = require('express');
var router = express.Router();

const youController = require('../app/controllers/YouController');

router.get('/library', youController.library);
router.get('/likes', youController.likes);
router.post('/liked/:id', youController.liked);

module.exports = router;