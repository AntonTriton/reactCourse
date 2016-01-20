import { combineReducers } from 'redux'

import map from 'lodash/collection/map.js';
import filter from 'lodash/collection/filter.js';
import max from 'lodash/math/max.js';
//
import { SET_FOLDER_EDIT_MODE, RESET_FOLDER_EDIT_MODE, SET_FOLDER_ACTIVE, EDITING_FOLDER,SET_NOTE_ACTIVE,
    REMOVE_FOLDER, ADD_FOLDER, ADD_NOTE, SET_NOTE_EDIT_MODE, RESET_NOTE_EDIT_MODE,
    EDITING_NOTE_TITLE, EDITING_NOTE_CONTENT, REMOVE_NOTE,
    GET_NOTES_REQUEST, GET_NOTES_RESPONSE, CREATE_NOTES_REQUEST, CREATE_NOTES_RESPONSE,
    UPDATE_NOTES_REQUEST, UPDATE_NOTES_RESPONSE, DELETE_NOTES_REQUEST, DELETE_NOTES_RESPONSE,
    GET_FOLDERS_REQUEST, GET_FOLDERS_RESPONSE, CREATE_FOLDERS_REQUEST, CREATE_FOLDERS_RESPONSE,
    UPDATE_FOLDERS_REQUEST, UPDATE_FOLDERS_RESPONSE, DELETE_FOLDERS_REQUEST, DELETE_FOLDERS_RESPONSE} from '../actions'

import { notesData,foldersData,menuData } from '../components/data.js'

/*const initialState = {
    activeFolderId: 0,
    editFolderId: null,
    activeNoteId: 0,
    editNoteId: null,
    notesData: notesData,
    foldersData: foldersData,
    menuData: menuData
};*/

const initialState = {
    activeFolderId: 0,
    editFolderId: null,
    activeNoteId: 0,
    editNoteId: null,
    fetchingData:{
        notes: {
            isFetching: false,
            didInvalidate: false,
            items:[]
        },
        folders: {
            isFetching: false,
            didInvalidate: false,
            items:[]
        }
    },
    menuData: menuData
};

