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
var Modes = require("../modules/modes");


exports.ServerGameSession = function(character, socket, zoneInstance) {

    // Context for socket callbacks
    var self = this;

    this.character = character;
    this.socket = socket;
    this.zoneInstance = zoneInstance;
    this.mode = new Modes.Explore(this);
    
    this.getCharacter = function() {
        return this.character;
    }
    
    this.getSocket = function() {
        return this.socket;
    }
    
    /** 
     * Attempts to move the character in the given direction. See 
     * ZoneInstance.moveCharacter for more information.
     */
    this.moveCharacter = function(direction) {
        return this.zoneInstance.moveCharacter(this.character, direction);
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
    this.socket.on('key-event', function(key) {
        self.mode.keyListener(key);
    });
    
    this.socket.on('mouse-event', function(event) {
        this.mode.mouseListener(event);
    });
}