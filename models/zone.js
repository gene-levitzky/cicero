
var fs = require("fs");

var Zone = function(zoneObject) 
{
    this.class = "Zone";
    
    this.id = zoneObject.id;
    this.mapFile = zoneObject.mapFile;
    this.name = zoneObject.name;
    
    if (zoneObject instanceof Zone) {
        this.map = zoneObject.map;
    }
    else {
        this.map = createMap(zoneObject.mapFile); 
    }
    
    this.get = function(x, y) {
        return this.map[x][y];
    }
    
    this.save = function() {
        
        var zone = require("../database/zone.json");
        
        if (typeof this.id !== 'undefined') {
            zone.objects[this.id] = this;
        }
        else {
            this.id = zone.topId;
            zone.topId++;
            zone.objects[this.id] = this;
        }
        
        fs.writeFile("database/zone.json", JSON.stringify(zone), function(err){
            if(err){throw err};
        });
        
        return this.id;
    }
}


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


var findByName = function(name) {
    
    var zone = require("../database/zone.json");
    
    for (id in zone.objects) {
        if (name === zone.objects[id]) {
            return Zone(zone.objects[id]);
        }
    }
    
    return;
}


exports.findByName = findByName;
exports.Zone = Zone;