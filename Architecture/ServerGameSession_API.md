# ServerGameSession Object

The Server Game Session object encapsulates all of the data associated with this Session's mirror UserGameSession.

## var socket 

Used to communicate with this Session's UserGameSession counterpart.

## function getFromUser (model, id)

Retrieves the model with the specified id from the user.

* `model` The model type, e.g., user, item, mob, in game time, etc.
* `id` The id of the desired model instance, if applicable.
* Returns the corresponding model object.

## function sendToUser (modelObjects)

Sends the given model object(s) to the user.

* `modelObject` The model object bein sent.
* Returns true if the operation was successful and false otherwise.


## function getFromDatabase (model, id)

Retrieves the model with the specified id.

* `model` The model type, e.g., user, item, mob, in game time, etc.
* `id` The id of the desired model instance, if applicable.
* Returns the corresponding model object.

## function sendToDatabase (modelObjects)

Saves the given model object(s) to the database.

* `modelObject` The model object being updated.
* Returns true if the operation was successful and false otherwise.
