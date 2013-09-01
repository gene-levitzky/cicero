function startSession() {

    loadMode();

    var mode = __EXPLORE;
    var socket = io.connect('http://localhost');

    //Sends the given key event to the server.
    $('body').keydown( function(event) {
        socket.emit('key-event', event.which);
    });

    //Sends the given mouse event to the server.
    function mouseEvent(event) {
        
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
        mode.update(data);
    });
     

    /**
     * Command to change mode. 
     */
    socket.on('mode-switch', function (data) {
        
        mode.switchTo(data.mode);
    });
};