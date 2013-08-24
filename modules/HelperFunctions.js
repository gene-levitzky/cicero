/** HELPER FUNCTIONS **/

exports.isUndefined = function(obj) {
    return typeof obj === "undefined";
}

exports.euclideanDistance = function(c1, c2) {
    return Math.ceil(Math.sqrt((c1.x - c2.x) * (c1.x - c2.x) + (c1.y - c2.y) * (c1.y - c2.y)));
}