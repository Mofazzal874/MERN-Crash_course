//All types of actions(mouse click , load , reload , keyboard press etc ) that can happen in a webpage is event
const headerElement = document.querySelector('#header') ; 
//we want to see the event "click " in the log , when we click on the "To do apps" text


//addEventListener() expect what event we want to listen and
//  what to do with that event(a function whose parameter will be the event itself)

headerElement.addEventListener('mouseleave' , (event) => {
    console.log(event) ; //will print the event when clicked on the text 
}) ;


// click 
// dblclick(double click event)
//mousedown( when you take the mouse and click the button down , then it will be fired  )
//mouseup(when the mouse button will go up after clicking , then it will be fired)
//mouseenter(when you take the mouse pointer to the desired text/point)
//mouseleave(when you take the mouse pointer from the desired text/point)
//mouseover(when you take the mouse pointer over the text/point)
//mouseout(when you take the mouse pointer out of the text/point)
//mousemove(when you move the mouse)

//The difference between mouse over and mouseenter is - mouseover will also detect mouse pointer over a elements child element.



// event Listener on input elements
//keyup 
//keydown
//keypress
//focus
//blur(opposite of blur)
//cut(if you cut text from a textbox)
//paste
//input


// form events
//submit



//Question-01: How to prevent reloading of a webpage after submitting a form(which happens by default in a browser)

const formElement = document.querySelector('form') 

formElement.addEventListener('submit' , (event)=> {
    event.preventDefault() ; 
    console.log(event.target) ; //event.target will return the element on which event is listened
})