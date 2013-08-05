// "fs" = file system
// Used for saving to permanent file
var fs = require("fs");

exports.UserCharacter = function (userId, characterId) 
{
    var userCharacter = {}; // <--- This is what I mean by *this* user.
    
    userCharacter.userId = userId;
    userCharacter.characterId = characterId;
    
    userCharacter.save = function () {

        var userCharacters = require("../database/userCharacter.json");
        
        this.id =  userCharacters.topID;
        userCharacters.topID++;
        
        userCharacters.objects[id] = this;
                             
        fs.writeFile("../cicero/database/userCharacter.json", JSON.stringify(users), function(err){
            if(err){throw err};
        });
        
        return this.id;
    }
    
    return userCharacter;
}


exports.findByCharacterId = function(id) 
{
    var userCharacters = require("../database/userCharacter.json").objects;
    return userCharacters[id];
}


exports.findByUserId = function(id) 
{

  var userCharacters = require("../database/userCharacter.json").objects;
  var outList = [];
  
  for (var ucid in userCharacters) {
      
      var userCharacter = userCharacters[ucid];
      if (userCharacter.user == id) {
          console.log("in findbyuser   " + userCharacter.user + " -- " + id);
          outList[ucid] = userCharacter;
      }
  }
  
  return outList;
}
