const Music = require('../models/Music');
const { mutipleMongooseToObject } = require('../../util/mongoose');


class Homecontroller {
    home(req, res, next) {
        Music.find({})
            .then(musics => {
                res.render('home', {
                    musics: mutipleMongooseToObject(musics)
                });
            })
            .catch(next);
    }
}

module.exports = new Homecontroller();