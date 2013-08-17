
var Character = require('../models/character').Character
    , game    = require('../modules/Game')
    , H__     = require('../modules/HelperFunctions')
    , User    = require('../models/user').User;

    
exports.init = function(sio) {

    sio.on('connection', function (socket) {

        // Request authentication
        socket.emit('who-are-you?');
        
        // Respond to authentication
        socket.on('i-am', function (data) {
            // No authentication data sent to server
            if (H__.isUndefined(data)) {
                socket.emit('not-logged-in');
                console.log("USER NOT LOGGED IN");
                return;
            }
            else {
            
                var user = User.findById(data.userId);
                // Invalid User ID
                if (H__.isUndefined(user)) {
                    console.log("INVALID USER");
                    return;
                }
                else {   
                    // No service requested
                    if (H__.isUndefined(data.service)) {
                        socket.emit('no-service-requested');
                    }
                    else {
                        // Login requested
                        if ('login' == data.service) {
                            var character = Character.findById(0);
                            game.createGameSession(character, socket);
                        }
                        else {
                            // Non-existent service requested
                            console.log("ILLEGAL SERVICE REQUESTED");
                            return;
                        }
                    }
                }
            }
        });
    });
}