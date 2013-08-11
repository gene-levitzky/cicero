// "fs" = file system
// Used for saving to permanent file
var fs = require("fs");


var User = function (userObject) 
{    
    this.class = "User";

    this.id = userObject.id;
    this.username = userObject.username;
    this.password = userObject.password;
    
    this.save = function () {

        var user = require("../database/user.json");
        
        if (typeof this.id !== "undefined") {
            user.objects[this.id] = this;
        }
        else {
            this.id = user.topID;
            user.topID++;
            user.objects[this.id] = this;
        }
                             
        fs.writeFile("database/user.json", JSON.stringify(user), function(err){
            if(err){throw err};
        });
        
        return this.id;
    }
    
    this.getCharacters = function () {
        
        var userCharacterTable = require("./userCharacter");
        var characterTable = require("./character");
        var outList = [];
        
        var userCharacters = userCharacterTable.findByUserId(this.id);
        
        for (var cid in userCharacters) {
            outList[cid] = characterTable.findById(cid);
        }        
        
        return outList;
    }
}


var findByName = function(username) {

    var user = require("../database/user.json");
    
    for (var id in user.objects) {
        if (username === user.objects[id].username) {
            return User(user.objects[id]);
        }
    }
    
    return;
}

var findById = function(id) {

  var users = require("../database/user.json").objects;
  return User(users[id]);
}


exports.findById = findById;
exports.findByName = findByName;
exports.User = User;