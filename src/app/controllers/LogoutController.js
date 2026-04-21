const Music = require('../models/Music');
const User = require('../models/User');
const { mutipleMongooseToObject } = require('../../util/mongoose');


class LogoutController {
   logout(req, res, next) {
       req.session.destroy(() => res.redirect('/home'));
   }
}

module.exports = new LogoutController();