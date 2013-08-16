// "fs" = file system
var fs = require("fs");

exports.modelName = "AbstractModel";
exports.constructor = undefined;

var make = function (modelObject, modelFields) 
{    
    modelObject.class = exports.modelName;
    
    for (var field in modelFields) {
        modelObject[field] = modelFields[field];
    }
    
    modelObject.save = function () {
        
        var abstractModel = require("../database/" + exports.modelName + ".json");
        
        if (typeof modelObject.id === "undefined") {
            modelObject.id = abstractModel.topID;
            abstractModel.topID++;
        }

        abstractModel.objects[modelObject.id] = modelObject;
        fs.writeFile("../database/" + exports.modelName + ".json", JSON.stringify(abstractModel), function(err){
            if(err){throw err};
        });
        
        return modelObject.id;
    }
}

var findById = function(id) {

  var abstractModels = require("../database/" + exports.modelName + ".json").objects;
  
  if (typeof abstractModels[id] !== "undefined") {
      return new exports.constructor(abstractModels[id]);
  }
}

exports.make = make;
exports.findById = findById;