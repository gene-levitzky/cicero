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
var Modes = require("./Modes");


exports.ServerGameSession = function(character, socket) {
    
    this.mode = Modes.__EXPLORE;
    
    this.character = character;
    this.socket = socket;
    
    this.getCharacter = function() {
        return this.character;
    }
    
    this.getSocket = function() {
        return this.socket;
    }
    
    /**
     * Pushes updates from the ZoneInstance to which this session is bound to
     * the user.
     * @param {object}  The update data to be pushed.
     */
    this.update = function(data) {
        socket.emit('update', data);
    }
    
    /////////////////////
    // SOCKET HANDLING //
    /////////////////////
    console.log("Here");
    socket.emit('mode-switch', 'title');
    
    this.socket.on('key-event', function(data) {
        mode.keyListener(data);
    });
    
    this.socket.on('mouse-event', function(data) {
        mode.mouseListener(data);
    });
}