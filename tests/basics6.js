// object is collection of properties
// All properties are restricted 

let person = {
    firstName: 'Tim',
    lastName: 'Joe',
         age: 25,
    fullName: function()
    {
       console.log(this.firstName + ' ' + this.lastName)  // this -> current object
    }
}

console.log('******************')
console.log(person.fullName())                            // fullName() is a function - must have ()
console.log(person.lastName)
console.log(person['lastName'])                           // Has to be in String

person.firstName = 'Tim Dane'
console.log(person.firstName)
console.log(person['firstName'])
person.gender = 'male'                                   // Add a new property not exist
console.log(person)
delete person.gender                                     // Delete a property
console.log(person)
console.log('gender' in person)                         // Check if property exists

// print all the values of JavaScript object
for (key in person)
{
    console.log(person[key])
}