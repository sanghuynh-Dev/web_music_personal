var express = require('express');
var router = express.Router();

const registerController = require('../app/controllers/Registercontroller');

router.post('/registered', registerController.registered);
router.get('/', registerController.register);

module.exports = router;