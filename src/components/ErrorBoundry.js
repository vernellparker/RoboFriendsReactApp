import React, {Component} from 'react';

export default class ErrorBoundry extends Component{

    constructor(props){
        super(props);
        this.state = {
            hasError: false
        }
     
    }

    componentDidCatch(error,info){
        this.setState({hasError:error})
    }

    render(){
        if(this.state.hasError){
            return <h1>Ooooops. That's Not Good</h1>
        }else{
            return this.props.children
        }
    }

}