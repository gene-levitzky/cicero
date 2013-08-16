
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
    
    var x = 0;
    var y = 0;
    
    var data = fs.readFileSync(mapFile, 'utf8');
    
    for (var i = 0; i < data.length; i++) {
        // Current character
        var c = data.charAt(i);
        // Go to next row
        if ('\r' === c) {
            i++;
            y++;
            x = 0;
            continue;
        }
        // Check to make sure this column exists and add it if it doesn't
        if (typeof map[x] === 'undefined') {
            map[x] = {};
        }
        map[x++][y] = data.charAt(i);
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