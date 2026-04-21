var express = require('express');
var router = express.Router();

const signInController = require('../app/controllers/SignInController');

router.post('/login', signInController.login);
router.get('/', signInController.signInForm);

module.exports = router;