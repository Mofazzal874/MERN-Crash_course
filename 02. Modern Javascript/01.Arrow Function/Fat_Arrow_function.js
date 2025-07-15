
//  point-01: 

// function number() { 
//     return 10 ; 
// }


//this is same as this arrow function : 

// let number = ()=> {
//     return 10 ; 
// }


// console.log(number()); 


// you can also simplify it: (if there's only one statement in the function body and that return statement is the only thing in the function body)

// let number2 = () => 10 ;   //you can't write return 10 here , if you write like this.it have to be a single statement. 
// number2() ; 




// point-02: 
// why arrow function is was introduced? - to clear the confusion of 'this' keyword in javascript.
// in arrow function 'this' keyword is lexically bound, which means it takes the value of 'this' from the surrounding code.
// in normal function 'this' keyword is dynamically bound, which means it takes the value of 'this' from the calling context.
// in arrow function 'this' keyword is not bound to the function itself, it is bound to the surrounding code.




// var javascript = { 
//     name: "javascript", 
//     libraries: ["react", "angular", "vue"],
//     printLibraries: function (){ 
//         this.libraries.forEach((library)=>{  //this refers to the javascript object here, because arrow function doesn't have its own 'this' keyword, it takes it from the surrounding code.if you have used normal function here, 'this' would have been undefined.
//             console.log(`${this.name} loves ${library}`) ; //this 'this' is not as same as the outer 'this' keyword, it creates a confusion here( inner this is undefined here , as it doesn't know which object to refer). that is why arrow function was introduced 
//                                                         //so that outer this can be used in inner callback function. If you used normal function here, it wouldn't know which object to refer to, so it would be undefined.
//             //to sum up : arrow function doesn't touch the 'this' keyword. it would just pass the 'this' keyword from the outer scope to the inner scope.(scope can be window , object , function etc.)
//         })
//     }
// }

// javascript.printLibraries() ; 



// note: 
//now about forEach : 
// forEach() iterates over each element in the array and executes the provided function once for each element. this function is called 
// a callback function. The callback function can take up to three arguments: the current element(which we are iterating now), the index of the current element, and the array itself(the whole array).






// so the most important point is :
//arrow function doesn't care about the 'this' keyword, it just passes the 'this' keyword from the outer scope to the inner scope.
//normal function cares about the 'this' keyword, it takes the value of 'this'(bacause normal function in javascript also works as a constructor function).

// normal function in js as both constructor function and normal function. 
function Person(name) {
    this.name = name;  //this refers to the object that is being created by the constructor function.
}

var mofa = new Person("mofa") ;  //this won't show any error 


// but this will show an error: 

const Person2 = (name) => {
    this.name = name ; //this keyword is not bound to the function itself, it is bound to the surrounding code. so it will throw an error.

}
    // if you want to use 'this' keyword in arrow function, you have to use it in the surrounding code, not in the arrow function itself.