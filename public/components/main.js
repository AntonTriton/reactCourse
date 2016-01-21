'use strict';

import React, { Component } from 'react';

import {set_folder_edit_mode ,reset_folder_edit_mode, set_folder_active,editing_folder,
    remove_folder, add_folder, add_note, fetchNotes, fetchFolders} from '../actions.js';

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
            console.log('---fetchNotes---',store.getState());

            self.setState(store.getState());
        });

        this.dispatch(fetchFolders('GET')).then(function(data){
            console.log('---fetchFolders---',store.getState());

            self.setState(store.getState());

        });

        this.state = {
            showModal : false
        }
    }

    getFolderById(id){

        return filter(store.getState().fetchingData.folders.items, function(item){
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

        for(var i = 0 , len = store.getState().fetchingData.folders.items.length; i < len; i++){
            if(store.getState().fetchingData.folders.items[i].id == id){
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

        console.log('main addFolder 22', activeFolder, activeFolder[0].level, activeFolder[0].level+1);

        this.dispatch(fetchFolders('POST',{name : name, level: level, parentId: activeFolder[0].id ,index: index})).then(function(data){
            console.log('---fetchFolders POST---',store.getState());

            self.setState(store.getState());

        });

        //this.dispatch(add_folder(title, level, index));

        //this.setState(store.getState());
    }

    addNote(title, content){

        var directoryId = parseInt(store.getState().activeFolderId),
            tagsIDs = [directoryId],
            self = this;

        this.dispatch(fetchNotes('POST',{title : title, description: content, directoryId: directoryId , tags: tagsIDs})).then(function(data){
            console.log('---fetchFolders POST---',store.getState());

            self.setState(store.getState());

        });

        //this.dispatch(add_note(title, content, tagsIDs));

        //this.setState(store.getState());
    }

    editingFolder(value){

        this.dispatch(editing_folder(value));


        console.log('editingFolder',store.getState());

        this.setState(store.getState());

    }

    render() {
        console.log('main render 1 !!!');

        var state = store.getState(),
            self = this;

        if(!state.fetchingData.notes.isFetching && !state.fetchingData.folders.isFetching) {

            console.log('main render 2 !!!',state);//

            var folders = store.getState().fetchingData.folders.items,
                folder = folders[0],
                folderId = self.props.params.id || 0;

            if(folderId) folder = self.getFolderById(folderId)[0];

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
                            notes={state.fetchingData.notes.items}
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

//module.exports = Main;

export default connect()(Main);