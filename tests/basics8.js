// Inheritance is the Main Pillar in object oriented programming
// One class can inherit/acquire the properties, methods of another class
// Then class which inherits the properties of other is known as subclass (derived class, child class)
// The class whose properties are inherited is knowns as superclass

// Must first export the Person class and then import the Person class before inheritance can work
const Person = require("./basics7")  // Pet inherited properties from Person
class Pet extends Person
{
   
   // write location again because implementation/code is different
   get location()
   {
        return "BlueCross"
   }
   
   constructor(firstName, lastName)
   {
        // call parent class constructor
        super(firstName, lastName)
   }
   // No need to write fullName() method, if same implementation, it is inherited from superclass
}

let pet = new Pet('Sam', 'San')
pet.fullName();
console.log(pet.location)
console.log(pet.age)