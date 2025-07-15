//The foundation of Javascript

// js is a functional programming language and the function itself is an Object. everything in js is an Object.


// js object and functions revision: 


// you can create an object like this:

/*
const person = {
    name: "John",
    age: 30,
    greet: function(){
        console.log("Hello, my name is " + this.name);
    }
}; 


// also you can create an object like this:
const person2 = new Object();
person2.name = "Jane";
person2.age = 25;
person2.greet = function(){
    console.log("Hello, my name is " + this.name); //this refers to the object from which the function belong to 
};


//also you can create a function and then return a object from it: 

function Person(name , age){
    let person = {}
    person.name = name ; 
    person.age = age ;
    

    return person;   //so that means the function is returning an object which means it will create an object when called 
}

const mofa = Person("Mofa" , 23) ; 
const shanto = Person("shanto" , 25) ; 

console.log(mofa) ;
console.log(typeof(mofa)) ; 

*/
// now, for a larger application , if we create thousands of objects for thousands of users , it will create memory and performance issues.
// instead , we can separate the common properties and methods in another object and then we can reference it(reference it not copy it)\
// here eat , sleep and play methods are common 

/*
const personMethods = {
    eat(){
        console.log("Person is eating..") ;
    },  

    sleep(){
        console.log("Person is sleeping") ; 
    }, 
    play(){
        console.log("Person is playing ") ; 
    }
}

function Person(name , age){
    let person = {}
    person.name = name ; 
    person.age = age ;
    person.eat = personMethods.eat ; 
    person.sleep = personMethods.sleep ; 
    person.play = personMethods.play ; 
    

    return person;   //so that means the function is returning an object which means it will create an object when called 
}
*/

// so now , we are saving memory ny not creating everything everytime we create a new object . 

// there's also another problem with this. if we want to create/add another method in the personMethods object , we have to  add it manually in the person object too. which is 
// troublesome also for larger application . so there's another way in js to do this.

// for explaining this, lets first understand how js create Object(parent object and child object scenario), and how child object reference parent object's properties.
/*
const  player = {
    name: "mofa" , 
    age: 25 , 
    country: "bangladesh"
}

const  batter = Object.create(player) ;  // here we are creatinga an object batter whose parent is player and we are creating this object with the properties of player(parent) object

// Here, if we console log it , we will find that batter object is blank : 
console.log(batter) ; 
// but we can access the properties : 
console.log(batter.name) ; 
console.log(batter.age) ; 
// this is happening because - though the batter object is undefined , when we try to access its properties , it shows the properties of parent meaning child is accessing parent's 
// properties . this is happening because of a feature in js called -"Prototype"
// Prototype introduction: 


// now in the previous example we can add another method in the personMethods(parent) object and use the Object.create so that we don't have to add manually in the Person object

const personMethods = {
    eat(){
        console.log("Person is eating..") ;
    },  

    sleep(){
        console.log("Person is sleeping") ; 
    }, 
    play(){
        console.log("Person is playing ") ; 
    }, 
    study(){
        console.log("Person is studying ") ; 
    }
}

// now : 

function Person(name , age){
    let person  = Object.create(personMethods) ; //or you can use the new Object(). now you don't need to write person.eat = personMethods.eat etc. like that
    person.name = name ; 
    person.age = age ; 

    return person; 
}




*/
// lets now understand what is prototype?

// lets see an example and analyze the output: 

function test(){

}

// console.log(test) ; 
// output: 
// ƒ test(){

// }


// but if we do: 
// console.log(test.prototype); 
// {}

// a blank object 


// now , do: 
console.dir(test) ; //which is simillar like console.log() but advanced.

// now we can see: 
/*
ƒ test()
length: 0
name: "test"
prototype: {}
    constructor: ƒ test()
    [[Prototype]]: Object
arguments: null
caller: null
[[FunctionLocation]]: 01. prototyping.js:140
[[Prototype]]: ƒ ()
[[Scopes]]: Scopes[1]
*/

// see the prototype: 
// -> so prototype is a property of a javascript function or object that points to the object(straight cut forward answer)

// so we can get rid of personMethods object and use the prototype

// now : 

function Person(name , age){
    let person  = Object.create(Person.prototype) ;
    person.age = age ; 
    return person; 
}


Person.prototype = { 
    eat(){
        console.log("Person is eating..") ;
    },  

    sleep(){
        console.log("Person is sleeping") ; 
    }, 
    play(){
        console.log("Person is playing ") ; 
    }, 
    study(){
        console.log("Person is studying ") ; 
    }
}

//now we don't have to depend on any third object. 

// so to take out some information about prototype: 
// - js is a prototype based language. it doesn't inherit in a traditional way like inheriting from another class(we can do that too) , it takes prototype 
// of other classes or same classes. 
// - prototype is a built-in property of every js object. And everything in js is object . so every object in js has prototype property.
// - so when we inherit in js ,the child object just inherit everything in the prototype object. prototype helps js in inheriting.





// Constructor function : 

function Person(name , age){
    let person  = Object.create(Person.prototype) ;
    person.age = age ; 
    return person; 
}


// this function is also called constructor function as we are creating mofa , shanto etc object with this function. 

// note:  
// - every function in js is by default constructor function, as we can create objects with that function if we want.



// 'new' & 'this' keyword in javascript: 
const hudai = new Person('hudai' , 25) ; 

// whats the benefit of using new keyword? (same thing but different)
// - when we use the 'new' keyword , then we don't need to write like this - 

```
// let person  = Object.create(Person.prototype) 

// and  
    return person; 
```
// - js replace this with 'this' keyword. 

```
function Person(name , age){ 
    this.name = name ; 
    this.age = age ; 

}

```
// - so you don't have to worry about anything. all you have to do is just assign properties. This is used highly in React. 

// but you can also do it like traditional language with 'class' keyword(after ES6). 

```
class Person{
    constructor(name , age){
        this.name = name ; 
        this.age = age; 
    }

    eat(){
        console.log("Person is eating..") ;
    } 
    sleep(){
        console.log("Person is sleeping") ; 
    } 
    play(){
        console.log("Person is playing ") ; 
    }
    study(){
        console.log("Person is studying ") ; 
    }
}
const mofa = new Person("mofa" , 25) ; 
mofa.play(); 
```
// this will work similarly


// also you can do this for any of the js object : 

const Person = new Array(); 
console.log(Array.prototype) ; 

// you will find a list of all the Array methods that you can apply to. 






 










