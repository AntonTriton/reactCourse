'use strict';

import React, { Component } from 'react';

import {foldersData} from './data.js';

import {set_folder_edit_mode ,reset_folder_edit_mode, set_folder_active,editing_folder} from '../actions.js';

import { connect } from 'react-redux'

import filter from 'lodash/collection/filter.js';

import Menu from './menu.js';

import Folders from './folders.js';

import Notes from './notes.js';

import store from '../store.js'

/*var Menu = require('./menu.js'),
    Folders = require('./folders.js'),
    Notes = require('./notes.js');*/

class Main extends Component {

    constructor(props){
        super(props);

        this.dispatch = this.props.dispatch;

        this.state = {
            showModal : false
        }
    }

    getFolderById(id){

        return filter(foldersData, function(item){
            return item.id == id
        });

    }

    setEditFolder(){

        this.dispatch(set_folder_edit_mode());

        this.setState(store.getState());

    }

    resetEditFolder(){

        this.dispatch(reset_folder_edit_mode());

        this.setState(store.getState());

    }

    editingFolder(value){

        this.dispatch(editing_folder(value));


        console.log('editingFolder',store.getState());

        this.setState(store.getState());

    }

    render() {

        var self = this,
            folder = foldersData[0],
            folderId = this.props.params.id || 0;

        if(folderId) folder = this.getFolderById(folderId)[0];

        console.log('main render', this.dispatch);

        this.dispatch(set_folder_active(folderId));

        return (
            <div>
                <Menu page="main"
                    set_edit={self.setEditFolder.bind(this)}
                />

                <section className="folders col-md-3">
                    <Folders activeFolderId={folderId}
                    reset_edit={self.resetEditFolder.bind(this)}
                    editingFolder={self.editingFolder.bind(this)}/>
                </section>

                <section className="notes col-md-8">
                    <Notes folder={folder} />
                </section>
            </div>
        );
    }

};

//module.exports = Main;

export default connect()(Main);