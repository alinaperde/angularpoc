var express       = require('express'),
    bodyParser    = require('body-parser'),
    session       = require('express-session'),
    validator     = require('express-validator'),
    cookieParser  = require('cookie-parser');

// Set the port for the application to use
var PORT = 3000;

// Create an express js app
var app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(validator());
app.use(session({
  secret: 'pink unicorns',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 20 * 60 * 1000 } } // 20 minutes
));

// Set the public/dist directory as static
app.use(express.static(__dirname + '/public/dist/'));

// Start the server
var server = app.listen(PORT);