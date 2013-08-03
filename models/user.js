// "fs" = file system
// Used for saving to permanent file
var fs = require("fs");

var userNum = 0;

exports.User = function (username, password) 
{
  var user = {}; // <--- This is what I mean by *this* user.
  
  user.username = username;
  user.password = password;
  
  //user.id = userNum++; // No longer need this, see below
  
  user.save = function () {

    var allUsers = require("../database/user.json");
    
    id =  allUsers.topID;
    allUsers.topID++;
    
    allUsers.userList[id] = this;
                         
    fs.writeFile("../cicero/database/user.json", JSON.stringify(allUsers), function(err){
      if(err){throw err};
    });
  }
  
  return user;
}

exports.findByName = function(username) 
{

    var allUsers = require("../database/user.json").userList;
    
    for (id in allUsers) {
        if (allUsers[id].username == username) {
            return allUsers[id];
        }
    }
    
    return undefined;
}