/**
 *  Module dependencies. Java "import" equivalent.
 */
var express = require('express')
    , http  = require('http')
    , io    = require('socket.io')
    , path  = require('path')
    , sha1  = require('SHA1').getSha1()
    , users = require('./models/user');

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

// Data about the application
var metadata = {
    name: 'The Acts of Man'
}


var server = http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});


   /*************
    *  Routes.
    *************/
 
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


app.get('/cicero', function(req, res) {
    ciceroView(req, res);
});


app.get('/home', function(req, res) {
    homeView(req, res);
});


app.post('/home', function(req, res) {
    homeView(req, res);
});


app.get('/new-character', function (req, res) {

    var userId = req.cookies.userId;
    
    if (!isUndefined(userId)) {
        var user = users.findById(userId);
        if (!isUndefined(user)) {
            res.render('new-character', {
                'user': user, 
                'name': metadata.name,
            });
            return;
        }
    }
    
    loginView(req, res);
});


app.get('/login', function(req, res) {
    loginView(req, res);
});


app.get('/about', function(req, res) {
    res.render('about');
});


function ciceroView(req, res) {
    res.render('cicero');
}


function homeView(req, res) {

    if (req.param('signup')) {
    
        var name = req.param('name');
        var pass = req.param('pass');
        var passConfirm = req.param('pass-confirm');
        
        // Password too short
        if (pass.length < 6) {
            res.render('login', {   
                'name'                : metadata.name, 
                'loginUsernameError'  : undefined, 
                'loginPasswordError'  : undefined,
                'signupUsernameError' : undefined, 
                'signupPasswordError' : 'Password must be at least 6 characters long.',
            });
            return;
        }
        
        // Confirmation password doesn't match
        if (pass != passConfirm) {
            res.render('login', {   
                'name'                : metadata.name, 
                'loginUsernameError'  : undefined, 
                'loginPasswordError'  : undefined,
                'signupUsernameError' : undefined, 
                'signupPasswordError' : 'The passwords do not match.',
            });
            return;
        }
        
        // Username too short
        if (name.length < 3) {
            res.render('login', {   
                'name'                : metadata.name, 
                'name'                : metadata.name, 
                'loginUsernameError'  : undefined, 
                'loginPasswordError'  : undefined,
                'signupUsernameError' : 'The username must be at least 3 characters.', 
                'signupPasswordError' : undefined,
            });
            return;
        }

        // Username already taken
        if (typeof users.findByName(name) !== "undefined") {
            res.render('login', {   
                'name'                : metadata.name, 
                'name'                : metadata.name, 
                'loginUsernameError'  : undefined, 
                'loginPasswordError'  : undefined,
                'signupUsernameError' : 'That username is already taken.', 
                'signupPasswordError' : undefined,
            });
            return;
        }
        
        var user = new users.User({
            "username" : name, 
            "password" : sha1.hash(pass),
        });
        var id = user.save();
        
        res.cookie('userId', id, { maxAge: 900000, httpOnly: false });
        res.render('home', {
            'user'       : user, 
            'characters' : user.getCharacters(), 
            'name'       : metadata.name, 
            'newUser'    : true,
        });
        
        return;
    }
    else if (req.param('login')) {
    
        var name = req.param('name');
        var pass = req.param('pass');
    
        user = users.findByName(name);
        console.log(user.id);
        // User does not exist
        if (isUndefined(user)) {
            res.render('login', {   
                'name'                : metadata.name, 
                'loginUsernameError'  : 'That username does not exist.', 
                'loginPasswordError'  : undefined, 
                'signupUsernameError' : undefined, 
                'signupPasswordError' : undefined,    
            });
            return;
        }
        
        // Incorrect password
        if (pass.length < 6 || sha1.hash(pass) != user.password) {
            res.render('login', {
                'name'                : metadata.name, 
                'loginUsernameError'  : undefined, 
                'loginPasswordError'  : 'Incorrect password.',
                'signupUsernameError' : undefined, 'signupPasswordError': undefined,
            });
            return;
        }
        
        res.cookie('userId', user.id, { maxAge: 900000, httpOnly: false });
        res.render('home', {
            'id'         : user.id,
            'user'       : user, 
            'characters' : user.getCharacters(), 
            'name'       : metadata.name, 
            'newUser'    : false,
        });
        
        return;
    }
    
    indexView(req, res);
}


function indexView(req, res) {

    var userId = req.cookies.userId;
    
    if (!isUndefined(userId)) {
        user = users.findById(userId);
        if (!isUndefined(user)) {
          res.render('home', {
              'user'       : user, 
              'characters' : user.getCharacters(), 
              'name'       : metadata.name, 
              'newUser'    : false,
          });
          return;
        }
    }
    
    loginView(req, res);
}


function loginView(req, res) {
    res.render('Login', {
        'name'                : metadata.name, 
        'loginUsernameError'  : undefined, 
        'loginPasswordError'  : undefined,
        'signupUsernameError' : undefined, 
        'signupPasswordError' : undefined,
    });
}

      /************
       *  SOCKETS
       ************/

var sio = io.listen(server);
       
sio.on('connection', function (socket) {

    socket.emit('who-are-you?');
    
    
    socket.on('i-am', function (data) {
        if (isUndefined(data)) {
            // TODO
            socket.emit('not-logged-in');
            console.log("USER NOT LOGGED IN");
            return;
        }
        else {
        
            var user = users.findById(data.userId);
            
            if (isUndefined(user)) {
                console.log("INVALID USER");
                return;
            }
            else {   
            
                if (isUndefined(data.service)) {
                    socket.emit('no-service-requested');
                }
                else {
                
                    if ('new-character' == data.service) {
                        socket.emit('mode-switch', {"mode":"character-creation"});
                    }
                    else {
                        // TODO
                        console.log("ILLEGAL SERVICE REQUESTED");
                        return;
                    }
                }
            }
        }
    });
});



/** HELPER FUNCTIONS **/

function isUndefined (obj) {
    return typeof obj === "undefined";
}