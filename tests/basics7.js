// Only class properties are restricted
// Instance properties are created dynamically
// Reuse entity for different persons
// Once exported, available for public to use
module.exports = class Person 
{
   // Class property - this never changes on object instance creation
    age = 25
   
    // or location = "Canada"

    get location()               // this getter method is a Class property
    {                            // never changes each time on object
        return "Canada"          // instance creation
    }

    // constructor is method which executes by default when you 
    // create of the class
    // constructor not holding any values
    // firstName, lastName are instance properties - change each time on object instance creation
    constructor (firstName, lastName)
    {
        this.firstName = firstName
        this.lastName  = lastName
    }

    // methods are instance properties - change each time on object instance creation
    fullName()
    {
        console.log(this.firstName + this.lastName)
    }

}

/* 
let person = new Person('Tim', 'Joseph')      // object instance created with firstName, lastName provided
let person1 = new Person('Chris', 'Jones')
console.log(person.age)                       // Class property - never change on object instance creation
console.log(person.location)                  // callig a getter property, no () need - class propery never change on object instance creation
console.log(person.fullName())                // calling a method, () need - Instance property
console.log(person1.fullName())               // Instance property - fullName depends on what parameters provided when object instance created 
*/