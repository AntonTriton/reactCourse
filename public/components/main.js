'use strict';

import React, { Component } from 'react';
/*
import {set_folder_edit_mode ,reset_folder_edit_mode, set_folder_active,editing_folder,
    show_confirm_modal, hide_confirm_modal,
    show_add_modal, hide_add_modal} from '../actions/index.js';*/

import * as actions from '../actions/index.js';

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
//import forEach from 'lodash/collection/forEach.js';
//import find from 'lodash/collection/find.js';


class Main extends Component {

    constructor(props){
        super(props);

        //this.dispatch = this.props.dispatch;

    }

    componentWillMount(){

        this.props.fetchNotes('GET');
        this.props.fetchFolders('GET');

        /*this.dispatch(fetchNotes('GET')).then(function(data){

            self.setState(store.getState());
        });

        this.dispatch(fetchFolders('GET')).then(function(data){

            self.setState(store.getState());

        });*/
    }

    getFolderById(id){

        //return filter(store.getState().folders.items, function(item){
        return filter(this.props.folders.items, function(item){

            return item.id == id

        });

    }

    /*setEditFolder(){

        this.dispatch(actions.set_folder_edit_mode(store.getState().activeFolderId));

        this.setState(store.getState());

    }*/

    /*resetEditFolder(folder){

        this.props.resetFolderEditMode();
        this.props.fetchFolders('PUT',this.folder);

        *//*this.dispatch(actions.reset_folder_edit_mode());

        var self = this;

        this.dispatch(fetchFolders('PUT', self.folder)).then(function(data){

            self.setState(store.getState());

        });

        this.setState(store.getState());*//*

    }*/

    /*removeFolder(){

        let self = this;

        this.props.fetchFolders('DELETE',self.folder).then(function(){
            //self.forcedFolderId = true;

            self.props.closeConfirm();
        });

        *//*var self = this;

        this.dispatch(fetchFolders('DELETE', self.folder)).then(function(data){

            self.forcedFolderId = true;

            self.closeConfirm();

        });*//*

    }*/

    getFolderIndexById(id){

        for(var i = 0 , len = this.props.folders.items.length; i < len; i++){
            if(this.props.folders.items[i].id == id){
                return i
            }
        }

        return -1;
    }

    /*addFolder(name){

        var activeFolder= this.getFolderById(this.props.activeFolderId),
            level = activeFolder[0].level + 1,
            index = this.getFolderIndexById(this.props.activeFolderId),
            self = this;

        this.props.fetchFolders('POST',{name : name, level: level, parentId: activeFolder[0].id ,index: index});

        *//*this.dispatch(fetchFolders('POST',{name : name, level: level, parentId: activeFolder[0].id ,index: index})).then(function(data){

            self.setState({folders: store.getState().folders});

        });*//*

    }*/

    /*addNote(title, content){

        var directoryId = parseInt(this.props.activeFolderId),
            *//*tagsIDs = [directoryId],*//*
            self = this;

        this.props.fetchNotes('POST',{title : title, description: content, directoryId: directoryId})

        *//*this.dispatch(fetchNotes('POST',{title : title, description: content, directoryId: directoryId})).then(function(data){

            self.setState({notes: store.getState().notes});

        });*//*
    }*/

    /*editingFolder(value){

        this.dispatch(actions.editing_folder(value,store.getState().editFolderId));

        this.setState(store.getState());

    }*/

    /*saveNotePosition(notes){

        this.props.fetchNotes('PUT',notes);

        *//*var self = this;

        this.dispatch(fetchNotes('PUT', notes)).then(function(data){
            self.setState(store.getState());
        });*//*

    }*/

   /* moveNote(id, atIndex) {
        let { note, index } = this.findNote(id);

        this.props.updateNotePosition(index,atIndex,note);

        *//*var counter = 0;
        forEach(this.props.notes.items,function(item){
            item.position = counter;
            counter++;
        });*//*

        //if(this.props.notes.isFetching === false) {
            //this.saveNotePosition(this.props.notes.items);
        //}

    }*/

   /* findNote(id) {
        const notes = this.props.notes.items;
        //const note = notes.filter(c => c.id === id)[0];
        const note = filter(notes, function(item){
            return item.id === id
        })[0];

        return {
            note,
            index: notes.indexOf(note)
        };
    }*/

   /* updateNoteTitle(noteId, newTitle){
        var self = this,
            note = find(this.props.notes.items,function(item){
                return item.id == noteId
            });

        note.title = newTitle;

        this.props.fetchNotes('PUT', note);

        *//*this.dispatch(fetchNotes('PUT', note)).then(function(data){
            self.setState(store.getState());
        });*//*
    }*/

    /*showConfirm(){

        this.dispatch(actions.show_confirm_modal());
        this.setState(store.getState());

    }*/

    /*closeConfirm() {
        this.dispatch(actions.hide_confirm_modal());
        this.setState(store.getState());
    }*/

    /*showAdd(){

        this.dispatch(actions.show_add_modal());
        this.setState(store.getState());

    }*/

    /*closeAdd() {
        this.dispatch(actions.hide_add_modal());
        this.setState(store.getState());
    }*/

    render() {

        var props = this.props,
            self = this;

        if(props.notes.isFetching === false && props.folders.isFetching === false) {

            var folders = props.folders.items, folderId, folder,
                show_confirm_modal = props.showConfirmModal;

                folderId = self.props.params.id || 0;
                if( !self.getFolderById(folderId)[0] ){
                    folderId = 0;
                    //self.forcedFolderId = false;
                }
                folder = self.folder = self.getFolderById(folderId)[0];

            //self.dispatch(actions.set_folder_active(folderId));
            props.setFolderActive(folderId);

            console.log('render',props);

            return (
                <div>
                    <Menu page="main"
                          set_edit={self.props.setEditFolder.bind(this,self.props.activeFolderId)}
                          showAdd={self.props.showAdd.bind(this)}
                          removeFolder={self.props.showConfirm.bind(this)}
                        />

                    <section className="folders col-md-3">
                        <Folders
                            activeFolderId={folderId}
                            foldersData={folders}
                            editFolderId={self.props.editFolderId}
                            reset_edit={self.props.resetEditFolder.bind(this,self.folder)}
                            editingFolder={self.props.editingFolder.bind(this,self.props.editFolderId)}/>
                    </section>

                    <section className="notes col-md-8">
                        <Notes
                            notes={self.props.notes.items}
                            moveNote={self.props.moveNote.bind(this)}
                            findNote={self.props.findNote.bind(this)}
                            saveNotePosition={self.props.saveNotePosition.bind(this)}
                            updateNoteTitle={self.props.updateNoteTitle.bind(this,self.props.notes.items)}
                            folder={folder}
                            />
                    </section>

                    <ConfirmModal
                        onClose={self.props.closeConfirm.bind(this)}
                        onSuccess={self.props.removeFolder.bind(this,self.folder)}
                        is_show={show_confirm_modal}
                        message={"Do you really want to delete this folder ?"}
                        />

                    <AddModal
                        onClose={self.props.closeAdd.bind(this)}
                        is_show={self.props.showAddModal}
                        message={"What do you want to add ?"}
                        addFolder={self.props.addFolder.bind(this,self.props.activeFolderId)}
                        addNote={self.props.addNote.bind(this,self.props.activeFolderId)}
                        />

                </div>
            );
        }else{
            return null
        }
    }

};

export default connect()(Main);
