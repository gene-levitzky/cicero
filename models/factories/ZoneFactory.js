
var zoneModel = require("../zone");

var zones = require("./zones.json");

for (id in zones) {
    var zone = new zoneModel.Zone(zones[id]);
    zone.save();
}