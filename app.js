/**
 *  Module dependencies.
 */
var express         = require('express')
    , game          = require('./modules/Game')
    , http          = require('http')
    , H__           = require('./modules/HelperFunctions')
    , io            = require('socket.io')
    , routes        = require('./routes')
    , socketHandler = require('./socketHandler');

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
    app.use(express.session({'secret': 'THE-NARWHAL-BACONS-AT-MIDNIGHT'}));
    app.use(express.methodOverride());
    app.use(app.router);
    // Tells it where to found our javascript and css files
    app.use(express.static('public'));
});

app.configure('development', function() {
    app.use(express.errorHandler());
});

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});


/*
 * Run the Game server
 */
game.init();


/*
 * Route Handling
 */
app.get('/', routes.indexView);
app.get('/about', function(req, res) {});
app.get('/cicero', routes.ciceroView);
app.get('/home', routes.homeView);
app.post('/home', routes.homeView);
app.get('/index', routes.indexView);
app.get('/login', routes.loginView);
app.get('/new-character', function (req, res) {});


/*
 * Socket Handling
 */
var sio = io.listen(server);
socketHandler.init(sio);