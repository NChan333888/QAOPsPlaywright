const Person = require('./basics7')


let day = 'tuesday '         // each character is treated as 1 index, space is also one character 
console.log(day.length)      // 8
let subDay = day.slice(0,4)  // first 4 character
console.log(subDay)          // tues
console.log(day[1])          // u
// tue day
let splitDay = day.split('s')
// day
console.log(splitDay[1].length)
console.log(splitDay[1].trim())  // .trim() - remove leading/trailing characters
console.log(splitDay[1].trim().length)

let date = '23'
let nextDate = '27'
let diff = parseInt(nextDate) - parseInt(date) // convert string to integer
console.log(diff)
diff.toString()                                // convert integer to string


let newQuote = day + 'is funday day'               // + concantenates 2 strings
console.log(newQuote)
let val1 = newQuote.indexOf('day', 5)          // search index of 'day' after the 5 index 
console.log(val1)

console.log('*******************************')
// tuesday is Funday
let count = 0
let val2 = newQuote.indexOf('day')             // if value not exist, indexOf returns -1
while (val2!==-1)                              // !== means not equal to, == means equal to
{                                              // while loop keeps running until the condition is false
  console.log(val2)
  count++
  console.log(count)
  val2 = newQuote.indexOf('day', val2+1)
}
console.log('Final count: ' + count)

let person = new Person("Chris", "Edward")  // create Person on different file by import
console.log(person.fullName())
