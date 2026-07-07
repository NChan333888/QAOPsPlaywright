// Array is a collection of elements
// let cannot be redeclared, so use var
var marks = Array(6)
var marks = new Array(20, 40, 35, 12, 37, 100)

// array index starts from 0
var marks = [20, 40, 35, 12, 37, 100]
subMarks = marks.slice(2,5)             // .slice(start index, stop but not include index).
console.log(subMarks)                   //  create sub-array from a main array, subMarks is var also
                                        // [ 35, 12, 37 ], start at index '2' and stop at but not include index '5'
console.log(marks)                      // 20, 40, 35, 12, 37, 100
console.log(marks[2])                   // 35
marks[3] = 14           
console.log(marks[3])                   // 14
console.log(marks)                      // 20, 40, 35, 14, 37, 100
console.log(marks.length)               // length -> array size
marks.push(65)                          // .push(65) -> Append new element to array
console.log(marks)                      // 20, 40, 35, 14, 37, 100, 65
marks.pop()                             // ,pop(65) => delete element at the end
console.log(marks)                      // 20, 40, 35, 14, 37, 100
marks.unshift(12)                       // .unshift(12) -> insert an element at start of an array
console.log(marks)                      // 12, 20, 40, 35, 14, 37, 100 
console.log(marks.indexOf(100))         // .indexOf(100) -> find index of an element
console.log(marks.includes(120))        // .includes(120) -> check if an element is included in an array 

var sum = 0
for(let i=0; i<marks.length; i++)
{
    sum = sum + marks[i]
    // console.log(marks[i])
    console.log(sum)
}
console.log(sum)

// reduce -> perform the same as above for loop
// reduce -> sum up the numbers in an array
let total = marks.reduce((sum, mark)=>sum+mark, 0)
console.log(sum)

var scores = [12, 13, 14, 16]
// create new array with even numbers of scores array [12. 14. 16]
var evenScores = []
console.log(evenScores)
for(let i=0; i<scores.length; i++)
{
    if (scores[i]%2 == 0) 
    {
        evenScores.push(scores[i])

    }
}
console.log(evenScores)
// produce same result at the for loop
// filter -> only perform when condition meets
let newFilterEvenScores = scores.filter(score=>score%2 == 0)
console.log(newFilterEvenScores)  // [ 12, 14, 16 ] => [36, 42, 48]

// map -> all operations performed, mapping 1 value to a new value
let mappedArray = newFilterEvenScores.map(score=>score*3)
console.log(mappedArray) // [ 12, 14, 16 ] => [36, 42, 48]

let totalValue = mappedArray.reduce((sum,value)=>sum=sum+value, 0)
console.log(totalValue)
console.log('*****************************************')
var scores1 = [12, 13, 14, 16]
let sumValue = scores1.filter(score=>score%2==0).map(score=>score*3).reduce((sum,score)=>sum+score, 0)
console.log(sumValue)

// sort a string array
let fruits = ["Banana", "mango", "Pomegrante", "apple"]
console.log(fruits)
console.log(fruits.sort())           // .sort() is case-sensitive, uppercase sorted first in ascending order
console.log(fruits.reverse())        // .reverse() is also case-sensitive, uppercase sorted first in descending order

// for number
var scores1 =[12, 003, 19, 16, 14]
console.log(scores1.sort())          // [ 12, 14, 16, 19, 3 ]

// This is bubble sort -> Repeatedly compare adjacent elements and swap them if they are in the wrong order. 
// The largest values gradually “bubble” to the end of the list with each pass.
scores1.sort(function(a,b)
{
    return a-b
})

// simpify way -> ascending sort
console.log(scores1.sort((a,b)=>a-b))

// descending sore
console.log(scores1.sort((a,b)=>b-a))