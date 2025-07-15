// console.log(React); //react is a platform agnostic library.To use react library for mobile browser , we have to use reactNative instead of ReactDOM
// console.log(ReactDOM); //this will create object for us to see in the browser
//This ReactDOM is for desktop browser only..To render it in Mobile browser , we use ReactNative

//90% of the task will be done using react , ReactDOM will be used to print object

// we want to print "Hello world to the root div"
//ReactDOM.render() expects to parameter(what to print("Hello world") , where to print(in the root div))
const domContainer = document.querySelector("#root");
// ReactDOM.render('Hello world' , domContainer) ;

//React.createElement(type of element , types of content in the element , content in the element) function  - to create react element
// const myElement = React.createElement("div" , null , "Hello world") ; //this is a react element , not a html element
// ReactDOM.render(myElement , domContainer) ;

// Now we want to add a p element into the div

/*const myElement = React.createElement(
  "div",
  null,
  React.createElement("p", null, "Hudai")
);
ReactDOM.render(myElement, domContainer);
*/

//you can also add array of elements
// const myElement = React.createElement("div", null, [
//   React.createElement("p", null, "Hudai"),
//   React.createElement("h2", null, "Another hudai with h2"),
// ]);
// ReactDOM.render(myElement, domContainer);


// but you don't have to create react element like this . there is a markup language for react called JSX(javascript XML - which looks like 90% HTML but not HTML)..To create an element with JSX , 
// const myElement1 = (
//     <div>
//         <h1 id = 'display'>0</h1>
//         <div>
//             <button id = 'button'>Increment</button>
//         </div>
//     </div>
// );

// ReactDOM.render(myElement1 , domContainer); 

// but js doesn't understand this , so we have to use a transpiler(Babel) which will convert it into vanilla js.Babel script is added in the html file. 




const Increment = ()=>{
    // const reactState = React.useState(0) ; //this will manage the state of increment.you can set any default value , array , object etc. to the useState() function
    // console.log(reactState) ;//this keeps 0 , f() -> the default value , and a function 
    // lets take these two in an array 
    const [counter , setCounter] = React.useState(0) ;  //counter = 0  , setCounter = f() function
    return (
        <div>
            <h1 id = 'display'>{counter}</h1>
            <div>
                <button id = 'button' onClick = {() =>setCounter(counter+1)}>Increment+</button> 
                {/* ()=> is given to prevent re-renders or to make the function trigger only when the button is pressed */}
            </div>
        </div>
    );
}

ReactDOM.render(<Increment/>, domContainer);  //Increment() function can also be written as <Increment/> in jsx syntax



//if we need this counter multiple times , all we have to do is - 
ReactDOM.render(
    <div className = "container">
        <Increment/>
        <Increment/>
        <Increment/>
        <Increment/>
    </div> , 
    domContainer
) ;




// so Increment becomes a react component increasing reusability
//A React component can be imagined as a separate application 
//For react , all you have to change the state , not the value of the variable.
//If you ever have to manipulate DOM by yourself , that meeans you're doing something in a wrong way.Practising Jquery or DOM in React is 
// bad practise
