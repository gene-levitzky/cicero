/**
 * A tile represents a square unit in the game world map. It defines the
 * graphical representation of that square, the environmental effects
 * associated with that square, and the NPCs that spawn/live in that square.
 *
 * A tile object is defined by the following properties:
 *
 * @param {string} `background` The background color of this tile.
 *
 *  @param {object} `enemies` An index of {enemy, probability} pairs. The
 *                            probability specifies the odds of this enemy
 *                            spawning over another. The probability must be
 *                            expressed as a decimal between 1 and 0 inclusive.
 *                            Furthermore, the sum of all probabilities must be
 *                            1 or some undesired behaviors might arise.
 *
 * @param {object} `environmentEffects` Specifies the effect this tile has on 
 *                                      characters interacting with it. 
 *                                      consists of the following fields:
 *    @param {object} `effect`     A list of ambient effects incurred while 
 *                                 interacting with this tile. 
 *    @param {object} `attributes` The changes to a character's attributes 
 *                                 incurred while interacting with this tile.
 *
 * @param {function} `interact(character)` This function is called whenever a
 *                                         character moves and ends on this 
 *                                         tile (even if the character started
 *                                         on it).
 *
 * @param {object} `polygons`   An index of polygon objects, where polygon 
 *                              objects are defined as follows:
 *    @param {string} `color`  Color of the polygon.
 *    @param {boolean} `fill`  If set to true, will draw a solid polygon of the
 *                             the specified color. Default is false.
 *    @param {int} `height`    The height of this polygon. Units are in percent
 *                             of the tile size. Has no effect if `shape` is 
 *                             set to "polygon".
 *    @param {string} `shape`  The shape of this polygon. Options are "oval",
 *                             "polygon", and "rectangle"
 *    @param {int} `thickness` The brush thickness in units of percent of the 
 *                             tile's size. Default is 1. 
 *    @param {int} `width`     The width of this polygon. Unis are in percent 
 *                             of the tile size. Has no effect if `shape` is 
 *                             set to "polygon".
 *    @param {int} `x`         An index of the x-coordinates of the polygon's
 *                             vertices. Set as a single number (not an object)
 *                             if `shape` is set to anything other than 
 *                             "polygon".
 *    @param {int} `y`         An index of the y-coordinates of the polygon's
 *                             vertices. Set as a single number (not an object)
 *                             if `shape` is set to anything other than 
 *                             "polygon".
 *
 */
                              

exports._lawnGrass = {
    "background": "green",
}