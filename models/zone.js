
var fs = require("fs");

var model = require("./AbstractModel");

var Zone = new model.AbstractModel("zone", function(zoneObject) 
{    
    if (zoneObject.class !== "zone") {
        zoneObject.map = createMap(zoneObject.mapFile); 
    }
    
    Zone.make(this, zoneObject);
    
    /**
     * Returns a list of tiles, in order, for the given coordinate.
     *
     * @param {int} `x` The x-coordinate.
     * @param {int} `y` The y-coordinate.
     *
     * @return {object} A list of tiles at the given coordinate.
     */
    this.get = function(x, y) {
        
        if (typeof this.map[y] === 'undefined') {
            return this.map[y];
        }
        
        return this.map[y][x];
    }
});


/**
 * Constructs a 2D character array representation of the given map file.
 * 
 * @param {string} `mapFile` The file path to the raw text .cmap file.
 * @return {object} Returns a 2D character array map.
 */
function createMap(mapFile) {
    
    // Read data in from file
    var data = fs.readFileSync(mapFile, 'utf8');
    // Split data into layers
    var layers = data.split('\r\n\r\n');
    // The map object to be returned
    var map = {};
    
    // For each layer
    for (var depth = 0; depth < layers.length; depth++) {
    
        // Split layer into rows
        var rows = layers[depth].split('\r\n');
        
        // Add padding to top and left edges of maps
        if (depth == 0) {        
        
            var lengthOfLongestRow = 0;
            var blankString = '';
            
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].length > lengthOfLongestRow) {
                    lengthOfLongestRow = rows[i].length;
                }
            }
            
            for (var i = 0; i < lengthOfLongestRow; i++) {
                blankString += ' ';
            }
        
            for (var i = 0; i < 10; i++) {
                
                rows.unshift(blankString);
                rows.push(blankString);
                
                for (var j = 0; j < rows.length; j++) {
                    rows[j] = ' ' + rows[j] + ' ';
                }
            }
            
            console.log(rows);
        }
        
        // Offset for padding, only applicable for depth > 0
        var offset = depth == 0 ? 0 : 10;
        
        for (var row = 0; row < rows.length; row++) {
        
            // Initialize this row if it doesn't already exist
            map[row] = map[row] || {};
        
            for (var col = 0; col < rows[row].length; col++) {
                
                // Initialize this column if it doesn't already exist
                map[row][col] = map[row][col] || {};
                // The symbol
                var s = rows[row][col];
                if ('.' != s) {
                    map[row + offset][col + offset][depth] = s;
                }
            }
        }
    }
    
    return map;
}


Zone.findByName = function(name) {
    
    var zone = require("../database/zone.json");
    
    for (id in zone.objects) {
        if (name === zone.objects[id]) {
            return new Zone.construct(zone.objects[id]);
        }
    }
    
    return;
}

exports.Zone = Zone;