// Objects in JavaScript are collections of key-value pairs.
var obj = {
    name : "Javascript", 
    founder: "Brendan Eich", 
    year: 1995,
    ranking: 1,
    isObjectOriented: true,
}

console.log(obj); //to print the whole object 


var keys = Object.keys(obj) ; //returns an array of the keys of the object

var values = Object.values(obj) ; //return an array of the values of the object

var entries = Object.entries(obj) ; //returns an array of the key-value pairs of the object(each key-value pair is an array itself like [key, value])
console.log(entries) ;



//Object shorthand notation
var x = 4 ; 
var y = 5 ; 

var obj2 = { 
    name : "Javascript", 
    founder: "Brendan Eich", 
    year: 1995,
    ranking: 1,
    isObjectOriented: true,
    x , //this is equivalent to x: x
    y , //this is equivalent to y: y 

}