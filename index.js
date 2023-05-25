//load all the configurations from .dotenv file
require('dotenv').config();

//require all the dependencies
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const db = require('./config/mongoose');
const router = require('./routes/index');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

//intitialize express
const app = express();

//parse the body data
app.use(express.urlencoded({extended: false}));

//use static files
app.use(express.static('./assets'));

//setup view and view engine for our views
app.set('views','./views');
app.set('view engine',"ejs");

//use ejs layouts 
app.use(expressLayouts);

//extract styles and scripts from individual ejs file to layout
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

//Creates a Persistent session in the db.
const sessionStore = MongoStore.create({
    mongoUrl: process.env.CONNECTION_STRING
})

//use session to store user identity
app.use(session({
    secret: process.env.SESSION_SECRET || "DevelopedByManas",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24}, //one day
    store: sessionStore
}));



//Use flash messages to display message to frontend in case of success or error
app.use(flash());

//Created a custom middleware function to convert Connect Flash messages to Noty.js notifications
app.use((req, res, next) => {
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error')
    };
    next();
});

//use passport for authentication
app.use(passport.initialize());
app.use(passport.session());    
app.use(passport.setAutheticatedUser);

//use routing at end 
app.use('/',router);

app.listen(process.env.PORT || 8000,()=> {
    console.log(`Server listenting on PORT ${process.env.PORT || 8000}`);
})