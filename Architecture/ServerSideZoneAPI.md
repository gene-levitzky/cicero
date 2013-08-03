# Zone API

The Zone object contains all relevant data to a particular in game "zone" or area. Each zone contains a map (an n x m grid of Tile objects) and a datastructure containing all PCs and NPCs in that zone. Things like treasure chests, for example, would fall under the NPC category.

## function getNPCById(id)

*param* `id` The id of the NPC to be retrieved.  
*returns* The NPC with the given id if it exists, undefined otherwise.  

Retrieves the NPC with the given id.

## function getPCByID(id)

*param* `id` The id of the PC to be retrieved.  
*returns* The PC with the given id if it exists, undefined otherwise.  

Retrieves the PC with the given id.

## function getTile(x, y)

*param* `x` The x-coordinate of the tile.  
*param* `y` The y-coordinate of the tile.  
*returns* The tile at the (x, y) coordinate of the map if it exists, undefined otherwise.  
  
Retrieves the map tile at the specified coordinate.  

## function getZoneID()

*returns* The id of this zone.  
  
Returns the id of this zone.  

## function getZoneName()

*returns* The name of this zone.  
  
Returns the name of this zone.  

## function getZoneTime()

*returns* The local in-game time of this zone.  
  
Returns the local in-game time of this zone.  

## function moveNPC(id, direction)

*param* `id` ID of the NPC to move.  
*param* `direction` The direction to move the NPC. Must be either 'north', 'south', 'east', or 'west'.  
*returns* True if the NPC moved successfully, and false otherwise.  
  
Moves the NPC with the given ID in the given direction by 1 unit. Equivalent to incrementing or decrementing one of the NPC's coordinates. If the NPC is unable to move, such as due to obstacles or negative effects, the function will return false.   

## function movePC(id, direction)

*param* `id` ID of the PC to move.  
*param* `direction` The direction to move the PC. Must be either 'north', 'south', 'east', or 'west'.  
*returns* True if the PC moved successfully, and false otherwise.  
  
Moves the PC with the given ID in the given direction by 1 unit. Equivalent to incrementing or decrementing one of the PC's coordinates. If the PC is unable to move, such as due to obstacles or negative effects, the function will return false. If this function returns true, the PC will automatically interact with any object in the new tile (such as any NPC).  

## function placePC(pc, x, y)

*param* `pc` The player's Character object to be placed.  
*param* `x` The x-coordinate of where to be placed.  
*param* `y` The y-coordinate of where to be placed.  
*returns* True if the PC was placed at (x,y) successfully and false otherwise.   
  
Places the given character in the given coordinate.  

## function removePC(id)

*param* `id` ID of the PC to be removed.  
*returns* True if the PC was successfully removed, false otherwise.  
  
Removes the PC with the given ID from this zone.  
