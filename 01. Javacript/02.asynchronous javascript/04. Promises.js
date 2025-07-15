// "I Promise a Result!"

// "Producing code(defining the promise)" is code that can take some time

// "Consuming code(calling or executing the promise)" is code that must wait for the result

// A Promise is an Object that links Producing code and Consuming code


// Promise syntax: 
let myPromise = new Promise(function(myResolve, myReject) {
// "Producing Code(defining the promise)" (May take some time)

  myResolve(); // when successful
  myReject();  // when error
});

// "Consuming Code(calling the promise)" (Must wait for a fulfilled Promise)
myPromise.then(
  function(value) { /* code if successful */ },
  function(error) { /* code if some error */ }
);


// (In a table structure)
// A JavaScript Promise object can be:

// -Pending
// -Fulfilled
// -Rejected
// The Promise object supports two properties: state and result.
// 
// While a Promise object is "pending" (working), the result is undefined.

// When a Promise object is "fulfilled", the result is a value.

// When a Promise object is "rejected", the result is an error object.


// You cannot access the Promise properties state and result.

// You must use a Promise method to handle promises.




// why promise is used? - you've seen in the asynchronous_behaviour.js file that callback hell can easily happen in callback
// .that is why promise is used . 


// Now example:

// callback hell: 
// - very hard to maintain , not easily Readable

// enroll(function(){
//     progress(function(){
//         c(function(){
//             d(function(){
//                 e(function(){
//                     f(); 
//                 })
//             })
//         })
//     })
// }); 


// to solve this: use Promise 




// to understand better: Promise is same like 'making promise' like real world. 
// you promised something-> if you succeed then do this , if you fail then do that. only two outcome

// for example: if you are promising to enroll(in registration state), if you succeed in that , then go to progress state and make a promise that you will make progess in that Course.
//  if you success , then go to getCertificate state and make a promise then you will obtain a good mark and earn certificate

// so when defining a promise , you also have to define what will happen in case of "Success" and in case of "Failure" 
//so javascript by default send two object - resolve, reject(convention name) in a promise(with a function pass). if resolve can be done , then you  will call the resolve object 
// and if reject happens , then reject object will be called so that js understands that whether the promise was kept or not. 




// now , how to define a promise? first we'll see the problem and then how to solve it with promise

const status = false ; 
console.log("Task 1") ; 


setTimeout(()=> {
    if(status){
        console.log("Task 2") ;
    }
    else{
        console.log("Task 2 failed") ;
    }
} , 1000); 

console.log("Task 3") ;


// but here is a problem js doesn't know when the task 2 will be completed.
// so we can use promise to solve this problem. if the task is completed then we can notify the js
// about the task completion with resolve function and if the task is not completed then we can notify the js about the task failure with reject function.



// now about Promise Object syntax: 

// Promise object expect two functions(generatl functions or arrow functions) as parameters: resolve and reject.
const promiseStatus = false ;
console.log("Task 1") ;


//promise definition(similar like function definition)
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (promiseStatus) {
            resolve("Task 2"); //the value "Task 2" will be passed to the "value" of the function(general or arro ) in the promise's then  , when we call the promise, if it passed  
        } else {
            reject("Task 2 failed"); //the value "Task 2 failed" will be passed to the "err"  in the catch(), when we call the promise if it failed
        }
    }, 1000);
});

//This Promise object is the like the definition of the promise that we can use to handle asynchronous operations.
//now to execute(call) the promise :



//promise calling(simillar like function calling)
promise
    .then((value)=> {
        console.log(value);
    })
    .catch((err) => {
        console.log(err);
    }); 
console.log("Task 3");


// so wrapping up : 

// as the setTimeout is an asynchronous operation , it can succeed or fail. so we 
// are creating a promise to handle that if it succeeds then it wll call the resolve function and if it fails then it will call the reject function.




// now , how we are solving the callback hell problem with promise(02. callback_patterns.js): 


const paymentSuccess = true; 
const marks = 70 ; 


function enroll(){
    console.log("Enrollment is in progress") ; 
    const promise = new Promise((resolve , reject)=> {
        setTimeout(()=>{
        (paymentSuccess)? resolve(): reject("Payment failed"); 
    } , 1000) ; 

    }) ; 
    return promise ; 
    
}


function progress(){
    console.log("Course is in progress... "); 
    const promise = new Promise((resolve , reject)=> {
        setTimeout(()=> {
            (marks >= 70 )? resolve(): reject("you couldn't obtain enough marks for cetificate") ; 
        }, 2000) ; 

    }); 
    return promise ; 
}

function getCertificate(){
    console.log("get certificate is in progress...") ; 
    const promise = new Promise((resolve , reject)=> {
        setTimeout(()=>{
            resolve("congrats , you've got your cetificate!") ; 

        }, 1500 ) ; 
    })
    return promise ; 
}


enroll()
    .then(progress)
    .then(getCertificate)
    .then((value)=>{
        console.log(value) ; 

    })
    .catch((err)=>{
        console.log(err)
    })




















