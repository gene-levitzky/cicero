var __mode = __TITLE_MODE;

var socket = io.connect('http://localhost');

/**
 * Sends the given key event to the server.
 *
 * @param {object} The event to be sent.
 */
function keyEvent(event) {
    
    socket.emit('key-event', event);
}


/**
 * Sends the given mouse event to the server.
 *
 * @param {object} The event to be sent.
 */
function keyEvent(event) {
    
    socket.emit('mouse-event', event);
}


/**
 * Authentication request from server.
 */
socket.on('who-are-you?', function (data) {

    var userId = $.cookie('userId');
    
    if (typeof userId === "undefined") {
        // TODO
        socket.emit('not-logged-in');
        return;
    }
    else {
    
        var request = {
            "userId": userId,
            "service": "login",
        };
        
        socket.emit('i-am', request);
    }
});


/**
 * Update from server with most recent data.
 */
socket.on('update', function(data) {
    
    __mode.update(data);
});
 

/**
 * Command to change mode. 
 */
socket.on('mode-switch', function (data) {
    
    __mode.switchTo(data.mode);
});
