

// Playing with DOM 
// changing the title 
document.title = "Hudai";   
console.log(document.title) ;

console.log(typeof(document.all)) ; 
// that means document.all is not an array , it is undefined.This is also not a function(
// Run document.all.filter())..Actually this a special type of object ,  the type of this is HTMAllCollection.
// But you can actually loop through it 


for(let element of document.all){
    console.log(element) ; 
}

//this will show all the element one by one
// But we don't access DOM like this(like an array) , as the elements of any website is dynamic so it changes 
// all the time and with that the array index also changes all the time ..This is a bad practice
// So How do we access DOM elements / traverse DOM elements?




// Traversing DOM Elements
// use some methods that are provided by js to manipulate DOM



// GET ELEMENT BY ID 
console.log(document.getElementById('new-task') ); 


// to change the elements or something of the element ---
let headerElement = document.getElementById('header') ; 
headerElement.textContent = 'Hudai - apps'  ; 
headerElement.innerText = 'Another Hudai apps Header with inner Text' ; //you can also do it with innerText
// to see the difference between them ,just print them in the console log 
console.log(headerElement.textContent) //this will print the text content just like you write you in the html code - in the lower case here 
console.log(headerElement.innerText)  //this will print the word what you see in the browser - in the upper case

let itemsElement = document.getElementById('items') ; 
console.log(itemsElement.innerHTML) ; //to see the inner HTML of an element as text



headerElement.style.color = 'red' ; //you can also manipulate styles
//But to change the styles that contain - in them , you can't do like that, as javascript don't support 'object-name' strucuture..so just use obejctName like structure
headerElement.style.fontSize = '30px' ;





//GET ELEMENT BY CLASS
// many elements can belong to a class , so it is named "GetElementsByClassName" ..Here important thing is "Elements"
let items = document.getElementsByClassName('item') ; //this will not return an array but you can loop through


for(let i = 0 ; i < items.length ; i++){
    items[i].style.color = 'red' ; 
}


// selecting from particular parent elements instead of selecting from document object 
let itemParent = document.getElementById('items') ;
let itemsss = itemParent.getElementsByClassName('item') ;
for(let i = 0 ; i < itemsss.length ; i++){
    itemsss[i].style.color = 'yellow' ; 
}



//GET ELEMENT BY TAG 
let listItems  = document.getElementsByTagName('li') ; 
console.log(listItems) ; 




//Query Selector
// (Query selector made Jquery like obsolute)..As you don't need to do it like $('#items') / $('.items') this.



let header = document.querySelector('.header') ;  //select a class name header

console.log(header) ; 

let hudaiTask = document.querySelector('#new-task') ; 
console.log(hudaiTask) ; 


//Note :QuerySelector will always give you only one element.Even if you give a class name or element that has multiple occurence , 
// then it will return only the first occurence of it 

let lastItem = document.querySelector('.item:last-child') ; 
console.log(lastItem) ; 
lastItem.style.color = 'green';


// To solve this issue , we'll use querySelectorAll , which will return the all the occurence for the 
// desired class name 

let lastItems = document.querySelectorAll('.item.last_child') ; 
console.log(lastItems); //to cover them , you can use a for loop 

for(let element of lastItems){
    
    element.style.color = 'green' ; 
}


// nested 
let last = document.querySelector('#items').querySelector('.item:nth-child(2)') ; 
last.style.color = 'green' ; 


// const parent = document.querySelector('#items') ; 
// const children = parent.children ;     //you can also do it by querySelectorAll('.item') , but it will also fetch the children of other ul or ol
// console.log(children) ;

// console.log(children[1]) ; //to access particular children


//  you can also do it from grandparent

const grandparent = document.querySelector('.todo-list');
const paren = grandparent.children; // 'parent' array contains two children

const childr = paren[1].children;

console.log(childr);

//going grandparent to children  
const child = grandparent.querySelectorAll('.item') ; 
console.log(child) ; 



//going children to parent to grandparent

const children = document.querySelector('.item') ; 
const parent = children.parentElement; 
console.log(parent) ; 

//going from children to grandparent
const grandpar = children.closest('.todo-list') ; //it goes to the closest parent to up 
console.log(grandpar) ; 




//finding Siblings
const childrenOne = document.querySelector('.item') ; 
const childrenTwo = childrenOne.nextElementSibling ;
console.log(childrenTwo) ; 
childrenTwo.style.color = 'red' ; 
