
function loadMode() {

    var canvas = $('#game-canvas')[0];

    __EXPLORE = {

        switchTo: function(mode) {
            alert('Switching to: ' + mode);
        },
        
        draw: function(data) {
          
            var context = canvas.getContext('2d');
            
            // Radar
            drawMap(9, 25, 25, 21, context);            
            // Main Map
            drawMap(50, 250, 25, 11, context);
        },
        
        update: function(data) {
            this.draw(data.environment);
        },
    }
    
    function drawMap(width, leftOffSet, topOffSet, n, context) {
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                context.beginPath();
                context.rect(i * width + leftOffSet, j * width + topOffSet, width, width);
                context.lineWidth = 1;
                context.strokeStyle = 'black';
                context.stroke();
            }
        }
    }
}