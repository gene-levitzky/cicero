
function loadMode() {

    var canvas = $('#game-canvas')[0];
    var context = canvas.getContext('2d');    

    __EXPLORE = {

        switchTo: function(mode) {
            alert('Switching to: ' + mode);
        },
        
        draw: function(data) {
            
            var sprites = data.env.sprites;
            var tiles = data.env.tiles;
            var mainSprites = [];
            var mainTiles = [];
            var col = 0;
            var row = 0;
        
            context.clearRect(0, 0, canvas.width, canvas.height);
            
            context.lineWidth = 1;
            context.strokeStyle = '#000000';
            context.beginPath();
            
            // Get sprites for main display
            for (var i in sprites) {
            
                if ( sprites[i].x < Math.floor(3 * tiles.length / 4) && sprites[i].x > Math.floor(tiles.length / 4)
                  || sprites[i].y < Math.floor(3 * tiles.length / 4) && sprites[i].y > Math.floor(tiles.length / 4) ) {
                      
                      mainSprites[i] = {
                          'character': sprites[i].character,
                          'color': sprites[i].color,
                          // Compensate for difference in dimension
                          'x': sprites[i].x - 5,
                          'y': sprites[i].y - 5,
                      };
                  }
            }
            
            // Get tiles for main display
            for (var i = Math.floor(tiles.length / 4); i < tiles.length - Math.floor(tiles.length / 4); i++) {
                
                mainTiles[row] = [];
                
                for (var j = Math.floor(tiles.length / 4); j < tiles[i].length - Math.floor(tiles[i].length / 4); j++) {
                    mainTiles[row][col++] = tiles[i][j];
                }
                
                row++;
                col = 0;
            }
            
            // Radar
            drawMap(9, 25, 25, tiles);
            // Main Map
            drawMap(50, 250, 25, mainTiles);
            
            context.stroke();
            
            context.lineWidth = 2;
            context.strokeStyle = '#003300';
            context.beginPath();
            
            // Radar
            drawSprites(9, 25, 25, sprites);
            // Main map
            drawSprites(50, 250, 25, mainSprites);
            
            context.fill();
            context.stroke();
        },
        
        update: function(data) {
            this.draw(data);
        },
    }
    
    
    /**
     * Draws an n x n grid of layered color squares of the given width.
     * @param {int} `width`      The width of each square in the grid.
     * @param {int} `leftOffSet` The left margin of the grid.
     * @param {int} `topOffSet`  The top margin of the grid.
     * @param {object} `env`     List of background tiles.
     */
    function drawMap(width, leftOffSet, topOffSet, tiles) {
        
        for (var i = 0; i < tiles.length; i++) {
            for (var j = 0; j < tiles[i].length; j++) {
            
                var currentLayer = tiles[i][j];
                
                for (var k = 0; k < currentLayer.length; k++) {
                
                    var bg = currentLayer[k].background;
                    
                    context.fillStyle = 'rgba(' + bg.r + ',' + bg.g + ',' + bg.b + ',' + bg.a + ')';
                    context.fillRect(j * width + leftOffSet, i * width + topOffSet, width, width);
                }
                
                context.rect(i * width + leftOffSet, j * width + topOffSet, width, width);
            }
        }
    }
    
    /**
     * Draws an n x n grid of layered color squares of the given width.
     * @param {int} `width`      The width of each square in the grid.
     * @param {int} `leftOffSet` The left margin of the grid.
     * @param {int} `topOffSet`  The top margin of the grid.
     * @param {object} `sprites` List of sprites.
     */
    function drawSprites(width, leftOffSet, topOffSet, sprites) {
        
        for (sid in sprites) {
            var sprite = sprites[sid];
            var color = sprite.color;
            var x = Math.round(sprite.x * width);
            var y = Math.round(sprite.y * width);
            var radius = sprite.character.attributes.size * width;
            //console.log({'spriteX': sprite.x, 'x':x, 'spriteY': sprite.y, 'y':y})
            context.moveTo(leftOffSet + x + radius, topOffSet + y);
            context.arc(leftOffSet + x, topOffSet + y, radius, 0, 2 * Math.PI, false);
            context.fillStyle = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + color.a + ')';
        }
    }
}