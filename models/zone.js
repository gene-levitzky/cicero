
var fs = require("fs");

var model = require("./AbstractModel");

var Zone = new model.AbstractModel("zone", function(zoneObject) 
{    
    if (zoneObject.class !== "zone") {
        zoneObject.map = createMap(zoneObject.mapFile); 
    }
    
    Zone.make(this, zoneObject);
    
    this.get = function(x, y) {
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
    
    var map = {};
       
    var data = fs.readFileSync(mapFile, 'utf8');

    var layers = data.split('\n\r');
    console.log(layers.length);
    for (var i = 0; i < layers.length; i++) {
    
        var x = 0;
        var y = 0;
        
        map[i] = {};
    
        for (var j = 0; j < data.length; j++) {
            // Current character
            var c = data.charAt(j);
            // Go to next row
            if ('\r' === c) {
                j++;
                y++;
                x = 0;
                continue;
            }
            // Check to make sure this column exists and add it if it doesn't
            if (typeof map[i][x] === 'undefined') {
                map[i][x] = {};
            }
            map[i][x++][y] = data.charAt(j);
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