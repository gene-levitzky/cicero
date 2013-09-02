
/*
 * Server-side game session module.
 */
var GameSession = require('./ServerGameSession');
var TileDirectory = require('./TileDirectory');
var H__ = require('./HelperFunctions');

exports.ZoneInstance = function(zone, game) {

    /*
     * The Zone model object that this instance wraps.
     */
    this.zone = zone;
    
    /*
     * The main game object to which this instance belongs.
     */
    this.game = game;
    
    /*
     * Dictionary of all active game sessions (logged in users / characters) in
     * this zone.
     */
    this.gameSessions = {};
    
    /*
     * List of all sprites to be drawn 
     */
    this.sprites = [];
        
    /**
     * Retrieves the character with the specified ID if it exists, or null
     * otherwise.
     *
     * @param {int} The ID of the character.
     * @return {object} Returns the character if it exists, or undefined otherwise.
     */
    this.getCharacter = function(cid) {

        if (cid in this.gameSessions) {
            return this.gameSessions[cid].getCharacter();
        }
        
        return;
    }

    /**
     * Retrieves all active characters in this zone isntance.
     * @return {object} Returns a dictionary of all character ID : character
     *                  pairs from this zone.
     */
    this.getCharacters = function() {

        var characters = {};
        
        for (gid in this.gameSessions) {
            characters[gid] = this.gameSessions[gid].getCharacter();
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
    this.addCharacter = function(character, socket) {

        if (character.id in this.gameSessions && null !== this.gameSession[character.id]) {
            return "That character is already logged in.";
        }
        
        // Create and add game session for user
        var gameSession = new GameSession.ServerGameSession(character, socket, this);
        this.gameSessions[character.id] = gameSession;
        
        return "";
    }
    
    
    /**
     * Attemtps to remove the specified character from this zone.
     * @param {int} ID of character to be removed.
     * @return {string} An empty string if the character was removed
     *                  successfully, or an error message otherwise.
     */
    this.removeCharacter = function(cid) {
        
        if (cid in this.gameSessions) {
            
            // Remove game session
            delete this.gameSessions[cid];
            return "";
        }
        
        return "That character does not appear to be in this zone.";
    }
    
    /**
     * Adds the given sprite.
     * @param {object} `sprite` The sprite to be added.
     * @return {boolean} True if sprite added, false otherwise.
     */
     this.addSprite = function(sprite) {
        if (sprite.spriteId in this.sprites) {
            return false;
        }
        
        this.sprites[sprite.spriteId] = sprite;
        return true;
     }
    
    /** 
     * Removes the specified sprite.
     * @param {string} `type` Type of sprite. Either 'pc' or 'npc'. 
     * @param {id} `id`       Unique ID of the sprite.
     * @return {boolean} True if sprite removed, false otherwise.
     */
    this.removeSprite = function(id) {
        if (id in this.sprites) {
            delete this.sprites[id];
            return true;
        }
        
        return false;
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
    this.transferCharacter = function(cid, destinationId, x, y) {
    
        if (cid in this.gameSessions) {
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
            return "The character is not in this zone.";
        }
    }
    
    
    /**
     * Updates the game zone object, and broadcasts changes to all embedded
     * users.
     */
    this.update = function(data) {

        for (gid in this.gameSessions) {
            var gameSession = this.gameSessions[gid];
            var character = gameSession.getCharacter();
            data.env = this.getImmediateSurroundings(character.location.x, character.location.y);
            this.gameSessions[gid].update(data);
        }
    }
    
    /** 
     * Attempts to move the given character in the specified direction.
     * @param {object}  The character to be moved.
     * @param {string}  The direction the character is to move in.
     * @return {string} Returns an empty string if character moved 
     *                  successfully, or an error message otherwise.
     */
    this.moveCharacter = function(character, direction) {
      
        // The current position of the character
        var x = character.location.x;
        var y = character.location.y;
        
        // The character's movement speed (distance moved in one unit time)
        var delta = character.attributes.speed;

        switch (direction.toLowerCase()) {
        
            case "north": 
            
                var tileSymbols = this.zone.get(Math.round(x), Math.round(y - delta - character.attributes.size));
                var tiles = TileDirectory.get(zone.name, tileSymbols);
                var passable = true;
                
                for(var i in tiles) {
                    if (!tiles[i].passableBy(character)) {
                        passable = false;
                        break;
                    }
                }
                
                if (passable) {
                    character.location.y -= delta;
                    return "";
                }
                else {
                    return "Unreachable destination."
                }                
                
            case "south": 
                var tileSymbols = this.zone.get(Math.round(x), Math.round(y + delta + character.attributes.size))
                var tiles = TileDirectory.get(zone.name, tileSymbols);
                var passable = true;
                //console.log({'x':x,'y':y});
                for(var i in tiles) {
                    if (!tiles[i].passableBy(character)) {
                        passable = false;
                        break;
                    }
                }
                
                if (passable) {
                    character.location.y += delta;
                    return "";
                }
                else {
                    return "Unreachable destination."
                }                
                
            case "west": 
                var tileSymbols = this.zone.get(Math.round(x - delta - character.attributes.size), Math.round(y));
                var tiles = TileDirectory.get(zone.name, tileSymbols);
                var passable = true;
              
                for(var i in tiles) {
                    if (!tiles[i].passableBy(character)) {
                        passable = false;
                        break;
                    }
                }
                
                if (passable) {
                    character.location.x -= delta;
                    return "";
                }
                else {
                    return "Unreachable destination."
                }                
                
            case "east": 
                var tileSymbols = this.zone.get(Math.round(x + delta + character.attributes.size), Math.round(y));
                var tiles = TileDirectory.get(zone.name, tileSymbols);
                var passable = true;
                
                for(var i in tiles) {
                    if (!tiles[i].passableBy(character)) {
                        passable = false;
                        break;
                    }
                }
                
                if (passable) {
                    character.location.x += delta;
                    return "";
                }
                else {
                    return "Unreachable destination."
                }                
                
            default: return "Invalid direction."
        }
    }
    
    /**
     * Retrieves a 21 x 21 tile grid, centered at the given coordinate.
     * 
     * @param {int} `cx` The x-coordinate.
     * @param {int} `cy` The y-coordinate.
     *
     * @return {object} A 21-by-21 grid of tiles, centered at (cx, cy).
     */
    this.getImmediateSurroundings = function(cx, cy) {
        
        var dimension = 21;
        var sprites = [];
        var tiles = [];
        var col = 0;
        var row = 0;
        var x = Math.round(cx); 
        var y = Math.round(cy);
        
        for (var gid in this.gameSessions) {
            var pc = this.gameSessions[gid].getCharacter();
            if (21 >= H__.euclideanDistance({'x': pc.location.x, 'y': pc.location.y}, {'x': cx, 'y': cy})) {
                var sprite = { 
                    'character': pc, 
                    'x': pc.location.x - x + dimension / 2, 
                    'y': pc.location.y - y + dimension / 2,
                    'color': {
                        'r': 0,
                        'g': 0,
                        'b': 0,
                        'a': 256,
                    },
                };
                sprites.push(sprite);
            }
        }
        
        for (var i = x - 10; i <= x + 10; i++) {
        
            for (var j = y - 10; j <= y + 10; j++) {
            
                tiles[row] = tiles[row] || [];
                // NOTE: Tiles are stored as [row][col] array, or [y][x]
                tiles[row++][col] = TileDirectory.get(zone.name, zone.get(i, j));
            }
            
            row = 0;
            col++;
        }
        
        return {tiles: tiles, sprites: sprites};
    }
}