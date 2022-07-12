const express = require('express');
const env = require('dotenv').config().parsed;
const conn = require('./src/Database/conn');
const { engine } = require('express-handlebars');
var cookieSession = require('cookie-session');

const PagesRoutes = require('./src/Routes/PagesRoutes');
const LoginRoutes = require('./src/Routes/LoginRoutes');

const app = express();

app.use(express.static('./src/public'));

app.use(cookieSession({
    name: 'session',
    keys: env.APP_SECRET_KEY,
    maxAge: 24 * 60 * 60 * 1000 
}));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', PagesRoutes);
app.use('/auth', LoginRoutes);

conn.sync()
    .then(() => {
        app.listen(env.APP_PORT);
        console.log('listening at localhost:' + env.APP_PORT);
    });