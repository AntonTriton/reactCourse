'use strict';

import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router';

import {set_note_edit_mode ,reset_note_edit_mode,set_note_active, editing_note,
    remove_note, editing_note_title, editing_note_content, delete_tag, add_tag,
    show_confirm_modal, hide_confirm_modal} from '../actions/actions.js';

import {fetchNotes} from '../actions/fetchNotes.js';

import { connect } from 'react-redux'

import filter from 'lodash/collection/filter.js';

import store from '../store.js'

import Menu from './menu.js';

import {Modal, Button} from 'react-bootstrap';

const modalStyle = {
    position: 'fixed',
    zIndex: 1040,
    top: 0, bottom: 0, left: 0, right: 0
};

const backdropStyle = {
    ...modalStyle,
    zIndex: 'auto',
    backgroundColor: '#000',
    opacity: 0.5
};

const dialogStyle = function() {

    return {
        position: 'absolute',
        width: 400,
        top: '100px',
        left: '50%',
        marginLeft: '-200px',
        border: '1px solid #e5e5e5',
        backgroundColor: 'white',
        boxShadow: '0 5px 15px rgba(0,0,0,.5)',
        padding: 20
    };
};


class SingleNote extends Component {

    constructor(props) {
        super(props);

        this.dispatch = this.props.dispatch;

        var self = this;

        this.dispatch(fetchNotes('GET')).then(function(data){

            self.setState(store.getState());
        });

    }

    findNote(id){

        return filter(store.getState().notes.items,function(item){
            return item.id == id
        });
    }

    setEditNote(){

        var self = this;

        if(this.props.params.id != store.getState().editNoteId) {

            this.dispatch(set_note_edit_mode(store.getState().activeNoteId));

        }else{

            this.dispatch(reset_note_edit_mode());

            this.dispatch(fetchNotes('PUT', self.note)).then(function(data){

                self.setState(store.getState());

            });
        }

        this.setState(store.getState());

    }

    showConfirm(){

        this.dispatch(show_confirm_modal());
        this.setState(store.getState());

    }

    removeNote(){

        var self = this;

        this.dispatch(fetchNotes('DELETE', self.note)).then(function(data){

            self.close();

            // вернуться на главную страницу

            self.back();

        });

    }

    back(){
        window.history.back()
    }

    editingNoteTitle(event){

        this.dispatch(editing_note_title(event.target.value, store.getState().activeNoteId));

        this.setState(store.getState());
    }

    editingNoteContent(event){

        this.dispatch(editing_note_content(event.target.value, store.getState().activeNoteId));

        this.setState(store.getState());
    }

    deleteTag(event){

        var tagIndex = event.target.parentElement.dataset.index;

        this.dispatch(delete_tag(tagIndex,store.getState().activeFolderId));

        this.setState(store.getState());
    }

    addTag(event){

        var tagName = event.target.parentElement.children[0].value;

        console.log(event.target.parentElement.children[0].value);

        this.dispatch(add_tag(tagName,store.getState().activeFolderId));

        this.setState(store.getState());
    }

    close() {
        this.dispatch(hide_confirm_modal());
        this.setState(store.getState());
    }

    render() {
        var state = store.getState();

        if (!state.notes.isFetching) {

            var self = this,
                note = self.note = self.findNote(this.props.params.id)[0],
                tagsCounter = 0,
                textModeClass = 'visible',
                editModeClass = 'hidden',
                show_confirm_modal = store.getState().showConfirmModal;

            if (this.props.params.id == store.getState().editNoteId) {
                textModeClass = 'hidden';
                editModeClass = 'visible';
            }

            if(note) {
                var tags = note.tags.map(function (item) {
                    tagsCounter++;
                    return (
                        <span className="tag-item" key={tagsCounter} data-index={tagsCounter}>
                        {item}
                            <i className={editModeClass+" fa fa-close"}
                               onClick={self.deleteTag.bind(self)}
                                ></i>
                    </span>
                    )
                });

                this.dispatch(set_note_active(this.props.params.id));

                return (
                    <section className="single-note">

                        <Menu page="note"
                              set_edit={self.setEditNote.bind(this)}
                              removeNote={self.showConfirm.bind(this)}
                              back={self.back.bind(this)}
                            />

                        <div className="col-md-11">
                            <div className="single-note-row">
                                <label htmlFor="title">Title</label>

                                <div className={textModeClass+" content-block"}>{note.title}</div>

                                <input className={editModeClass}
                                       onChange={self.editingNoteTitle.bind(this)}
                                       ref="noteTitelInput"
                                       type="text" value={note.title}/>
                            </div>

                            <div className="single-note-row">
                                <label htmlFor="description">Description</label>

                                <div className={textModeClass+" content-block"}>{note.description}</div>

                        <textarea className={editModeClass+" form-control"}
                                  onChange={self.editingNoteContent.bind(this)}
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
                                           onClick={self.addTag.bind(this)}
                                            ></i>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <Modal
                            aria-labelledby='modal-label'
                            style={modalStyle}
                            backdropStyle={backdropStyle}
                            show={show_confirm_modal}
                            onHide={self.close.bind(this)}
                            >

                            <div style={dialogStyle()}>

                                <h4 id='modal-label'>Do you really want to delete this note ?</h4>

                                <div>
                                    <Button bsStyle="primary" onClick={self.removeNote.bind(this)}>Confirm</Button>
                                    <Button onClick={self.close.bind(this)}>Cancel</Button>
                                </div>

                                <div></div>
                            </div>
                        </Modal>

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
