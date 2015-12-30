'use strict';

import React, { Component } from 'react'

import { connect } from 'react-redux'

import { set_folder_edit_mode } from '../actions'

console.log('app');

class App extends Component{

    constructor(props){
        super(props)
    }

    render() {

        console.log('app',this.props);

        // Injected by connect() call:
        const { dispatch } = this.props;

        return (
            <div>
                {this.props.children}
            </div>
        );
    }

};

function selectTodos(todos, filter) {

    switch (filter) {
        /*case VisibilityFilters.SHOW_ALL:
            return todos;*/
        /*case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(todo => todo.completed);
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(todo => !todo.completed)*/
    }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
    return {
        visibleTodos: selectTodos(state)/*,
        visibilityFilter: state.visibilityFilter*/
    }
}


// Wrap the component to inject dispatch and state into it
export default connect(select)(App)

//module.exports = App;