function reducer(state = initialState, action) {

    switch (action.type) {

        case SET_FOLDER_EDIT_MODE:
            console.log(action.type,state.activeFolderId);

            return Object.assign({}, state, {
                editFolderId: parseInt(state.activeFolderId)
            });

        case RESET_FOLDER_EDIT_MODE:
            console.log(action.type);

            return Object.assign({}, state, {
                editFolderId: null
            });

        case EDITING_FOLDER:

            let newFoldersData = map(state.foldersData,function(item){
                if(item.id == state.editFolderId){
                    item.title = action.value;
                }
                return item;
            });

            console.log(action.type,action.value,state.foldersData,newFoldersData);

            return Object.assign({}, state, {
                foldersData: newFoldersData
            });

        case SET_FOLDER_ACTIVE:
            console.log(action.type,action.activeFolderId,state);

            return Object.assign({}, state, {
                activeFolderId: action.activeFolderId
            });

        case REMOVE_FOLDER:
            console.log(action.type,state,action);

            return Object.assign({}, state, {
                foldersData: filter(state.foldersData, function(item) {

                    return item.id != state.activeFolderId;
                })
            });

        case ADD_FOLDER:
            console.log(action.type);

            // activeFolderId

            state.foldersData.splice(action.index+1,0,{
                key: 1 + max(state.foldersData, function(item){
                    return item.key
                }).key,
                id: 1 + max(state.foldersData, function(item){
                    return item.id
                }).id,
                title : action.title,
                status: 'closed',
                isActive: false,
                level: action.level
            });

            return Object.assign({}, state, {
                foldersData: state.foldersData
            });

        case ADD_NOTE:

            // activeFolderId

            state.notesData.push({
                key: 1 + max(state.notesData, function(item){
                    return item.key
                }).key,
                id: 1 + max(state.notesData, function(item){
                    return item.id
                }).id,
                title : action.title,
                content: action.content,
                tags: [],
                tagsIDs: action.tags
            });

            console.log(action.type,state.notesData);

            return Object.assign({}, state, {
                notesData: state.notesData
            });



        case SET_NOTE_EDIT_MODE:
            console.log(action.type,state.activeNoteId);

            return Object.assign({}, state, {
                editNoteId: parseInt(state.activeNoteId)
            });

        case RESET_NOTE_EDIT_MODE:
            console.log(action.type);

            return Object.assign({}, state, {
                editNoteId: null
            });

        case SET_NOTE_ACTIVE:
            console.log(action.type,action.activeNoteId,state);

            return Object.assign({}, state, {
                activeNoteId: action.activeNoteId
            });

        case EDITING_NOTE_TITLE:

            var newNotesData = map(state.notesData,function(item){
                if(item.id == state.editNoteId){
                    item.title = action.value;
                }
                return item;
            });

            console.log(action.type,action.value,state.notesData,newNotesData);

            return Object.assign({}, state, {
                notesData: newNotesData
            });

        case EDITING_NOTE_CONTENT:

            var newNotesData = map(state.notesData,function(item){
                if(item.id == state.editNoteId){
                    item.content = action.value;
                }
                return item;
            });

            console.log(action.type,action.value,state.notesData,newNotesData);

            return Object.assign({}, state, {
                notesData: newNotesData
            });

        case REMOVE_NOTE:
            console.log(action.type);

            return Object.assign({}, state, {
                notesData: filter(state.notesData, function(item) {

                    return item.id != state.activeNoteId;
                })
            });

        case GET_FOLDERS_REQUEST:
            console.log(action.type);

            return Object.assign({}, state, {
                fetchingData:{
                    notes: state.fetchingData.notes,
                    folders: {
                        isFetching: true,
                        didInvalidate: false
                    }
                }
            });

        case GET_FOLDERS_RESPONSE:
            console.log(action.type);

            return Object.assign({}, state, {

                fetchingData:{
                    notes: state.fetchingData.notes,
                    folders: {
                        isFetching: false,
                        didInvalidate: false,
                        items: action.data
                    }
                }

            });


        case GET_NOTES_REQUEST:
            console.log(action.type);

            return Object.assign({}, state, {
                fetchingData:{
                    notes: {
                        isFetching: true,
                        didInvalidate: false
                    },
                    folders: state.fetchingData.folders
                }
            });

        case GET_NOTES_RESPONSE:
            console.log(action.type,"23");

            return Object.assign({}, state, {

                fetchingData:{
                    notes: {
                        isFetching: false,
                        didInvalidate: false,
                        items: action.data
                    },
                    folders: state.fetchingData.folders
                }

            });

        case CREATE_NOTES_REQUEST:
            console.log(action.type);

            return Object.assign({}, state, {
                fetchingData:{
                    notes: {
                        isFetching: true,
                        didInvalidate: false
                    }
                }
            });

        case CREATE_NOTES_RESPONSE:
            console.log(action.type);

            return Object.assign({}, state, {

                fetchingData:{
                    notes: {
                        isFetching: false,
                        didInvalidate: false,
                        items: action.data
                    }
                }

            });

        case UPDATE_NOTES_REQUEST:
            console.log(action.type);

            return Object.assign({}, state, {
                fetchingData:{
                    notes: {
                        isFetching: true,
                        didInvalidate: false
                    }
                }
            });

        case UPDATE_NOTES_RESPONSE:
            console.log(action.type);

            return Object.assign({}, state, {

                fetchingData:{
                    notes: {
                        isFetching: false,
                        didInvalidate: false,
                        items: action.data
                    }
                }

            });

        case DELETE_NOTES_REQUEST:
            console.log(action.type);

            return Object.assign({}, state, {
                fetchingData:{
                    notes: {
                        isFetching: true,
                        didInvalidate: false
                    }
                }
            });

        case DELETE_NOTES_RESPONSE:
            console.log(action.type);

            return Object.assign({}, state, {

                fetchingData:{
                    notes: {
                        isFetching: false,
                        didInvalidate: false,
                        items: action.data
                    }
                }

            });

        default:
            return state
    }
}

export default reducer