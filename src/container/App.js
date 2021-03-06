import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import {connect} from 'react-redux';
import {setSearchField} from '../actions';

const mapStateToProps = state => {
    return {
        searchField: state.searchField
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}
class App extends Component{
    constructor(){
        super();
        this.state = {
            robots: [],
        }
    }
    
    componentDidMount(){
       fetch("https://jsonplaceholder.typicode.com/users")
       .then(response => response.json())
       .then(users => this.setState({robots:users}))
    }

    render(){
        let {robots} = this.state;
        let {searchField, onSearchChange} = this.props
        const filteredRobot = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });
        
        return !robots.length ? <h1>Loading...</h1> :
            (
                <div className='srch'>
                    <h1>RobotFriends</h1>
                    <SearchBox searchChange={onSearchChange}/>
                    <Scroll>
                      <ErrorBoundary>
                        <CardList robots={filteredRobot}/> 
                      </ErrorBoundary> 
                    </Scroll>
                </div>
            )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);