'use strict';

import React, { Component } from 'react';

import {set_folder_edit_mode ,reset_folder_edit_mode, set_folder_active,editing_folder,
    remove_folder, add_folder, add_note, show_confirm_modal, hide_confirm_modal,
    show_add_modal, hide_add_modal} from '../actions/index.js';

import {fetchFolders} from '../actions/fetchFolders.js';
import {fetchNotes} from '../actions/fetchNotes.js';

import { connect } from 'react-redux'

import Menu from './menu.js';

import Folders from './folders.js';

import Notes from './notes.js';

import ConfirmModal from './ConfirmModal.js';

import AddModal from './AddModal.js';

import store from '../store.js'

import filter from 'lodash/collection/filter.js';
import find from 'lodash/collection/find.js';


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

    }

    getFolderById(id){

        return filter(store.getState().folders.items, function(item){

            return item.id == id

        });

    }

    setEditFolder(){

        this.dispatch(set_folder_edit_mode(store.getState().activeFolderId));

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

        var self = this;

        this.dispatch(fetchFolders('DELETE', self.folder)).then(function(data){

            self.forcedFolderId = true;

            self.closeConfirm();

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

            self.setState({folders: store.getState().folders});

        });

    }

    addNote(title, content){

        var directoryId = parseInt(store.getState().activeFolderId),
            /*tagsIDs = [directoryId],*/
            self = this;

        this.dispatch(fetchNotes('POST',{title : title, description: content, directoryId: directoryId})).then(function(data){

            self.setState({notes: store.getState().notes});

        });
    }

    editingFolder(value){

        this.dispatch(editing_folder(value,store.getState().editFolderId));

        this.setState(store.getState());

    }

    updatePosition(notes){
        var self = this;

        this.dispatch(fetchNotes('PUT', notes)).then(function(data){
            self.setState(store.getState());
        });

    }

    updateNoteTitle(noteId, newTitle){
        var self = this,
            note = find(store.getState().notes.items,function(item){
                return item.id == noteId
            });

        note.title = newTitle;
        note.title = newTitle;

        this.dispatch(fetchNotes('PUT', note)).then(function(data){
            self.setState(store.getState());
        });
    }

    showConfirm(){

        this.dispatch(show_confirm_modal());
        this.setState(store.getState());

    }

    closeConfirm() {
        this.dispatch(hide_confirm_modal());
        this.setState(store.getState());
    }

    showAdd(){

        this.dispatch(show_add_modal());
        this.setState(store.getState());

    }

    closeAdd() {
        this.dispatch(hide_add_modal());
        this.setState(store.getState());
    }

    render() {

        var state = store.getState(),
            self = this;

        if(!state.notes.isFetching && !state.folders.isFetching) {

            var folders = store.getState().folders.items, folderId, folder,
                show_confirm_modal = state.showConfirmModal;

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
                          showAdd={self.showAdd.bind(this)}
                          removeFolder={self.showConfirm.bind(this)}
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
                            updateNoteTitle={self.updateNoteTitle.bind(this)}
                            folder={folder}
                            />
                    </section>

                    <ConfirmModal
                        onClose={self.closeConfirm.bind(this)}
                        onSuccess={self.removeFolder.bind(this)}
                        is_show={show_confirm_modal}
                        message={"Do you really want to delete this folder ?"}
                        />

                    <AddModal
                        onClose={self.closeAdd.bind(this)}
                        onSuccess={self.removeFolder.bind(this)}
                        is_show={self.state.showAddModal}
                        message={"What do you want to add ?"}
                        addFolder={self.addFolder.bind(this)}
                        addNote={self.addNote.bind(this)}
                        />

                </div>
            );
        }else{
            return null
        }
    }

};

export default connect()(Main);
