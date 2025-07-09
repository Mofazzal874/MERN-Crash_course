//rest operator is look like spread operator but it is used to collect the remaining elements of an array or object into 
// a new array or object. It is used in function parameters to collect all the arguments into an array.

// The rest parameter syntax allows a function to accept an indefinite number of arguments as an array,
// providing a way to represent variadic functions in JavaScript.


 

function sum (...args){
    let total = 0;
    for(let i = 0 ; i < args.length; i++){
        total+=args[i];
    }
    return total;
}

console.log(sum(1, 2, 3, 4, 5)) ; 

console.log(sum(10, 20, 30 )) ; 


// Restriction around Rest operator: 
// There are some additional syntax restrictions:
// - A function definition can only have one rest parameter.
// - The rest parameter must be the last parameter in the function definition.
// - Trailing commas are not allowed after the rest parameter.
// - The rest parameter cannot have a default value.

// so : ...args(rest operator ) will cause the rest of the parameters to be placed in an array :
//also as this is an array , you can apply sort(), map() etc functions as you can do in traditional array.


function myFun(a, b, ...otherArgs){
    console.log("a: " , a) ; 
    console.log("b: " , b) ; 
    console.log("Other args(will be shown in an array): ", otherArgs) ; 
}
myFun(2, 3, "four" , 5, [6, 7] , "eight") ; 

// here , if you don't provide more than two args, then the rest parameters gonna be empty: 

myFun(5 , 6) ; 
//a : 5
//b : 6
//Other args(will be shown in an array): [] <- an empty array


// also you can use rest operator with arrays as well
function concatenateArrays(...arrays) {
    return arrays.flat(); // flat() is used to flatten the array of arrays
}
console.log(concatenateArrays([1, 2], [3, 4], [5, 6])); // [1, 2, 3, 4, 5, 6]

// you can also use rest operator with some parameters and then additional parameters as rest : 

function f(a, b, ...otherArgs){
    console.log(a, b , ...otherArgs) ; 
}
f( 2, 3, 4, [5, 6, 7, 8] , "mofa")


// you can also use rest operator with objects as well 

function displayInfo(name, ...info) {
    console.log("Name:", name);
    console.log("Info:", info);
}
displayInfo("Alice", "Engineer", "USA", 30);






// all the parameters in the function are stored in the arguments object(including the rest operator's parameters)
// The difference between rest parameters and the arguments object
// There are four main differences between rest parameters and the arguments object:

// The arguments object is not a real array, while rest parameters are Array instances, meaning methods like sort(), map(), forEach() or pop() can be applied on it directly.
// The arguments object has the additional (deprecated) callee property.
// In a non-strict function with simple parameters, the arguments object syncs its indices with the values of parameters. The rest parameter array never updates its value when the named parameters are re-assigned.
// The rest parameter bundles all the extra parameters into a single array, but does not contain any named argument defined before the ...restParam. The arguments object contains all of the parameters — including the parameters in the ...restParam array — bundled into one array-like object.


