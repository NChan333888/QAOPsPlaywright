// block of code
// var (can be redeclared) - global level/functional, can be reinitialized
// let (cannot be redeclared) - global lavel/block level {}, can be reinitialized
// const -> similar to let but can NOT be reinitialzied once assigned
let greet = "Evening" // global scope
greet = "night"

if (1==1)
{
   let greet = "Afternoon" // not in scope of function, still global 

}

function add(a,b)
{
    let greet = "Morning" // function scope
    return a+b
}

let sum=add(2,3)
console.log(sum)
console.log(greet) // fails if scope is functional level not global level

// do not have name => Anyonymus function -- function expression

let sumOfIntegers = function(c,d)
{
    return c+d
}

// or using flat pipe operator
let sumOfNumbers = (c,d)=>c+d
console.log(sumOfNumbers(2,3))