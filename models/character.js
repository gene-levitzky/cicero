
var fs = require("fs");

var characterNum = 0;


var Character = function (characterObject)
{    
    this.class = "Character";
    
    this.id = characterObject.id;
    this.name = characterObject.name;
    this.attributes = characterObject.attributes
    this.location = characterObject.location;
    
    this.save = function () {

        var character = require("../database/character.json");
        
        if (typeof this.id !== "undefined") {
            character.objects[this.id] = this;
        }
        else {
            this.id =  characters.topId;
            characters.topId++;        
            characters.objects[id] = this;
        }
                             
        fs.writeFile("database/character.json", JSON.stringify(characters), function(err){
            if(err){throw err};
        });
        
        return this.id;
    }
    
    this.getUser = function () {
    
        var userCharacterTable = require("./userCharacter");
        return userCharacterTable.findByCharacterId(this.id);
    }
}

var findById = function(id) {

    var characters = require("../database/character.json").objects;
    return new Character(characters[id]);
}

var findByName = function(name) {
    
    var character = require("../database/character.json");
    
    for (id in character.objects) {
        if (name === character.objects[id]) {
            return new Character(character.objects[id]);
        }
    }
    
    return;
}


exports.Character = Character;
exports.findById = findById;