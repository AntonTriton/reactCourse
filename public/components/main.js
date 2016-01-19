'use strict';

import React, { Component } from 'react';

import {foldersData} from './data.js';

import {set_folder_edit_mode ,reset_folder_edit_mode, set_folder_active,editing_folder,
    remove_folder, add_folder} from '../actions.js';

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

    removeFolder(){
        this.dispatch(remove_folder());

        this.setState(store.getState());
    }

    getFolderIndexById(id){

        for(var i = 0 , len = foldersData.length; i < len; i++){
            if(foldersData[i].id == id){
                return i
            }
        }

        return -1;
    }

    addFolder(title){

        var activeFolder= this.getFolderById(store.getState().activeFolderId),
            level = activeFolder[0].level + 1,
            index = this.getFolderIndexById(store.getState().activeFolderId);

        console.log('main addFolder 2', activeFolder, activeFolder[0].level, activeFolder[0].level+1);

        this.dispatch(add_folder(title, level, index));

        this.setState(store.getState());
    }

    editingFolder(value){

        this.dispatch(editing_folder(value));


        console.log('editingFolder',store.getState());

        this.setState(store.getState());

    }

    render() {

        var state = store.getState(),
            self = this,
            folder = state.foldersData[0],
            folderId = this.props.params.id || 0;

        if(folderId) folder = this.getFolderById(folderId)[0];

        console.log('main render', folder, folderId);

        this.dispatch(set_folder_active(folderId));

        return (
            <div>
                <Menu page="main"
                    set_edit={self.setEditFolder.bind(this)}
                    addFolder={self.addFolder.bind(this)}
                    removeFolder={self.removeFolder.bind(this)}
                />

                <section className="folders col-md-3">
                    <Folders
                        activeFolderId={folderId}
                        foldersData={state.foldersData}
                        editFolderId={state.editFolderId}
                        reset_edit={self.resetEditFolder.bind(this)}
                        editingFolder={self.editingFolder.bind(this)}/>
                </section>

                <section className="notes col-md-8">
                    <Notes
                        notes={state.notesData}
                        folder={folder}
                        />
                </section>
            </div>
        );
    }

};

//module.exports = Main;

export default connect()(Main);