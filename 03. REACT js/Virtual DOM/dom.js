let array = [] ; 
increment = 0 ; 
let container = document.querySelector('.container') ;




// ---------------------------BATCH UPDATE(to make the page reload faster)---------------------------------------
//fast
while(increment < 10000){
    array.push(++increment) ; 
}


container.innerHTML = array.join(' ') ;  //giving DOM the final array
//this is called Batch Update(all you have to do is - solve the problem in a tricky way to update DOM)


//slow
// while(increment < 10000){
//     increment++ ; 
//     container.innerHTML += ' ' + increment ;  //giving DOM everytime of the iteration
// }


//that means if we do DOM operation too much , it will make the page slow
//that means js is fast but DOM operation have some amount of cost






// -------------------------Virtual DOM of REACT--------------------------------------

/*So we can Batch update by manipulating DOM..All we have to do is , always keep an eye on the element which changed 
recently.Keep an snapshot of 'Before' and 'after' of the update and then 'compare' these two state.But to do this within
DOM is problematic for React. So what react does is- it creates a different world(virtual DOM) , where it can do things
like its own , where it doesn't have to deal with repaint , where it can work with javascript objects and where it doesn't have to 
bother itself with the rules of the browser , just make simple raw javascript objects and creates a replica of the Browser DOM(Virtual DOM)..
Working on the virtual DOM is not as expensive as working on the browser DOM and developers can also have full control on it.It doesn't have to 
pay any cost like repainting everytime an element state changes.

Virtual DOM is like a rough sheet paper where you can do all kinds of stuff and then send the required change to the main browser page.

How virtual DOM works?
REACT creates a tree structure with all its components..If any node(component) of that tree is changed , its child is also changed.React keep a copy of the previous 
and next state of this change.This changing is happened with sophisticated algorithm called diffingor reconciliation algorithm(see image3)
*/