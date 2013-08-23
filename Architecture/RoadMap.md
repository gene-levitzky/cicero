# Road Map for Project Cicero

The following is both an outline for the architecture of the project as well as a list of things that need to be done.

## Glossary

#### API (Application Program Interface)

The list of public functions and their behavior of a particular object.

#### Character

A user's in-game character. A user may have more than one character, but each character can belong to only one user. Corresponds to the `character` model.

#### Client

Generic term for anyone using our application. Often used as a contrast to the server, i.e., anything done client-side is executed by the client's browser and not by our server.

#### User 

A client with an account on the website. Corresponds to the `user` model.

#### Player

A player is a user who is currently logged in as one of his characters. "Player" is simply a term to denote the person controlling a `character` model.

## Client - Server Communication

Clients will log in and perform typical web application functions through standard HTTP GET/POST requests. However, the game itself will communicate with the server through WebSockets which don't require page reloads and maintain constant communication with the server, which is an essential feature for an MMO. 

### Game Sessions

A Game Session object will be created on both the server and client side whenever a player logs into the game. The server's Game object will maintain a datastructure containing all of the Game Sessions currently active. On the client side, a Game Session script will be shipped to the player along with the main "view" page HTML.

The Client/Server Game Session pair will maintain communication between each other via a WebSocket connection. 

### Security

As soon as a user logs in to our website, they will be provided with a cookie that stores their usename, their logged in status, and some encrypted key that can be verified by our server to authenticate the user. During gameplay we'll be using WebSockets, which use encrypted communication, so security shouldn't be a concern.

### *More To Come*

## Game State Data

### Database

Most game data will be stored in the database. Players not currently logged in, item information, mob information, quest information, and any other data model that isn't in constant use will be stored in the database, though commonly accessed data should be cached in memory for quicker access.

### Game Object

The server will maintain a single global Game object that will manage all game interactions in a top-down format. 

The Game object will not directly interact with players, instead it will maintain a datastructure containing all zones (aka areas, maps, locations, etc) and other global data. 

#### Zones

Zones will maintain data about all players currently in that zone, as well as information about that zone itself such as mob placement, item placement, terrain, tiles, etc. 

Inter-zone communication will be managed by the Game object. So if a player moves from Zone A to Zone B, Zone A must make a request to the Game object which will then move the player to Zone B. 

#### Global Data

Global data will be stored mostly in the database. Auction house data, for example, might be too big to store entirely in memory, so instead the Game object will maintain a cache of commonly accessed parts of the auction house to make as few requests to the database as possible. Other global data might include things like global quest events or special events or perhaps things we have yet to think of.

#### Game Loop

The Game object will also maintain the "main game loop" which drives the core of the game. In pseudocode, the loop would look something like this:

    while (true) {
      foreach (zone in zones) zone.update();
    }

At the zone level, the update function might update the coordinate positions of mobs, the local in-game time, and trigger a broadcast event to all users in that zone notifying them of the various changes and updating their views to reflect them.

## To Do List

* Game mechanics design.
  * Character development**
  * Combat*
  * Worldbuilding (Mobs, zones, items, etc)

Priority is denoted by stars.

## Ideas

* Players move continuously along grid, not discretely.
* Visible but stationary mobs.
* Inventory limitations
  * Carts
    * Can be lost if all associated players die,
    * Can be shared by party
* Purse limitations, 100 gold, 1000 bank notes, 10 crowns
  * 1 bank note = 100 gold, 1 crown = 1000 bank notes (100,000 gold)
* Boat
  * Boat combat?
* Potency - players' actions more potent after training (grinding), less so after KOing.
* Player run shops and businesses.
* Obscured statistics on everything (no implementation of any game mechanic should be explicit). 
  * Player effectiveness, as measured by physical damange or magical resistance for example, would rise gradually and be imperceptible to the player. 
  * There should also be no explicit leveling system. Players may attempt to increase their rank with various factions at any point so that their skill level can be gauged by other players. However, these tests should not be conditioned on anything other than the player's capabilities (i.e., the tests should be available at all times and should not be based on arbitrary factors such as the amount of experience the player has at the time).
  * Skills, i.e. active/passive traits, special maneuvres, etc, would also be gained in a hidden manner. If a player trains heavily with a sword, for example, he may acquire certain traits and skills based on that.
* Faction driven gameplay.
  * Anything can be a faction. A city. A guild. A bank. Players may start their own factions. 
  * Much of the gameplay should focus around advancing the prestige of a faction. 
  * A city's economy should be based on the progress of its central faction (the city itself), and the various factions that reside therein. 
  * Players may purchase property from cities and use them for their factions or for whatever purposes they like.
  * Factions of a certain size should be able to establish their own cities (factions of over 150 players?).
  * Some examples of built-in factions:
    * Banks
    * City Governance
    * City Guard
    * Craft Guilds
    * Criminal organizations
* Bottom-up civilization game.
