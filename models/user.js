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
    // I've changed database/user.json, so check that out so the following makes more sense.
    var allUsers = require("../database/user.json");
    
    // First, add id to *this* here using the topID from the database
    // Don't forget to increment topID for the next user
	this.id =  allUsers.topID;
	allUsers.topID++;
    
	allUsers.userList[this.id] = this;
    // allUsers.userList.push(this); // Instead of just pushing it to allUsers, push it to userList
                         // But, we need a good way of indexing for quick access. 
                         // This is where the id comes in.
                         // Do something like ...userList[this.id] = this
                         
    // The rest should be the same
                         
    fs.writeFile("../solstice/database/user.json", JSON.stringify(allUsers), function(err){
      if(err){throw err};
    });
  }
  
  return user;
}

