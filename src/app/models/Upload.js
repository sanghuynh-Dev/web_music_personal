const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../../config/cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        let folder = '';
        let resource_type = 'auto';

        if(file.mimetype.startsWith('image')) {
            folder = 'resources/images';
        } else if(file.mimetype.startsWith('audio')) {
            folder = 'resources/musics';
        }
        
        return {
            folder: folder,
            resource_type: resource_type,
            public_id: Date.now() + "-" + Math.round(Math.random() * 1e9),
        }
    },
});

const upload = multer({ storage: storage });

module.exports = upload;