# Client Game Session

## Server API

Handles all communication between the client (via the Game Session object) and the Server.

### function move(direction)

**param** `direction` The direction to move the PC. Must be either 'north', 'south', 'east', or 'west'.  
**returns** An updated Zone object with the PC's new position or undefined otherwise.

Moves the PC with the given ID in the given direction by 1 unit. Equivalent to incrementing or decrementing one of the PC's coordinates. If the PC is unable to move, such as due to obstacles or negative effects, the function will return false. If this function returns true, the PC will automatically interact with any object in the new tile (such as any NPC).  

### function useItem(id)

**param** `id` The ID of the item in the PC's inventory.
**returns** An updated PC inventory object or undefined otherwise.

Uses the specified item in the PC's inventory. If the item is a piece of equipment, the server will attempt to equip that item onto the PC. If it's a consumable item such as a potion, food, etc, the server will attempt to consume it and add whatever, if any, effects to the PC. If the item was successfully used, a new inventory object will be returned to reflect the new state of the PC's inventory, if not, undefined will be returned.

### function requestMode (modeName) 

**param** `modeName` The name of the requested mode.
**returns** The requested mode or undefined.

This function is called when the PC attempt to switch mode by navigating through client-side menus, e.g., when a PC attempts to view their inventory. If the mode is available in context, then a new instance of that mode will be returned, and if not, undefined will be returned.

## Game Mode API

The following functions are the ONLY functions that the user is intended to call, though we must keep in mind that all functions here are exposed to the user due to javascript's lack of the `private` keyword.

### function draw ()

Draws the user interface to the webpage.

### function keyboardEvent (event)

**param** `event` The keyboard event.

Catches keyboard events and then delegates them based on the current mode.

### function mouseEvent (event)

**param** `event` The mouse event.

Catches mouse events and then delegates them based on the current mode.

## Data API

### function getEquipment (playerID)

**param** `playerID` The ID of the player whose equipment is to be retrieved.
**returns** An array of Equipment.

Returns the Equipment objects belonging to the player with the specified ID. Use playerID = 0 to retrieve this player's equipment. Returns undefined for an invalid ID.

### function getInventory ()

**returns** An array of Items.

Returns all items belonging to the player.

### function getCharacters(x, y)

**param** `x` The x-coordinate of the characters.  
**param** `y` The y-coordinate of the characters.  
**returns** An array of characters.
  
Retrieves characters (PCs, NPCs, and mobs), if any, at the specified location. Returns an empty array if none.

### function getTiles(x, y)

**param** `x` The x-coordinate of the tile.  
**param** `y` The y-coordinate of the tile.  
**returns** An array of tiles.
  
Retrieves the map tile at the specified coordinate. Returns an empty array if invalid coordinate.