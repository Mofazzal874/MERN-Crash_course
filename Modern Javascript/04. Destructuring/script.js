//destructuring
//mostly used to extract values from arrays or properties from objects into distinct variables.

//example with objects 
const user = { 
    id: '339' , 
    name: "mofa" , 
    age: 24, 
}

// now if you want to extract the name property from user object you can do like this : 
const name = user.name; 

//this is okay for simple or ordinary objects but if you have to extract multiple properties or very complex nested objects 
//then it will be a lot of code to write and not very readable as well.

// so how to do this? 
// as we are destructuring object , then we have to take a object on the left side of the assignment sign and the original object on the right side :
//we have to write the exact property names as they are in the original object on the left side of the assignment sign.

//if we want to change the name of the property while destructuring, we can do that as well by using the colon(:) operator.
const {name: title} = user;  //here we're destructuring the name property from user object and assigning it to a new variable called title
console.log(title); // "Sakib"


//if we want to extract multiple properties from the object, we can do that as well:
const {id: serial, age} = user; //here we're destructuring the id and age properties

console.log(serial, age); // "339" 24

//now , for nested objects, we can do the same thing:

const user2 = {
    id: '339',
    name: "mofa",
    age: 24,
    address: {
        city: "Dhaka",
        country: "Bangladesh"
    }
}
const { address: {city}} = user2 ; 
console.log(city); // "Dhaka"

// what if the object doesn't contain the address property?- it will return error saying "Cannot destructure property 'address' of 'user2' as it is undefined."
// (for example- you're getting the object from an API and it doesn't contain the address property.And you don't know prior to destructuring that 
// if the object will contain the address property or not. sometimes it send the address and sometimes it doesn't)
//  - in that case, you can use defaut value while destructuring:

//  const {adress: {city} = {}} = user2 ; //here we're using an empty object as default. you can use any default like values or string etc.

// also you can set the city to a default value like this:
// const {address: {city = "Unknown City"}= {}} = user2 ;


// you can also use the rest operator to catch the later values of the object: 

// const { a: a1, b: b1, ...rest } = obj;
// example: 










// array destructuring
var numbers = [1, 2, 3, 4, 5];
var [a, b] = numbers; 

console.log(a, b); // 1 2
// what if you need 2 and 5?

var [,second , , , fifth] = numbers; //here we're skipping the first and third elements and taking the second and fifth elements
console.log(second, fifth); // 2 5


//nested array destructuring

var nestedArray = [1, [2, 3], 4, 5];
//we want to extract 3 
var [, [, a] , , ] = nestedArray ; 
console.log(a) ; 


//what if you have a very large array ?- will you use comma's hudreds of times?- no
// then you can use the rest operator 

var arr = [10 , 20, 30 , 40 , 50 , 60 , 70 , 80 , 90, 100]
//you want to pick the 30 value
var [, ,  a, ...rest] = arr ; 
console.log(a) ; 
//if you need to extract values after 30 
console.log(rest); 




// you can also set default : if you think the value of a 
// place in the array can be there or not:(for example - from another component that returns an array but not with your requirement all the time )
var array = [10]
var [a, b= 120 ] = array ; //here the array contains only one value , but we are expecting two. that is why we are setting a default value to  120 
console.log(a, b ) ; 




// A beautiful use-case of destructuring: 
// value-swapping

 var a = 1 ; 
 var b = 2;
 console.log(a , b) ;  

 [b , a] = [a, b] 

 console.log(a, b ) ;
