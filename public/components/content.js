'use strict';

import React, { Component } from 'react';

//import { Link } from 'react-router';

/*import {set_note_edit_mode ,reset_note_edit_mode,set_note_active,
    editing_note_title, editing_note_content, delete_tag, add_tag,
    show_confirm_modal, hide_confirm_modal} from '../actions/index.js';*/

//import * as actions from '../actions/index.js';

//import {fetchNotes} from '../actions/fetchNotes.js';

import { connect } from 'react-redux'

import filter from 'lodash/collection/filter.js';

//import store from '../store.js'

import Menu from './menu.js';

import ConfirmModal from './ConfirmModal.js';

import {Modal, Button} from 'react-bootstrap';


class SingleNote extends Component {

    constructor(props) {
        super(props);

        console.log('singleNote',props);

        //this.dispatch = this.props.dispatch;
    }

    componentWillMount(){

        var self = this;

        console.log('componentWillMount');

        this.props.fetchNotes('GET');

        /*this.dispatch(fetchNotes('GET')).then(function(data){

            self.setState(store.getState());
        });*/
    }

    findNote(id){

        return filter(this.props.notes.items,function(item){
            return item.id == id
        });
    }

    setEditNote(){

        var self = this;

        if(this.props.params.id != this.props.editNoteId) {

            //this.dispatch(actions.set_note_edit_mode(this.props.activeNoteId));
            this.props.setNoteEditMode(this.props.activeNoteId);

        }else{

            //this.dispatch(actions.reset_note_edit_mode());
            this.props.resetNoteEditMode();

            this.props.fetchNotes('PUT',self.note);

            /*this.dispatch(fetchNotes('PUT', self.note)).then(function(data){

                self.setState(store.getState());

            });*/
        }

        //this.setState(store.getState());

    }

    /*showConfirm(){

        //this.dispatch(actions.show_confirm_modal());
        this.showConfirm();

        this.setState(store.getState());

    }*/

    removeNote(){

        var self = this;

        this.props.fetchNotes('DELETE',self.note).then(function(){
            self.props.close();

            self.back();
        });

        /*this.dispatch(fetchNotes('DELETE', self.note)).then(function(data){

            self.close();

            self.back();

        });*/

    }

    back(){
        window.history.back()
    }

    /*editingNoteTitle(event){

        this.dispatch(actions.editing_note_title(event.target.value, this.props.activeNoteId));

        this.setState(store.getState());
    }*/

    /*editingNoteContent(event){

        this.dispatch(actions.editing_note_content(event.target.value, this.props.activeNoteId));

        this.setState(store.getState());
    }*/

    /*deleteTag(event){

        var tagIndex = event.target.parentElement.dataset.index;

        this.dispatch(actions.delete_tag(tagIndex,this.props.activeFolderId));

        this.setState(store.getState());
    }*/

    /*addTag(event){

        var tagName = event.target.parentElement.children[0].value;

        console.log(event.target.parentElement.children[0].value);

        this.dispatch(actions.add_tag(tagName,this.props.activeFolderId));

        this.setState(store.getState());
    }*/

    /*close() {
        this.dispatch(actions.hide_confirm_modal());
        this.setState(store.getState());
    }*/

    render() {
        //var state = store.getState();

        if (!this.props.notes.isFetching) {

            var self = this,
                note = self.note = self.findNote(this.props.params.id)[0],
                tagsCounter = 0,
                textModeClass = 'visible',
                editModeClass = 'hidden',
                show_confirm_modal = this.props.showConfirmModal;

            if (this.props.params.id == this.props.editNoteId) {
                textModeClass = 'hidden';
                editModeClass = 'visible';
            }

            if(note) {

                var tags = "";

                if (note.tags){
                    tags = note.tags.map(function (item) {
                        tagsCounter++;
                        return (
                          <span className="tag-item" key={tagsCounter} data-index={tagsCounter}>
                        {item}
                              <i className={editModeClass+" fa fa-close"}
                                 onClick={self.props.deleteTag.bind(self,self.props.activeFolderId)}
                                ></i>
                    </span>
                        )
                    });
                }

                //this.dispatch(actions.set_note_active(this.props.params.id));
                this.props.setNoteActive(this.props.params.id);

                return (
                    <section className="single-note">

                        <Menu page="note"
                              set_edit={self.setEditNote.bind(this)}
                              removeNote={self.props.showConfirm.bind(this)}
                              back={self.back.bind(this)}
                            />

                        <div className="col-md-11">
                            <div className="single-note-row">
                                <label htmlFor="title">Title</label>

                                <div className={textModeClass+" content-block"}>{note.title}</div>

                                <input className={editModeClass}
                                       onChange={self.props.editingNoteTitle.bind(this,self.props.activeNoteId)}
                                       ref="noteTitelInput"
                                       type="text" value={note.title}/>
                            </div>

                            <div className="single-note-row">
                                <label htmlFor="description">Description</label>

                                <div className={textModeClass+" content-block"}>{note.description}</div>

                        <textarea className={editModeClass+" form-control"}
                                  onChange={self.props.editingNoteContent.bind(this,self.props.activeNoteId)}
                                  ref="noteContentInput"
                                  type="text" value={note.description}></textarea>
                            </div>

                            <div className="single-note-row">
                                <label>Tags</label>

                                <div>
                                    {tags}

                                    <div className={editModeClass+" add-tag-block"}>
                                        <input placeholder="add Tag" className="add-tag" type="text"/>

                                        <i className="fa fa-plus"
                                           onClick={self.props.addTag.bind(this,self.props.activeFolderId)}
                                            ></i>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <ConfirmModal
                            onClose={self.props.close.bind(this)}
                            onSuccess={self.removeNote.bind(this)}
                            is_show={show_confirm_modal}
                            message={"Do you really want to delete this note ?"}
                            />

                    </section>
                );
            }

            return null

        }else{
            return null
        }
    }
}

export default connect()(SingleNote);
