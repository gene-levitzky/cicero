
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
        if (typeof this.map[x] == 'undefined' || typeof this.map[x][y] == 'undefined') {
            return ['.'];
        }
        return this.map[x][y];
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
        console.log(rows.length);
        for (var row = 0; row < rows.length; row++) {
        
            // Initialize this row if it doesn't already exist
            map[row] = map[row] || {};
        
            for (var col = 0; col < rows[row].length; col++) {
                
                // Initialize this column if it doesn't already exist
                map[row][col] = map[row][col] || {};
                // The symbol
                var s = rows[row][col];
                if ('.' != s) {
                    map[row][col][depth] = s;
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