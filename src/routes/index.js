const homeRouter = require('./home');
const uploadRouter = require('./upload');

function route(app) {
    app.use('/home', homeRouter); 
    app.use('/upload', uploadRouter); 
}


module.exports = route;