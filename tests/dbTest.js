/**
 *  Module dependencies. Java "import" equivalent.
 */
var express = require('express')
  , http    = require('http')
  , path    = require('path')
  , users   = require('./models/user')
  , sha1    = require('SHA1');

/**
 *  Configuration and Middleware.
 *  Setting the initial states of the "classes"
 *  we're using.
 */
var app = express();
app.configure(function(){
  // Sets port number
  app.set('port', process.env.PORT || 3000);
  // Tells it where to find our HTML files
  app.set('views', __dirname + '/views');
  // Tells it what templates to use
  app.set('view engine', 'ejs');
  // Tells it to use favicons
  app.use(express.favicon());
  // ...
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({'secret': 'project-solstice'}));
  app.use(express.methodOverride());
  app.use(app.router);
  // Tells it where to found our javascript and css files
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

// For password hashing
var sha1 = sha1.getSha1();

/*
 *  Routes.
 */
/** 
 * If the server receives a request for "/",
 * Send them index.ejs.
 */
app.get('/', function(req, res) {
    res.render('index', {'phrase':'Ipsum Lorem...'});                
});
/** Ditto for "/index" */
app.get('/index', function(req, res) {
  res.render('index', {'phrase':'Ipsum Lorem...'});
});
app.get('/about', function(req, res) {
  res.render('about');
});
app.get('/Login', function(req, res) {
res.render('Login');
});
app.get('/home', function(req, res) {
res.render('home');
});
app.post('/home', function(req, res) {
var name = req.param('name');
var pass = req.param('pass');
res.render('home', {'name': name,'pass': pass});
});
var server = http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});
