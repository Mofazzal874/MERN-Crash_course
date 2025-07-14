// there is another good way of calling(execution) of promises
//async await(they will be used combined)



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

// here: 
enroll()
    .then(progress)
    .then(getCertificate)
    .then((value)=>{
        console.log(value) ; 

    })
    .catch((err)=>{
        console.log(err)
    })

// this segment is hefty. we can use async/await to make it more readable and structured.


// where to use async/await?
// here: 
function enroll(){
    console.log("Enrollment is in progress") ; 
    const promise = new Promise((resolve , reject)=> {
        setTimeout(()=>{
        (paymentSuccess)? resolve(): reject("Payment failed"); 
    } , 1000) ; 

    }) ; 
    return promise ; 
    
}

// you are returing a promise from the function , so you can use async/await to call it.
//if you return anything other than a promise from a function , then you can't use async/await with it.


// when you put the keyword 'async' before a function, it means that the function will return a promise.
// for example, 
function hello(){
    return "Hello"  ; 
}

console.log(hello()) ; // Hello

// but if you put the keyword 'async' before the function, it will return a promise.
async function Hello(){
    return "Hello"  ; 
}

console.log(Hello()) ; // Promise { 'Hello' }

// so when you use async , javascript knows prior that it will return a promise, whatever you return from it , it will recognise it as a promise object . 
//so you don't have to specifically return a promise from it like before. 
// but as these are promises , so they are asynchronous, so you have to use await to get the value from it. 

// so  to wrap up : 
// - if you use async before a function, it will return a promise by default. 
// - you have to use await with async functions to get the value from the promise. "await" can't be used anywhere else other than inside an async function or independently anywhere in the code. await 
// goes per to per with async.
// - so main reason of using async/await is to make the code more readable and structured like synchronous code. so that you don't have to use .then() and .catch() methods to handle promises , thus making 
// it readable like synchronous code.

// - so promises were introduced to handle asynchronous operations in a more structured way than callbacks(also to get rid of callback hell), and async/await is a syntactic sugar over promises that makes the 
//   code look synchronous while still being asynchronous.


// lets make the above code more readable and structured using async/await:

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


// now :
async function course(){
    await enroll();   //we are using await here to wait for the promise to resolve before moving to the next line. js will not move to the next line until the promise is resolved or rejected in this line 
    await progress();   //same here , as we are not returning anything(or value) from the function, we don't have to store the value in a variable.
    // so we are just waiting for the promise to resolve before moving to the next line.
    const message = await getCertificate(); //but the getCertificate function returns a value, so we are storing it in a variable.
    // so we are waiting for the promise to resolve and then storing the value in the variable
    console.log(message);
}
course();

// so , here - we are writing the functions similar like syncronous code , but they are still asynchronous. but more readable this Time.


// but there's another issue with this code. if in the enroll function, if the payment fails or the progress function fails, the course function will not be able to complete successfully. we need to handle these errors properly.(we handled it in the previous code using .catch() method). 
// if you make - 
// const paymentSuccess = false;
// then the output will be :

// Enrollment is in progress
// Uncaught (in promise) Payment failed


// (this means the error is sent to javascript console(or in product - the user). we don't want that)
// so we need to handle the errors properly using try/catch block.


// that is why we need to use try/catch block with async/await to handle errors properly.

async function course(){
    try {
        await enroll();   //we are using await here to wait for the promise to resolve before moving to the next line. js will not move to the next line until the promise is resolved or rejected in this line 
        await progress();   //same here , as we are not returning anything(or value) from the function, we don't have to store the value in a variable.
        const message = await getCertificate(); //but the getCertificate function returns a value, so we are storing it in a variable.
        console.log(message);
    } catch (error) {
        console.error("Error:", error); //this will handle any error that occurs in the above code
    }
}