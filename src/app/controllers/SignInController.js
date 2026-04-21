const Music = require('../models/Music');
const User = require('../models/User');
const { mutipleMongooseToObject } = require('../../util/mongoose');


class SignIncontroller {
    signInForm(req, res, next) {
        res.render('signIn');
    }

    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({ email});
        if(!user) return res.json({ success: false, error: { email: 'Email is not exist!'}});

        if(user.password !== password) return res.json({ success: false, error:{ password: 'Password is not correct!'}});

        req.session.userID = user._id;
        res.json({ success: true });
    }
}

module.exports = new SignIncontroller();