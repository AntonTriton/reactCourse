'use strict';

import React, { Component } from 'react';

import {set_folder_edit_mode ,reset_folder_edit_mode, set_folder_active,editing_folder,
    remove_folder, add_folder, add_note} from '../actions/actions.js';

import {fetchFolders} from '../actions/fetchFolders.js';
import {fetchNotes} from '../actions/fetchNotes.js';

import { connect } from 'react-redux'

import filter from 'lodash/collection/filter.js';

import Menu from './menu.js';

import Folders from './folders.js';

import Notes from './notes.js';

import store from '../store.js'


class Main extends Component {

    constructor(props){
        super(props);

        this.dispatch = this.props.dispatch;

        var self = this;

        this.dispatch(fetchNotes('GET')).then(function(data){

            self.setState(store.getState());
        });

        this.dispatch(fetchFolders('GET')).then(function(data){

            self.setState(store.getState());

        });

        this.state = {
            showModal : false
        }
    }

    getFolderById(id){


        return filter(store.getState().folders.items, function(item){

            return item.id == id
        });

    }

    setEditFolder(){

        this.dispatch(set_folder_edit_mode());

        this.setState(store.getState());

    }

    resetEditFolder(){

        this.dispatch(reset_folder_edit_mode());

        var self = this;

        this.dispatch(fetchFolders('PUT', self.folder)).then(function(data){

            self.setState(store.getState());

        });

        this.setState(store.getState());

    }

    removeFolder(){
        //this.dispatch(remove_folder());

        var self = this;

        this.dispatch(fetchFolders('DELETE', self.folder)).then(function(data){

            self.forcedFolderId = true;

            self.setState(store.getState());

        });

    }

    getFolderIndexById(id){

        for(var i = 0 , len = store.getState().folders.items.length; i < len; i++){
            if(store.getState().folders.items[i].id == id){
                return i
            }
        }

        return -1;
    }

    addFolder(name){

        var activeFolder= this.getFolderById(store.getState().activeFolderId),
            level = activeFolder[0].level + 1,
            index = this.getFolderIndexById(store.getState().activeFolderId),
            self = this;

        this.dispatch(fetchFolders('POST',{name : name, level: level, parentId: activeFolder[0].id ,index: index})).then(function(data){

            self.setState(store.getState());

        });

    }

    addNote(title, content){

        var directoryId = parseInt(store.getState().activeFolderId),
            tagsIDs = [directoryId],
            self = this;

        this.dispatch(fetchNotes('POST',{title : title, description: content, directoryId: directoryId , tags: tagsIDs})).then(function(data){

            self.setState(store.getState());

        });
    }

    editingFolder(value){

        this.dispatch(editing_folder(value));

        this.setState(store.getState());

    }

    updatePosition(notes){
        var directoryId = parseInt(store.getState().activeFolderId),
            tagsIDs = [directoryId],
            self = this;

        this.dispatch(fetchNotes('PUT', notes)).then(function(data){
            self.setState(store.getState());

        });
    }

    render() {

        var state = store.getState(),
            self = this;

        if(!state.notes.isFetching && !state.folders.isFetching) {

            var folders = store.getState().folders.items, folderId, folder;

                folderId = self.props.params.id || 0;
                if( !self.getFolderById(folderId)[0] ){
                    folderId = 0;
                    self.forcedFolderId = false;
                }
                folder = self.folder = self.getFolderById(folderId)[0];


            self.dispatch(set_folder_active(folderId));

            return (
                <div>
                    <Menu page="main"
                          set_edit={self.setEditFolder.bind(this)}
                          addFolder={self.addFolder.bind(this)}
                          addNote={self.addNote.bind(this)}
                          removeFolder={self.removeFolder.bind(this)}
                        />

                    <section className="folders col-md-3">
                        <Folders
                            activeFolderId={folderId}
                            foldersData={folders}
                            editFolderId={state.editFolderId}
                            reset_edit={self.resetEditFolder.bind(this)}
                            editingFolder={self.editingFolder.bind(this)}/>
                    </section>

                    <section className="notes col-md-8">
                        <Notes
                            notes={state.notes.items}
                            updatePosition={self.updatePosition.bind(this)}
                            folder={folder}
                            />
                    </section>
                </div>
            );
        }else{
            return null
        }
    }

};

export default connect()(Main);