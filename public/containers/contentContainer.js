'use strict';

//import React, { Component, PropTypes } from 'react';

//import { Link } from 'react-router';

/*import {set_note_edit_mode ,reset_note_edit_mode,set_note_active,
    editing_note_title, editing_note_content, delete_tag, add_tag,
    show_confirm_modal, hide_confirm_modal} from '../actions/index.js';*/

import * as actions from '../actions/index.js';

import {fetchNotes} from '../actions/fetchNotes';

//import { connect } from 'react-redux'

//import filter from 'lodash/collection/filter.js';

//import store from '../store.js'

//import Menu from './menu.js';

//import ConfirmModal from './ConfirmModal.js';

//import {Modal, Button} from 'react-bootstrap';

//----------------------------

import { connect } from 'react-redux'
//import { toggleTodo } from '../actions'
import Content from '../components/content'
/*
const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed)
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed)
    }
}*/

const mapStateToProps = (state) => {

    console.log('mapStateToProps',state);

    return {
        notes: state.notes,
        editNoteId: state.editNoteId,
        activeNoteId: state.activeNoteId,
        activeFolderId: state.activeFolderId,
        showConfirmModal: state.showConfirmModal
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setNoteEditMode:(activeNoteId)=>{
            dispatch(actions.set_note_edit_mode(activeNoteId));
        },
        resetNoteEditMode:()=>{
            dispatch(actions.reset_note_edit_mode());
        },
        showConfirm:()=>{
            dispatch(actions.show_confirm_modal());
        },
        editingNoteTitle:(activeNoteId,event)=>{

            dispatch(actions.editing_note_title(event.target.value,activeNoteId));
        },
        editingNoteContent:(activeNoteId,event)=>{
            dispatch(actions.editing_note_content(event.target.value,activeNoteId));
        },
        deleteTag:(activeFolderId,event)=>{
            var tagIndex = event.target.parentElement.dataset.index;

            dispatch(actions.delete_tag(tagIndex,activeFolderId));
        },
        addTag:(activeFolderId,event)=>{
            var tagName = event.target.parentElement.children[0].value;

            dispatch(actions.add_tag(tagName,activeFolderId));
        },
        close:()=>{
            dispatch(actions.hide_confirm_modal());
        },

        setNoteActive:(id)=>{
            dispatch(actions.set_note_active(id));
        },

        fetchNotes:(method,data)=>{
            return dispatch(fetchNotes(method,data));
        }
    }
}

const ContentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Content)

export default ContentContainer
