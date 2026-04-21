const Music = require('../models/Music');
const User = require('../models/User');
const { mutipleMongooseToObject } = require('../../util/mongoose');


class Registercontroller {
    register(req, res, next) {
        res.render('register');
    }

    registered(req, res, next) {
        const user = new User(req.body);
        user.save()
            .then(() => res.redirect('/signIn'))
            .catch(next);
    }
}

module.exports = new Registercontroller();