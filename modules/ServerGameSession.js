/*
Amateur - 1 (1-29 [30])
Novice - 2 (30-49 [20])
Junior - 4 (50-67 [18])
Senior - 8 (68-79 [12])
Expert - 16 (80-89 [10])
Master - 32 (90-94 [5])
Grand Master - 64 (95-97 [3])
Arch Master - 128 (98-99 [2])
Champion - 256 (100 [1])
*/


/*
 * The game mode handles key and mouse inputs.
 */
var Modes = require("./modules/Modes");


exports.ServerGameSession = function(character, socket) {

    var sgs = {};
    
    sgs.mode = Modes.__EXPLORE;
    
    sgs.character = character;
    sgs.socket = socket;
    
    sgs.getCharacter = function() {
        return this.character;
    }
    
    sgs.getSocket = function() {
        return this.socket;
    }
    
    /**
     * Pushes updates from the ZoneInstance to which this session is bound to
     * the user.
     * @param {object}  The update data to be pushed.
     */
    sgs.update = function(data) {
        socket.emit('update', data);
    }
    
    /////////////////////
    // SOCKET HANDLING //
    /////////////////////
    
    sgs.socket.on('key-event', function(data) {
        mode.keyListener(data);
    });
    
    sgs.socket.on('mouse-event', function(data) {
        mode.mouseListener(data);
    });
}