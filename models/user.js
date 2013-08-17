// "fs" = file system
// Used for saving to permanent file
var fs = require("fs");

var model = require("./AbstractModel");

var User = new model.AbstractModel("user", function (userObject) 
{       
    User.make(this, userObject);
    
    this.getCharacters = function () {
        
        var UserCharacter = require("./userCharacter").UserCharacter;
        var Character = require("./character").Character;
        var outList = [];
        
        var userCharacters = UserCharacter.findByUserId(this.id);
        
        for (var id in userCharacters) {
            outList[id] = Character.findById(userCharacters[id].user);
        }        

        return outList;
    }
});

User.findByName = function(username) {

    var user = require("../database/user.json");
    
    for (var id in user.objects) {
        if (username === user.objects[id].username) {
            return new User.construct(user.objects[id]);
        }
    }
    
    return;
}

exports.User = User;