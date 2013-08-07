var __mode = __TITLE_MODE;

var socket = io.connect('http://localhost');

socket.on('who-are-you?', function (data) {

    var userId = $.cookie('userId');
    
    if (typeof userId === "undefined") {
        // TODO
        socket.emit('not-logged-in');
        return;
    }
    else {
    
        var data = {
            "userId": userId,
            "service": "new-character",
        };
        
        socket.emit('i-am', data);
    }
});

socket.on('mode-switch', function (data) {
    
    __mode.switchTo(data.mode);
});
