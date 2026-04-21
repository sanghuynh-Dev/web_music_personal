const express = require('express'); // express 
const handlebars = require('express-handlebars');
const sections = require('express-handlebars-sections');
const session = require('express-session');
// const cloudinary = require('./config/cloudinary');
const db = require('./config/db');
const path = require('path');
const route = require('./routes/index');

db.connect();

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // dev dùng false
}));

app.use((req, res, next) => {
    console.log("SESSION GLOBAL:", req.session);
    res.locals.userID = req.session.userID || null;
    next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.engine('hbs', handlebars.engine({
  extname: '.hbs',
  helpers: {
    section: sections()
  },
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));

route(app);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})