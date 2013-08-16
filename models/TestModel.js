
var model = require("./AbstractModel");

model.modelName = "test";

model.constructor = function(testObject) {
    model.make(this, testObject);
    
    this.print = function() {
        console.log(this.desc);
    }
}

//model.constructor = Test;

//var test = new Test({"desc":"THIS IS A TEST"});
var test = model.findById(0);

console.log(test instanceof model.findById);