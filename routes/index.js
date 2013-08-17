
var metadata = require("../database/metadata.json");

var Character = require('../models/character').Character
    , game    = require('../modules/Game')
    , __H     = require('../modules/HelperFunctions')
    , sha1    = require('SHA1').getSha1()
    , User    = require('../models/user').User;

    
exports.ciceroView = function(req, res) {
    res.render('cicero', {title: metadata.name});
}


exports.homeView = function(req, res) {

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
        if (typeof User.findByName(name) !== "undefined") {
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
        
        var user = new User.construct({
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
    
        user = User.findByName(name);

        // User does not exist
        if (__H.isUndefined(user)) {
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


exports.indexView = function(req, res) {

    var userId = req.cookies.userId;
    
    if (!__H.isUndefined(userId)) {
        user = User.findById(userId);
        if (!__H.isUndefined(user)) {
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


exports.loginView = function(req, res) {
    res.render('Login', {
        'name'                : metadata.name, 
        'loginUsernameError'  : undefined, 
        'loginPasswordError'  : undefined,
        'signupUsernameError' : undefined, 
        'signupPasswordError' : undefined,
    });
}
