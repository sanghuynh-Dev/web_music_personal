const express = require('express'); // express 
const handlebars = require('express-handlebars');
const sections = require('express-handlebars-sections');
// const cloudinary = require('./config/cloudinary');
const db = require('./config/db');
const path = require('path');
const route = require('./routes/index');

db.connect();

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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