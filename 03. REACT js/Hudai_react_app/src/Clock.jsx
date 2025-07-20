import React from 'react';
import Button from './Button'; // Importing the Button component

class Clock extends React.Component{
    // constructor(props) { 
    //     super(props) ;  //calling the constructor of the parent
    //     this.state = {date: new Date()} ; 
    // }
    // or you can use a shortcut when you don't need the datas of props object
    state = {date: new Date() , locale: "bn-BD"}
    componentDidMount(){  //componentDidMount() runs after component has been rendered to the DOM
        this.clockTimer = setInterval(()=> this.tick(), 1000) ; 
        
    }
    componentWillUnmount(){
        clearInterval(this.clockTimer) ; 
        

    }
    // handleClick(e){
    //     e.preventDefault(); 
        
    //     this.setState({
    //         locale: "en-US" , 
    //     })
    // }

    handleClick = (e)=>{
        e.preventDefault; 
        this.setState({
            locale: "en-US"
        })
    }

    tick(){
        setInterval(()=> {
            this.setState({
                date: new Date() , //setting the date again after one second
            }) ; 
        }, 1000) ; //mounting or showing the re-rendered component every seconds so that it shows the the time every seconds and react will 
                    // react automatically after the date data changes
    }

    render(){
        console.log("Clock component rendered") ; //to check if the component is re-rendered or not
        const {date , locale} = this.state; 
        return (
            <>
            <h1 className="heading">
                <span className="text">
                    {date.toLocaleTimeString(locale)}
                </span>
            </h1>
            <Button change={this.handleClick} locale="en-US">
                Click Me
            </Button>
            </>
            
        );
    }
}


export default Clock; 