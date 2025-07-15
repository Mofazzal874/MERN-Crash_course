//spread operator
// The spread operator is used to expand an iterable (like an array) into its elements.

var numbers  = [1, 2, 3] ; 

var newNumbers = [...numbers , 4, 5, 6] ; //taking all the elements of number array and adding 4, 5, 6 to it


console.log(newNumbers); 

//copying an array using spread operator immutably(without modifying the original array)

var numbers2 = [10 , 11, 12] ; 
var newNumbers2 = [...numbers2] ; //this creates a new array with the same elements as numbers2.now if you modify newNumbers2, numbers2 will not be affected.
console.log(newNumbers2);       
numbers2.push(13) ; //modifying the original array
console.log(numbers2); // [10, 11, 12, 13]
console.log(newNumbers2); // [10, 11, 12] - original array


// TL,DR: 
// so if you do like this : newNumbers = numbers , this is the mutable way of copying an array. this newNumbers will use the reference of the numbers array. so if you modify newNumbers, numbers will also be affected.
// -> So that is why , when we try to update an state , state change or state update , we have to do it in immutable way. So that the original state is not modified. So we can use spread operator to copy the state immutably.
// so , first you create a copy(with spread operator - immutable way) of the state and then you do whatever you want to do with the copy.
// Finally , you just return the copy so that everything is done immediately without interrupting the whole DOM Tree.


// spread operator works in the same way with objects as well.

var myObj1 = {
    name: "John",
    age: 30,
}

var  myObj2 = {
    work: "Software Engineer",
    country: "USA"
}

var myObj3 = {
    ...myObj1, //spreading the properties of myObj1
    ...myObj2, //spreading the properties of myObj2
    city: "New York" //adding a new property
}
console.log(myObj3); // { name: 'John', age: 30, work: 'Software Engineer', country: 'USA', city: 'New York' }


// excluding certain properties while copying an object using spread operator: 

var obj4 = {
    name: "Alice",
    age: 25,
    country: "Canada",
    profession: "Data"
}
var {country , ...obj5} = obj4; //using destructuring to exclude country property
console.log(obj5) ; 
