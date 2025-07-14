function hello(){
    console.log("line 2 code") ; 

}

console.log("line 1 code") ; 
hello() ; 
console.log('line 3 code') ;


// by default , javaScript is synchronous and single-threaded.
// It executes the code line by line, in the order it appears.
// so the output: 
// line 1 code
// line 2 code
// line 3 code

// but js can also be asynchronous, which means it can execute code in the background while waiting for other code to finish.
// this is done using callbacks, promises, and async/await  or using asynchronous functions(like setTimeout).
// for example, 

setTimeout(function(){
    console.log("line 2 code"); 
} , 2000) ; 

console.log("line 1 code") ;
console.log('line 3 code') ;

// output: 
// line 1 code
// line 3 code
// line 2 code (after 2 seconds)
// setTimeout function is an asynchronous function that takes a callback function and a delay in milliseconds. it actually doesn't 
// wait for the delay to finish before executing the next line of code but instead it will execute the callback function after the delay is over.





// Callback functions are mainly used in asynchronous operations like API calls, event handling, and timers.


// Callback alternatives: 

// Callback hell: 
// -> Callback hell refers to the situation where multiple nested callbacks make the code hard to read and maintain.
// -> It often occurs when dealing with multiple asynchronous operations that depend on each other.
// Example of callback hell:
/*
getUser(userId, function(user) {
  getPosts(user.id, function(posts) {
    getComments(posts[0].id, function(comments) {
      sendEmail(user.email, function(response) {
        console.log("Email sent!");
      });
    });
  });
});
*/
// -> This can lead to deeply nested code, making it difficult to read and maintain.
// -> To avoid callback hell, we can use Promises and async/await, which provide a more structured way to handle asynchronous operations.
// -> Promises represent a value that may be available now, or in the future, or never.
// -> They allow us to chain operations and handle errors more gracefully.
// -> Async/await is a syntax that allows us to write asynchronous code in a synchronous style, making it easier to read and understand.
// -> Promises can be created using the Promise constructor, and they have methods like .then() and .catch() for handling success and errors.
// -> Async/await is built on top of Promises and allows us to write asynchronous code that looks synchronous.

// Callback Hell vs Promises:

// Callback Hell
/*
doSomething(function(result) {
  doSomethingElse(result, function(newResult) {
    doAnotherThing(newResult, function(finalResult) {
      console.log(finalResult);
    });
  });
});
*/
// Promises
/*
doSomething()
  .then(result => doSomethingElse(result))
  .then(newResult => doAnotherThing(newResult))
  .then(finalResult => console.log(finalResult));
*/


//async/await (modern approach):
/*
async function process() {
  const result = await doSomething();
  const newResult = await doSomethingElse(result);
  const finalResult = await doAnotherThing(newResult);
  console.log(finalResult);
}
*/
// -> This code is much cleaner and easier to read than the callback hell example.


