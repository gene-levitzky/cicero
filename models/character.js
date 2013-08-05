var characterNum = 0;

exports.Character = function (name)
{
    var character = {};
    
    character.name = name;
    
    character.save = function () {

        var characters = require("../database/character.json");
        
        this.id =  characters.topID;
        characters.topID++;
        
        characters.objects[id] = this;
                             
        fs.writeFile("../cicero/database/characters.json", JSON.stringify(characters), function(err){
            if(err){throw err};
        });
        
        return this.id;
    }
    
    character.getUser = function () {
    
        var userCharacterTable = require("./userCharacter");
        return userCharacterTable.findByCharacterId(this.id);
    }
    
    return character;
}

exports.findById = function(id) 
{

  var characters = require("../database/character.json").objects;
  return characters[id];
}
