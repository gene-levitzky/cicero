// "fs" = file system
// Used for saving to permanent file
var fs = require("fs");


exports.User = function (username, password, userObject) 
{    
    this.username = username;
    this.password = password;
    
    if (typeof userObject !== "undefined") {
        this.username = userObject.username;
        this.password = userObject.password;
    }
    
    this.save = function () {

        var users = require("../database/user.json");
        
        if (typeof this.id === "undefined") {
            this.id = users.topID;
            users.topID++;
        }
        
        users.objects[this.id] = this;
                             
        fs.writeFile("../cicero/database/user.json", JSON.stringify(users), function(err){
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


exports.findByName = function(username) 
{

    var users = require("../database/user.json").objects;
    
    for (var id in users) {
    
        if (users[id].username == username) {
            return userFromJSON(users[id]);
        }
    }
    
    return undefined;
}

exports.findById = function(id) 
{

  var users = require("../database/user.json").objects;
  return userFromJSON(users[id]);
}

function userFromJSON(userJSON) {
    return new User("", "", userJSON);
}