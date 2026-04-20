const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dqynaodv1', 
  api_key: '552166624576871', 
  api_secret: 'hpmFP55ViBHdL8VsdpVpoE1Thas',
});

module.exports = cloudinary;