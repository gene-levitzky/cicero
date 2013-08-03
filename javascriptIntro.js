///////////////////
//// VARIABLES ////
///////////////////

var x = 1;

console.log(x); // prints "1"

x = "Now it's a string";

console.log(x); // prints "Now it's a string"

x = 'you can also use single quotes for strings';

// Arrays are easy to declare
// And they can hold objects of any type
var array = ["this", 'is', "an 'array'", 3, true];
console.log(array); // Should print "['this', 'is', 'an \'array\'', 3, true]"
// It gets weird though
// You can specify keys like this:
array["someKey"] = "someValue";

// So you can access "someValue" by doing array["someKey"] OR array.someKey (without quotes)
// You can also access the first 5 elements by doing array[0] ... array[4] 
// OR by doing array["0"] ... array["4"] 

console.log(array); // should print "['this', 'is', 'an \'array\'', 3, true, someKey: 'someValue']"

///////////////////
//// FUNCTIONS ////
///////////////////

// Functions can be declared in two ways:

function addition (a, b) {
  return a + b;
}

var substraction = function (a, b) {
  return a - b;
}

// The first way is preferred.

// A neat feature of JS is that functions can take functions as parameters:

function outterFunction (inner, param1, param2) {
  return inner(param1, param2);
}

var result = outterFunction(addition, 5, 5);

console.log(result); // Should print 10

// JS functions also need not take all parameters
// For example, you can call addition(1)
// You'll just get a NaN result.
// You can also call it with more parameters than specified
// For example, you can call addition(1,1, "random string")
// And the result will be 2, since the function doesn't check for a third parameter.




/////////////////
//// OBJECTS ////
/////////////////

// There's a variety of ways of creating objects, here's a few different ways:

var object1 = {}; // equivalently, var object1 = new Object();

object1.property1 = "Some property of object1";
object1.property2 = 72;
object1.function1 = function (a) {
  this.property2 += a;
}

console.log(object1.property2); // Should print 72

object1.function1(8);

console.log(object1.property2); // Should print 80

// But this way is better:

var object2 = {

  property1: "Some of property of object2.",
  
  property2: 72,
  
  function1: function (a) {
    this.property2 += a;
  }
};

console.log(object2.property2); // Should print 72

object2.function1(8);

console.log(object2.property2); // Should print 80

// Even better, if you want your objects to be modular, you right a function to make them:

function objectMaker (property1, property2, function1) {

  var object = {
    
    property1: property1,
    // you can also do "property1": property1, and it's exactly the same
    property2: property2,
    
    function1: function1  
  };

  return object;
}

var object3 = objectMaker("Some property of object3", 72, function (a) {
  object3.property2 += a;
  // Note that this is actually poor modularity.
  // In good modular design, you should never know about the inner workings of an object,
  // whereas here we assumed objectMaker produces an object with a field called "property2".
});

console.log(object3.property2); // Should print 72

object3.function1(8);

console.log(object3.property2); // Should print 80