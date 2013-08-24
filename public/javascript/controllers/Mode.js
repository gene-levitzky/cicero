
function loadMode() {

    var canvas = $('#game-canvas')[0];
    var context = canvas.getContext('2d');
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    
    

    __EXPLORE = {

        switchTo: function(mode) {
            alert('Switching to: ' + mode);
        },
        
        draw: function(layers) {
        
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.beginPath();
            
            // Radar
            drawMap(9, 25, 25, 21, layers);            
            // Main Map
            drawMap(50, 250, 25, 11, layers);
            
            context.stroke();
        },
        
        update: function(data) {
            this.draw(data.layers);
        },
    }
    
    
    /**
     * Draws an n x n grid of layered color squares of the given width.
     * @param {int} `width`      The width of each square in the grid.
     * @param {int} `leftOffSet` The left margin of the grid.
     * @param {int} `topOffSet`  The top margin of the grid.
     * @param {object} `layers'  A linked-list of color layers.
     */
    function drawMap(width, leftOffSet, topOffSet, n, layers) {
        console.log(layers);
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
            
                var currentLayer = layers[i][j];
                
                for (var k = 0; k < currentLayer.length; k++) {
                
                    var bg = currentLayer[k].background;
                    
                    context.fillStyle = 'rgba(' + bg.r + ',' + bg.g + ',' + bg.b + ',' + bg.a + ')';
                    context.fillRect(j * width + leftOffSet, i * width + topOffSet, width, width);
                }
                
                context.rect(i * width + leftOffSet, j * width + topOffSet, width, width);
            }
        }
    }
}