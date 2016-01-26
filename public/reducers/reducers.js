import { combineReducers } from 'redux'

import map from 'lodash/collection/map.js';
import filter from 'lodash/collection/filter.js';
import forEach from 'lodash/collection/forEach.js';
import max from 'lodash/math/max.js';

import { SET_FOLDER_EDIT_MODE, RESET_FOLDER_EDIT_MODE, SET_FOLDER_ACTIVE, EDITING_FOLDER,SET_NOTE_ACTIVE,
    SET_NOTE_EDIT_MODE, RESET_NOTE_EDIT_MODE,
    EDITING_NOTE_TITLE, EDITING_NOTE_CONTENT,
    GET_NOTES_REQUEST, GET_NOTES_RESPONSE, CREATE_NOTES_REQUEST, CREATE_NOTES_RESPONSE,
    UPDATE_NOTES_REQUEST, UPDATE_NOTES_RESPONSE, DELETE_NOTES_REQUEST, DELETE_NOTES_RESPONSE,
    GET_FOLDERS_REQUEST, GET_FOLDERS_RESPONSE, CREATE_FOLDERS_REQUEST, CREATE_FOLDERS_RESPONSE,
    UPDATE_FOLDERS_REQUEST, UPDATE_FOLDERS_RESPONSE, DELETE_FOLDERS_REQUEST, DELETE_FOLDERS_RESPONSE,
    UPDATE_SINGLENOTE_RESPONSE} from '../actions/actions.js'

import initialState from './initialState.js'

function reducer(state = initialState, action) {

    console.log(action.type, action);

    switch (action.type) {

        case SET_FOLDER_EDIT_MODE:

            return Object.assign({}, state, {
                editFolderId: parseInt(state.activeFolderId)
            });

        case RESET_FOLDER_EDIT_MODE:

            return Object.assign({}, state, {
                editFolderId: null
            });

        case EDITING_FOLDER:

            let newFoldersData = map(state.folders.items,function(item){
                if(item.id == state.editFolderId){
                    item.name = action.value;
                }
                return item;
            });

            return Object.assign({}, state, {
                    folders: {
                        isFetching: false,
                        didInvalidate: false,
                        items: newFoldersData
                }

            });


        case SET_FOLDER_ACTIVE:

            return Object.assign({}, state, {
                activeFolderId: action.activeFolderId
            });

        case GET_FOLDERS_REQUEST:

            return Object.assign({}, state, {
                    folders: {
                        isFetching: true,
                        didInvalidate: false
                    }
            });

        case GET_FOLDERS_RESPONSE:

            return Object.assign({}, state, {

                    folders: {
                        isFetching: false,
                        didInvalidate: false,
                        items: action.data
                    }

            });

        case CREATE_FOLDERS_REQUEST:

            return Object.assign({}, state, {
                    folders: {
                        isFetching: true,
                        didInvalidate: false,
                        items: state.folders.items
                    }
            });

        case CREATE_FOLDERS_RESPONSE:

            state.folders.items.splice(action.data.index+1,0,action.data);

            return Object.assign({}, state, {

                    folders: {
                        isFetching: false,
                        didInvalidate: false,
                        items: state.folders.items
                    }

            });

        case DELETE_FOLDERS_REQUEST:

            return Object.assign({}, state, {
                    folders: {
                        isFetching: true,
                        didInvalidate: false,
                        items: state.folders.items
                    }
            });

        case DELETE_FOLDERS_RESPONSE:

            return Object.assign({}, state, {

                    folders: {
                        isFetching: false,
                        didInvalidate: false,
                        items: action.data
                    }

            });



        case SET_NOTE_EDIT_MODE:

            return Object.assign({}, state, {
                editNoteId: parseInt(state.activeNoteId)
            });

        case RESET_NOTE_EDIT_MODE:

            return Object.assign({}, state, {
                editNoteId: null
            });

        case SET_NOTE_ACTIVE:

            return Object.assign({}, state, {
                activeNoteId: action.activeNoteId
            });

        case EDITING_NOTE_TITLE:

            var newNotesData = map(state.notes.items,function(item){
                if(item.id == state.editNoteId){
                    item.title = action.value;
                }
                return item;
            });

            return Object.assign({}, state, {

                    notes: {
                        isFetching: false,
                        didInvalidate: false,
                        items: newNotesData
                    }

            });

        case EDITING_NOTE_CONTENT:

            var newNotesData = map(state.notes.items,function(item){
                if(item.id == state.editNoteId){
                    item.description = action.value;
                }
                return item;
            });

            return Object.assign({}, state, {

                    notes: {
                        isFetching: false,
                        didInvalidate: false,
                        items: newNotesData
                    }

            });

        case GET_NOTES_REQUEST:

            return Object.assign({}, state, {
                    notes: {
                        isFetching: true,
                        didInvalidate: false,
                        items: state.notes.items
                    }
            });

        case GET_NOTES_RESPONSE:

            return Object.assign({}, state, {

                    notes: {
                        isFetching: false,
                        didInvalidate: false,
                        items: action.data
                    }

            });

        case CREATE_NOTES_REQUEST:

            return Object.assign({}, state, {
                    notes: {
                        isFetching: true,
                        didInvalidate: false,
                        items: state.notes.items
                    }
            });

        case CREATE_NOTES_RESPONSE:

            var items = state.notes.items;

            items.push({
                key: 1 + max(items, function(item){
                    return item.key
                }).key,
                id: 1 + max(items, function(item){
                    return item.id
                }).id,
                title : action.data.title,
                description: action.data.description,
                directoryId: action.data.directoryId,
                tags: [],
                tagsIDs: action.data.tags
            });

            return Object.assign({}, state, {

                    notes: {
                        isFetching: false,
                        didInvalidate: false,
                        items: items
                    }

            });

        case UPDATE_NOTES_REQUEST:

            return Object.assign({}, state, {
                    notes: {
                        isFetching: true,
                        didInvalidate: false,
                        items: state.notes.items
                    }
            });

        case UPDATE_NOTES_RESPONSE:

            return Object.assign({}, state, {

                    notes: {
                        isFetching: false,
                        didInvalidate: false,
                        items: action.data
                    }

            });

        case UPDATE_SINGLENOTE_RESPONSE:

            items = state.notes.items;

            forEach(items,function(item){
                if(item.id == action.data.id){
                    item = action.data;
                }
            });

            return Object.assign({}, state, {

                    notes: {
                        isFetching: false,
                        didInvalidate: false,
                        items: items
                    }

            });

        case DELETE_NOTES_REQUEST:

            return Object.assign({}, state, {
                    notes: {
                        isFetching: true,
                        didInvalidate: false
                    }
            });


        case DELETE_NOTES_RESPONSE:

            return Object.assign({}, state, {

                    notes: {
                        isFetching: false,
                        didInvalidate: false,
                        items: filter(state.notes.items, function(item) {

                            return item.id != state.activeNoteId;
                        })
                    }

            });

        default:
            return state
    }
}

export default reducer