
/*
 * Zone models.
 */
var Zone = require('../models/zone').Zone;

/*
 * Game interface wrapper for Zone models.
 */
var ZoneInstance = require('../modules/ZoneInstance');

/*
 * Dictionary of all active Zone Instances
 */
var zones = {};

/*
 * The timer event ID. Is overriden every time ``run`` is called.
 */
var intervalId;
 
/**
 * Runs the main game timer.
 * @return {string} Returns an empty string if timer started successfully, or
 *                  an error message otherwise.
 */
var run = function() {
    
    if (typeof intervalId === "undefined") {
        intervalId = setInterval(update, 20);
        return "";
    }
    
    return "Game already running.";
}


/**
 * Terminates the main game timer.
 * @return {string} Returns an empty string if timer stopped successfully, or
 *                  an error message otherwise.
 */
var stop = function() {
 
    if (typeof intervalId !== "undefined") {
        clearInterval(intervalId);
        return "";
    }
    
    return "No game running.";
}

/**
 * Moves game time forward by one atomic increment and updates all subscribed
 * user characters.
 */
function update() {
    for (zone in zones) {
        zones[zone].update();
    }
}


/**
 * Initializes game resources such as zones.
 * NOTE: Must be called before first call to ``run``.
 */
var init = function() {
    
    var zoneModels = Zone.all();
    
    for (zid in zoneModels) {        
        zones[zid] = new ZoneInstance.ZoneInstance(zoneModels[zid], this);
    }
}
 
 
/**
 * Creates and stores a game session for the newly logged in user.
 * @param {int}      The character's ID.
 * @param {object}   The user's socket.
 * @return {boolean} Returns empty string if game session added successfully, or
 *                   an error message otherwise.
 */
var createGameSession = function(character, socket) {
    
    var zone = zones[character.location.zone];
    
    if (typeof zone === "undefined") {
        return "Invalid zone.";
    }
    
    if (character.id in zone.getCharacters()) {
        if (zone.getCharacter(character.id) != null) {
            return "Character already logged in!";
        }
    }
    
    zone.addCharacter(character, socket);
    
    return "";
}


/**
 * Removes the specified user from gameSessions.
 * @param {int}      The user's ID.
 * @return {boolean} Returns empty string if character added successfully or an
 *                   error message otherwise.
 */
var destroyGameSession = function(cid) {
    
    // Current Zone of character
    var zone;
    
    for (zid in zones) {
        if (cid in zones[zid].getCharacters()) {
            if (null !== zones.getCharacter(cid)) {
                zone = zones[zid];
                break;
            }
        }
    }
    
    if (typeof zone === "undefined") {
        return "The character is not currently active.";
    }
    
    zone.removeCharacter(cid);    
    return "";
}


/**
 * Transfer the specified user to the specified zone.
 * @param {int}     The ID of the user to be transferred.
 * @param {object}  The ZoneInstance calling this method.
 * @param {object}  The ID of the zone to be transferred to.
 * @return {string} Returns an empty string if character transferred
 *                  successfully, or an error message otherwise.
 */
var transferCharacter = function(gameSession, originZoneInstance, destinationId, x, y) {

    if (!(destinationId in zones)) {
        return "Invalid destination";
    }
    
    // Destination Zone
    var destination = zones[destinationId];
    
    if (typeof destination.tile(x, y) === "undefined") {
        return "Invalid zone coordinate.";
    }
    
    // The character to be transferred
    var character = gameSession.getCharacter();
    // The character's associated socket
    var socket = gameSession.getSocket();
    
    // set the character's new location
    character.location.zone = destinationId;
    character.location.x = x;
    character.location.y = y;
    character.save(); // Persist to database
    destination.addCharacter(character, socket);
    
    return "";
}

exports.run = run;
exports.stop = stop;
exports.init = init;
exports.createGameSession = createGameSession;
exports.destroyGameSession = destroyGameSession;