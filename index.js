const express = require('express');
const env = require('dotenv').config().parsed;
const conn = require('./DB/conn');
const { engine } = require('express-handlebars');
var cookieSession = require('cookie-session')

const PagesRoutes = require('./Routes/PagesRoutes');
const LoginRoutes = require('./Routes/LoginRoutes');

const app = express();

app.use(cookieSession({
    name: 'session',
    keys: [/* secret keys */],
  
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', PagesRoutes);
app.use('/auth', LoginRoutes);

conn.sync()
.then(( )=>{
    app.listen(env.APP_PORT)
    console.log('listening at localhost:'+env.APP_PORT);
})