
var fs = require("fs");

var model = require("./AbstractModel");

var Character = new model.AbstractModel("character", function (characterObject)
{    
    Character.make(this, characterObject);
    
    this.getUser = function () {
    
        var UserCharacter = require("./userCharacter").UserCharacter;
        return UserCharacter.findByCharacterId(this.id);
    }
});

Character.findByName = function(name) {
    
    var character = require("../database/character.json");
    
    for (id in character.objects) {
        if (name === character.objects[id]) {
            return new Character.construct(character.objects[id]);
        }
    }
    
    return;
}


exports.Character = Character;