
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
            
            // Radar
            drawMap(9, 25, 25, 21, layers);            
            // Main Map
            drawMap(50, 250, 25, 11, layers);
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
     * @param {int} `n`          The dimension of the grid.
     * @param {object} `layers'  A linked-list of color layers.
     */
    function drawMap(width, leftOffSet, topOffSet, n, layers) {
        
        context.beginPath();
      
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                        
                var currentLayer = layers[i][j];
                while (typeof currentLayer.tile !== 'undefined') {
                    var bg = currentLayer.tile.background;
                
                    context.fillStyle = 'rgba(' + bg.r + ',' + bg.g + ',' + bg.b + ',' + bg.a + ')';
                    context.fillRect(i * width + leftOffSet, j * width + topOffSet, width, width);
                                        
                    currentLayer = currentLayer.next;
                }
                
                context.rect(i * width + leftOffSet, j * width + topOffSet, width, width);
            }
        }
        
        context.stroke();
    }
}