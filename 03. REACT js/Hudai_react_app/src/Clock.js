import React from 'react';

class Clock extends React.Component{
    // constructor(props) { 
    //     super(props) ;  //calling the constructor of the parent
    //     this.state = {date: new Date()} ; 
    // }
    // or you can use a shortcut when you don't need the datas of props object
    state = {date: new Date()}
    componentDidMount(){  //componentDidMount() runs after component has been rendered to the DOM
        this.clockTimer = setInterval(()=> this.tick(), 1000) ; 
        
    }
    componentWillUnmount(){
        clearInterval(this.clockTimer) ; 
        

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
        return (
            <h1 className="heading">
                <span className="text">
                    {this.state.date.toLocaleTimeString(this.props.locals)}
                </span>
            </h1>
        );
    }
}


export default Clock; 