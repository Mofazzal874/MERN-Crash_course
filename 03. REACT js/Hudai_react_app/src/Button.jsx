import React from 'react';


class Button extends React.Component {

    shouldComponentUpdate(nextProps, nextState){

        const {change: currentChange, locale: currentLocale} = this.props; //destructuring the change function from props
        const {change: nextChange, locale: nextLocale} = nextProps; //destructuring the change function from nextProps

        if(currentChange === nextChange && currentLocale === nextLocale){
            return false; //if the change function and locale are the same, do not re-render
        }
        else {
            return true; //if the change function is different, re-render the component
        }

    }

    render(){
        console.log("Button component rendered") ; //to check if the component is re-rendered or not
        // console.log(this.props) ; //to check the props passed to the component
        const {change, locale} = this.props; //destructuring the change function from props
        return (
            <button type="button" className="btn btn-primary" onClick={()=> change(locale)}>
                Click Here
            </button>
        );  
    }
}

export default Button;
