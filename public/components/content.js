'use strict';

import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router';

import {set_note_edit_mode ,reset_note_edit_mode,set_note_active, editing_note,
    remove_note, editing_note_title, editing_note_content} from '../actions/actions.js';

import {fetchNotes} from '../actions/fetchNotes.js';

import { connect } from 'react-redux'

import filter from 'lodash/collection/filter.js';

import store from '../store.js'

import Menu from './menu.js';



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

            this.dispatch(set_note_edit_mode());

        }else{

            this.dispatch(reset_note_edit_mode());

            this.dispatch(fetchNotes('PUT', self.note)).then(function(data){

                self.setState(store.getState());

            });
        }

        this.setState(store.getState());

    }

    removeNote(){

        var self = this;

        this.dispatch(fetchNotes('DELETE', self.note)).then(function(data){

            self.setState(store.getState());

        });

        // вернуться на главную страницу

        this.setState(store.getState());

        this.back();

    }

    back(){
        window.history.back()
    }

    editingNoteTitle(event){

        this.dispatch(editing_note_title(event.target.value));

        this.setState(store.getState());
    }

    editingNoteContent(event){
        this.dispatch(editing_note_content(event.target.value));

        this.setState(store.getState());
    }

    render() {

        var state = store.getState();

        if (!state.notes.isFetching) {

            var self = this,
                note = self.note = self.findNote(this.props.params.id)[0],
                tagsCounter = 0,
                textModeClass = 'visible',
                editModeClass = 'hidden';

            if (this.props.params.id == store.getState().editNoteId) {
                textModeClass = 'hidden';
                editModeClass = 'visible';
            }

            var tags = note.tags.map(function (item) {
                tagsCounter++;
                return <span key={tagsCounter}>{item}</span>
            });

            this.dispatch(set_note_active(this.props.params.id));

            return (
                <section className="single-note">

                    <Menu page="note"
                          set_edit={self.setEditNote.bind(this)}
                          removeNote={self.removeNote.bind(this)}
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
                            </div>
                        </div>
                    </div>

                </section>
            );
        }else{
            return null
        }
    }
}

export default connect()(SingleNote);
