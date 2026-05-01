const express = require('express'); // express 
const handlebars = require('express-handlebars');
const sections = require('express-handlebars-sections');
const session = require('express-session');
// const cloudinary = require('./config/cloudinary');
const methodOverride = require('method-override')
const registerHelpers = require('./services/registerHelpers');
const db = require('./config/db');
const path = require('path');
const route = require('./routes/index');
const { firstChar } = require('./services/registerHelpers');

const User = require('./app/models/User');
const { mongooseToObject } = require('./util/mongoose');
db.connect();

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // dev dùng false
}));

app.use(async(req, res, next) => {
    // console.log("SESSION GLOBAL:", req.session);
    if (req.session.userID) {
        const user = await User.findById(req.session.userID);
        res.locals.user = mongooseToObject(user);
    }
    res.locals.userID = req.session.userID || null;
    next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.engine('hbs', handlebars.engine({
  extname: '.hbs',
  helpers: {
    section: sections(),
    limited: (a, limit) => a < limit,
    checkCount: (a) => a <= 0,
    avatarColor: registerHelpers.avatarColor,
    backgroundColor: registerHelpers.backgroundColor,
    firstChar: registerHelpers.firstChar
  },
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));

route(app);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})