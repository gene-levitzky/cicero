
/*
 * Server-side game session module.
 */
var GameSession = require("./modules/ServerGameSession");

exports.ZoneInstance = function(zone, game) {

    var instance = {};

    /*
     * The Zone model object that this instance wraps.
     */
    instance.zone = zone;
    
    /*
     * The main game object to which this instance belongs.
     */
    instance.game = game;
    
    /*
     * Dictionary of all active game sessions (logged in users / characters) in
     * this zone.
     */
    instance.gameSessions = {};
    
    /*
     * Dictionary of the coordinates of all PC/NPCs in this zone.
     */
    instance.coordinates = {
        pc:  {}, // player character coordinates
        npc: {}, // non-player character coordinates
    }
        
    /**
     * Retrieves the character with the specified ID if it exists, or null
     * otherwise.
     *
     * @param {int} The ID of the character.
     * @return {object} Returns the character if it exists, or null otherwise.
     */
    instance.getCharacter = function(cid) {

        if (cid in this.gameSessions && null !== this.gameSessions[cid]) {
            return this.gameSessions[cid].getCharacter();
        }
        
        return null;
    }

    /**
     * Retrieves all active characters in this zone isntance.
     * @return {object} Returns a dictionary of all character ID : character
     *                  pairs from this zone.
     */
    instance.getCharacters = function() {

        var characters = {};
        
        for (gid in this.gameSessions) {
            if (null !== this.gameSessions[gid]) {
                characters[gid] = this.gameSessions[gid].getCharacter();
            }
        }
        
        return characters;
    }

    /**
     * Attempts to add the given character to this zone.
     * @param {object}  The character to be added.
     * @param {object}  The socket the user is using to communicate with the
     *                  server.
     * @return {string} Returns an empty string if character added
     *                  successfully, or an error message otherwise.
     */
    instance.addCharacter = function(character, socket) {

        if (character.id in this.gameSessions && null !== this.gameSession[character.id]) {
            return "That character is already logged in.";
        }
        
        // Create and add game session for user
        var gameSession = GameSession.ServerGameSession(character, socket, this);
        this.gameSessions[character.id] = gameSession;
        
        // Add to coordinates
        this.coordinates.pc.character.id = {
            x: character.location.x,
            y: character.location.y,
        };
        
        return "";
    }
    
    
    /**
     * Attemtps to remove the specified character from this zone.
     * @param {int} ID of character to be removed.
     * @return {string} An empty string if the character was removed
     *                  successfully, or an error message otherwise.
     */
    instance.removeCharacter = function(cid) {
        
        if (cid in this.gameSessions && null != this.gameSessions[cid]) {
            
            // Remove game session
            delete this.gameSessions[cid];
            // Remove from coordinates
            delete this.coordinates.pc[cid];
            return "";
        }
        
        return "That character does not appear to be in this zone.";
    }
    
    
    /**
     *  Asks the game object to transfer the given character to the given
     *  location.
     *
     * @param {int}    ID of character to be transferred.
     * @param {int}    ID of the zone to be transferred to.
     * @param {int}    The x-coordinate of where to place the character.
     * @param {int}    The y-coordinate of where to place the character.
     * @param {string} Returns an empty string if the character was 
     *                 transferred successfully, or an error message otherwise.
     */
    instance.transferCharacter = function(cid, destinationId, x, y) {
    
        if (cid in this.gameSessions) {
        
            if (null !== this.gameSessions[cid]) {
                // Ask game to make the transfer
                var result = this.game.transferCharacter(this.gameSessions[cid], destinationId, x, y);
                if ("" === result) {
                    // The transfer went okay
                    this.removeCharacter(cid);
                    return "";
                }
                else {
                    // The transfer didn't go okay
                    return result;
                }
            }
            else {
                return "The character is no longer active in this zone.";
            }
        }
        else {
            return "The character is not in this zone.";
        }
    }
    
    
    /**
     * Updates the game zone object, and broadcasts changes to all embedded
     * users.
     */
    instance.update = function() {
    
        for (gid in gameSessions) {
            // #TODO 
            // Insert data that will be pushed to users.
            gameSessions[gid].update();
        }
    }
    
    /** 
     * Attempts to move the given character in the specified direction.
     * @param {object}  The character to be moved.
     * @param {string}  The direction the character is to move in.
     * @return {string} Returns an empty string if character moved 
     *                  successfully, or an error message otherwise.
     */
     instance.moveCharacter = function(character, direction) {
        
        // The current position of the character
        var x = character.location.x;
        var y = character.location.y;
        
        // The character's movement speed (distance moved in one unit time)
        var delta = character.attributes.speed;
        
        switch (direction.toLowerCase()) {
        
            case "north": 
                if (typeof this.getTile(x, y - delta) !== "undefined") {
                    character.location.y = y - delta;
                    return "";
                }
                else {
                    return "Unreachable destination."
                }                
                break;
                
            case "south": 
                if (typeof this.getTile(x, y + delta) !== "undefined") {
                    character.location.y = y + delta;
                    return "";
                }
                else {
                    return "Unreachable destination."
                }                
                break;
                
            case "west": 
                if (typeof this.getTile(x - delta, y) !== "undefined") {
                    character.location.x = x - delta;
                    return "";
                }
                else {
                    return "Unreachable destination."
                }                
                break;
                
            case "east": 
                if (typeof this.getTile(x + delta, y) !== "undefined") {
                    character.location.x = x + delta;
                    return "";
                }
                else {
                    return "Unreachable destination."
                }                
                break;
                
            default: return "Invalid direction."
        }
     }
}