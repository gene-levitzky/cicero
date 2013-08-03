/**
 *  Module dependencies. Java "import" equivalent.
 */
var express = require('express')
    , http  = require('http')
    , path  = require('path')
    , users = require('./models/user')
    , sha1  = require('SHA1');

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
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
    app.use(express.errorHandler());
});

// For password hashing
var sha1 = sha1.getSha1();

// Data about the application
var metadata = {
    name: 'Cicero'
}

/*
 *  Routes.
 */
/** 
 * If the server receives a request for "/",
 * Send them index.ejs.
 */
app.get('/', function(req, res) {
    indexView(req, res);
});


/** Ditto for "/index" */
app.get('/index', function(req, res) {
    indexView(req, res);
});


app.get('/login', function(req, res) {
    loginView(req, res);
});


app.get('/home', function(req, res) {
    indexView(req, res);
});


app.post('/home', function(req, res) {

    var name = req.param('name');
    var pass = req.param('pass');

    if (req.param('signup')) {
    
        var passConfirm = req.param('pass-confirm');
        
        if (pass.length < 6) {
            res.render('login', {'name': metadata.name, 'loginUsernameError': undefined, 'loginPasswordError': undefined,
                'signupUsernameError': undefined, 'signupPasswordError': 'Password must be at least 6 characters long.'});
            return;
        }
        if (pass != passConfirm) {
            res.render('login', {'name': metadata.name, 'loginUsernameError': undefined, 'loginPasswordError': undefined,
                'signupUsernameError': undefined, 'signupPasswordError': 'The passwords do not match.'});
            return;
        }
        
        if (users.length < 3) {
            res.render('login', {'name': metadata.name, 'name': metadata.name, 'loginUsernameError': undefined, 'loginPasswordError': undefined,
                'signupUsernameError': 'The username must be at least 3 characters.', 'signupPasswordError': undefined});
            return;
        }
        if (users.findByName(name)) {
            res.render('login', {'name': metadata.name, 'name': metadata.name, 'loginUsernameError': undefined, 'loginPasswordError': undefined,
                'signupUsernameError': 'That username is already taken.', 'signupPasswordError': undefined});
            return;
        }
        
        var user = users.User(name, sha1.hash(pass));
        user.save();
        
        res.cookie('username', name, { maxAge: 900000, httpOnly: false });
        res.render('home', {'username': name, 'name': metadata.name, 'newUser': true});
        
        return;
    }
    else if (req.param('login')) {
    
        user = users.findByName(name);
        
        if (!user) {
            res.render('login', {'name': metadata.name, 'loginUsernameError': 'That username does not exist.', 'loginPasswordError': undefined,
                'signupUsernameError': undefined, 'signupPasswordError': undefined});
            return;
        }
        if (user.length < 3) {
            res.render('login', {'name': metadata.name, 'loginUsernameError': 'The username must contain at least 3 characters.', 
                'loginPasswordError': undefined, 'signupUsernameError': undefined, 'signupPasswordError': undefined});
            return;
        }
        
        if (pass.length < 6 || sha1.hash(pass) != user.password) {
            res.render('login', {'name': metadata.name, 'loginUsernameError': undefined, 'loginPasswordError': 'Incorrect password.',
                'signupUsernameError': undefined, 'signupPasswordError': undefined});
            return;
        }
        
        res.cookie('username', name, { maxAge: 900000, httpOnly: false });
        res.render('home', {'username': name, 'name': metadata.name, 'newUser': false});
        
        return;
    }
    
    loginView(req, res);
});


app.get('/about', function(req, res) {
    res.render('about');
});


function indexView(req, res) {

    username = req.cookies.username;

    if (username && username.length > 0) {
        res.render('home', {'username': username, 'name': metadata.name, 'newUser': false});
    }
    else {
        loginView(req, res);
    }
}


function loginView(req, res) {
    res.render('Login', {'name': metadata.name, 'loginUsernameError': undefined, 'loginPasswordError': undefined,
        'signupUsernameError': undefined, 'signupPasswordError': undefined});
}


var server = http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});
