import React, {Component}from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry'
import '../css/App.css'


export default class App extends Component  {

    constructor(){
        super();
        //State is something that can change
        this.state ={
            robots: [],
            searchfield:''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json()
        .then(users => {this.setState({robots: users})}));
        
    }

    //this is wired to the Dom Onchange event in the search box component 
    onSearchChange = (event) => {
        this.setState({
            searchfield: event.target.value
        });
    }

    //whenever the state changes it recalls the render method 
    render(){

        const {robots, searchfield} = this.state;
        //Whenever the we render, robots is filtered by the new state of the search field. 
        const filteredRobots = robots.filter(robots => {
            return robots.name.toLowerCase().includes(searchfield.toLowerCase());
        })

        return !robots.length ?
                <div className="f1 text-screen-middle">
                        <h1 >Loading</h1>
                </div> :  
             (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange = {this.onSearchChange}/>
                    <div style={{overflow:'hidden' }}>
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundry>
                    </Scroll>
                    </div>
                </div>
         
            )
        }

     
    

}
