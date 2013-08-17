// "fs" = file system
var fs = require("fs");

exports.AbstractModel = function(modelName, construct) {

    this.modelName = modelName;
    this.construct = construct;
    
    this.make = function (modelObject, modelFields) {    
    
        modelObject.class = this.modelName;

        for (var field in modelFields) {
            modelObject[field] = modelFields[field];
        }
        
        modelObject.save = function () {
        
            var abstractModel = require("../database/" + modelObject.class + ".json");
            
            if (typeof modelObject.id === "undefined") {
                modelObject.id = abstractModel.topID;
                abstractModel.topID++;
            }

            abstractModel.objects[modelObject.id] = modelObject;
            fs.writeFile("./database/" + modelObject.class + ".json", JSON.stringify(abstractModel), function(err){
                if(err){throw err};
            });
            
            return modelObject.id;
        }
    }

    this.findById = function(id) {

      var abstractModels = require("../database/" + this.modelName + ".json").objects;
      
      if (typeof abstractModels[id] !== "undefined") {
          return new this.construct(abstractModels[id]);
      }
    }
    
    this.all = function() {
        
        var models = require("../database/" + this.modelName + ".json").objects;
        var out = {};
        
        for (id in models) {
            out[id] = new this.construct(models[id]);
        }
        
        return out;
    }
}