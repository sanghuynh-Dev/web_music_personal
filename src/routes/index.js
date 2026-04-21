const homeRouter = require('./home');
const uploadRouter = require('./upload');
const signInRouter = require('./signIn');
const registerRouter = require('./register');
const logoutRouter = require('./logout');

function route(app) {
    app.use('/home', homeRouter); 
    app.use('/upload', uploadRouter); 
    app.use('/signIn', signInRouter); 
    app.use('/register', registerRouter); 
    app.use('/logout', logoutRouter); 
}


module.exports = route;