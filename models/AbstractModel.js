// "fs" = file system
var fs = require("fs");

/** 
 * Creates a generic model with the given name and constructor.
 *
 * @param {string}   `modelName` The name of the new model.
 * @param {function} `construct` The constructor for the new model. Used only
 *                               to reconstruct the object after retrieving it
 *                               from the database. The constructor must be 
 *                               specified as otherwise the model has no way 
 *                               of remembering the functions that are added to
 *                               it.
 */
exports.AbstractModel = function(modelName, construct) {

    this.modelName = modelName;
    this.construct = construct;
    
    this.make = function (modelObject, modelFields) {    
    
        modelObject.class = this.modelName;

        for (var field in modelFields) {
            modelObject[field] = modelFields[field];
        }
        
        /**
         * Persists the model to the database, saving all of its properties,
         * but none of its functions.
         *
         * @return {int} Returns the ID of the model saved.
         */
        modelObject.save = function () {
        
            var abstractModel = require("../database/" + modelObject.class + ".json");
            // If the given model is being saved for the first time, it has no ID yet
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

    /**
     * Finds the model with the given ID.
     *
     * @param {int} `id` The ID of the model to be found.
     *
     * @return {object} The model with the given ID, after having the model's
     *                  unique constructor called on it. Thus, the returned 
     *                  model object contains all of its properties AND 
     *                  functions.
     */
    this.findById = function(id) {

      var abstractModels = require("../database/" + this.modelName + ".json").objects;
      
      if (typeof abstractModels[id] !== "undefined") {
          return new this.construct(abstractModels[id]);
      }
    }
    
    /**
     * Retrieves all models of this type from the databse.
     *
     * @return {object} A dictionary of id => model pairs of all models of this
     *                  type. The returned models are complete with all of 
     *                  their functions like the individual models returned by
     *                  ``findById``.
     */
    this.all = function() {
        
        var models = require("../database/" + this.modelName + ".json").objects;
        var out = {};
        
        for (id in models) {
            out[id] = new this.construct(models[id]);
        }
        
        return out;
    }
}