'use strict';

import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router';

import {notesData} from './data.js';

import {set_note_edit_mode ,reset_note_edit_mode,set_note_active, editing_note,
    remove_note, editing_note_title, editing_note_content} from '../actions.js';

import { connect } from 'react-redux'

import filter from 'lodash/collection/filter.js';

import store from '../store.js'

var Menu = require('./menu.js');

class SingleNote extends Component {

    constructor(props) {
        super(props);

        this.dispatch = this.props.dispatch;
    }

    findNote(id){
        return filter(notesData,function(item){
            return item.id == id
        });
    }

    setEditNote(){

        if(this.props.params.id != store.getState().editNoteId) {

            this.dispatch(set_note_edit_mode());

        }else{
            this.dispatch(reset_note_edit_mode());
        }

        this.setState(store.getState());

    }

    removeNote(){

        this.dispatch(remove_note());

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

        var self = this,
            note = self.findNote(this.props.params.id)[0],
            tagsCounter = 0,
            textModeClass = 'visible',
            editModeClass = 'hidden';

        console.log('content !!!',self.back);

        if(this.props.params.id == store.getState().editNoteId){
            textModeClass = 'hidden';
            editModeClass = 'visible';
        }

        var tags = note.tags.map(function(item) {
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

                        <div className={textModeClass+" content-block"}>{note.content}</div>

                        <textarea className={editModeClass+" form-control"}
                        onChange={self.editingNoteContent.bind(this)}
                        ref="noteContentInput"
                        type="text" value={note.content}></textarea>
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
    }
}

export default connect()(SingleNote);
