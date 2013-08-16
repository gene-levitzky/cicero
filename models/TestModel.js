
var model = require("./AbstractModel");

model.modelName = "test";

model.constructor = function(testObject) {
    model.make(this, testObject);
    
    this.print = function() {
        console.log(this.desc);
    }
}

//var test = new model.constructor({"desc":"THIS IS ANOTHER TEST"});
var test = model.findById(0);

for (field in test) {
    console.log(field);
}

test.save();
test.print();