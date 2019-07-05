import React, {Component}from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox'
import {connect} from 'react-redux';
import {setSearchField, requestRobots} from '../Actions'
import ErrorBoundry from '../components/ErrorBoundry'
// import Scroll from '../components/Scroll';
import '../css/App.css'

//the state field is props 
const mapStateToProps = state => { 
    return{
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

//the dispatch field is props 
const mapDispatchToProps = (dispatch) =>{
    return{
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots:() => dispatch(requestRobots())
    }
}

 class App extends Component  {


    componentDidMount() {
        this.props.onRequestRobots();
      }
    //whenever the state changes it recalls the render method 
    render(){

        const {searchField, onSearchChange, robots, isPending} = this.props;
        //Whenever the we render, robots is filtered by the new state of the search field. 
            
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
        

        return isPending ?
                <div className="f1 text-screen-middle">
                        <h1 >Loading</h1>
                </div> :  
             (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange = {onSearchChange}/>
                    <div style={{overflow:'hidden' }}>
                    {/* <Scroll> */}
                        <ErrorBoundry>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundry>
                    {/* </Scroll> */}
                    </div>
                </div>
         
            )
        }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);