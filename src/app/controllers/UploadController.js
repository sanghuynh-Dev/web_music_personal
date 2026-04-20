const Music = require('../models/Music');
const { mutipleMongooseToObject } = require('../../util/mongoose');


class Uploadcontroller {
    upload(req, res, next) {
       res.render('upload');
    }

    async uploaded(req, res, next) {
        const { artist, song_name } = req.body;

        const fileUrl = req.files?.file?.[0]?.path;
        const imageUrl = req.files?.image?.[0]?.path;
        if (!fileUrl || !imageUrl) {
            return res.status(400).send("Missing file upload");
        }
        const newMusic = instianceDb(artist, song_name, fileUrl, imageUrl);
        await newMusic.save()
            .then(() => res.redirect('/home'))
            .catch(next);
        
    }

}

function instianceDb(artist, song_name, file, image) {
    return new Music({
        artist,
        song_name,
        file: file,
        image: image
      });
}

module.exports = new Uploadcontroller();