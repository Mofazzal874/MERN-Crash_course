// ----------------------------------------Traditional way to make things Reactive(not with React, for react version , see-Fruits.js)-----------------------------------

//Array prototype is used to make the new fruit item adding reactive...So when you add a 
//new item to the list , it will not only push it to the list but also re-render it(sort it alphabetically)
//that is why you are making a custom myPush method instead of using the built-in push method to make it
//reactive every time a new state happens(or other way that a new element is added)...Here init() function calling 
// within the myPush method is used to make the pushing mechanism reactive

//Rest Parameter (...a): The method uses the rest parameter (...a), 
// which collects all the arguments passed into an array

Array.prototype.myPush = function(...a){
    this.push(a[0]) ; //this is the default pushing method
    init();          //Here we are doing it in a reactive way so that every time a new element is added, it should 
                    //re-render the list again alphabetically..With default push() , it can't be achieved.
}


const display = document.getElementById('fruits');
const button = document.getElementById('button') ; 

let fruits = ['Abul' , 'Babul', 'Dabul' , 'Eabul' , 'Fabul'] ;

const init = function(){
    const fruitList = document.getElementById('fruits') ; 
    fruitList.innerHTML = '' ;  //first of all clearing the list to re-render it 
        
    fruits.sort().forEach(fruit => {
        let item = document.createElement("li") ; 
        item.textContent = fruit; 
        fruitList.appendChild(item); 
    });
}

const addItem = function(){
    let newFruit = document.getElementById('input').value ; 
    fruits.myPush(newFruit) ; 
}

init() ; //This calls the init function initially to populate the list of fruits when the page loads.

