
var fs = require("fs");

var model = require("./AbstractModel");

var UserCharacter = new model.AbstractModel ("userCharacter", function(userCharacterObject) 
{
    UserCharacter.make(this, userCharacterObject);
});


UserCharacter.findByCharacterId = function(id) {

    var userCharacters = require("../database/userCharacter.json").objects;
    return new UserCharacter.construct(userCharacters[id]);
}


UserCharacter.findByUserId = function(id) {

  var userCharacters = require("../database/userCharacter.json").objects;
  var outList = [];
  
  for (var ucid in userCharacters) {
      
      var userCharacter = userCharacters[ucid];
      if (userCharacter.user == id) {
          outList[ucid] = new UserCharacter.construct(userCharacter);
      }
  }
  
  return outList;
}

exports.UserCharacter = UserCharacter;