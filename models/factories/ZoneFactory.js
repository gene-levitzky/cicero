
var Zone = require("../zone").Zone;

var zones = require("./zones.json");

for (id in zones) {
    var zone = new Zone.construct(zones[id]);
    zone.save();
}