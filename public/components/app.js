'use strict';

import React, { Component } from 'react'

import { connect } from 'react-redux'

import { set_folder_edit_mode } from '../actions'

class App extends Component{

    constructor(props){
        super(props)
    }

    render() {

        console.log('app render',this.props.children);

        // Injected by connect() call:
        //const { dispatch } = this.props;

        return (
            <div>
                {this.props.children}
            </div>
        );
    }

};

export default App

