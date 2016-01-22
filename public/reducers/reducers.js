import { combineReducers } from 'redux'

import map from 'lodash/collection/map.js';
import filter from 'lodash/collection/filter.js';
import forEach from 'lodash/collection/forEach.js';
import max from 'lodash/math/max.js';
//
import { SET_FOLDER_EDIT_MODE, RESET_FOLDER_EDIT_MODE, SET_FOLDER_ACTIVE, EDITING_FOLDER,SET_NOTE_ACTIVE,
    REMOVE_FOLDER, ADD_FOLDER, ADD_NOTE, SET_NOTE_EDIT_MODE, RESET_NOTE_EDIT_MODE,
    EDITING_NOTE_TITLE, EDITING_NOTE_CONTENT, REMOVE_NOTE,
    GET_NOTES_REQUEST, GET_NOTES_RESPONSE, CREATE_NOTES_REQUEST, CREATE_NOTES_RESPONSE,
    UPDATE_NOTES_REQUEST, UPDATE_NOTES_RESPONSE, DELETE_NOTES_REQUEST, DELETE_NOTES_RESPONSE,
    GET_FOLDERS_REQUEST, GET_FOLDERS_RESPONSE, CREATE_FOLDERS_REQUEST, CREATE_FOLDERS_RESPONSE,
    UPDATE_FOLDERS_REQUEST, UPDATE_FOLDERS_RESPONSE, DELETE_FOLDERS_REQUEST, DELETE_FOLDERS_RESPONSE,
    UPDATE_SINGLENOTE_RESPONSE} from '../actions'

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

            let newFoldersData = map(state.fetchingData.folders.items,function(item){
                if(item.id == state.editFolderId){
                    item.name = action.value;
                }
                return item;
            });

            console.log(action.type,action.value,state.foldersData,newFoldersData);

            return Object.assign({}, state, {

                fetchingData:{
                    notes: state.fetchingData.notes,
                    folders: {
                        isFetching: false,
                        didInvalidate: false,
                        items: newFoldersData
                    }
                }

            });

            /*return Object.assign({}, state, {
                foldersData: newFoldersData
            });*/

        case SET_FOLDER_ACTIVE:
            console.log(action.type,action.activeFolderId,state);

            return Object.assign({}, state, {
                activeFolderId: action.activeFolderId
            });

            /*return Object.assign({}, state, {
                foldersData: filter(state.foldersData, function(item) {

                    return item.id != state.activeFolderId;
                })
            });*/

        /*case ADD_FOLDER:
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
            });*/

        /*case ADD_NOTE:

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
            });*/



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

            var newNotesData = map(state.fetchingData.notes.items,function(item){
                if(item.id == state.editNoteId){
                    item.title = action.value;
                }
                return item;
            });

            return Object.assign({}, state, {

                fetchingData:{
                    folders: state.fetchingData.folders,
                    notes: {
                        isFetching: false,
                        didInvalidate: false,
                        items: newNotesData
                    }
                }

            });

        case EDITING_NOTE_CONTENT:

            var newNotesData = map(state.fetchingData.notes.items,function(item){
                if(item.id == state.editNoteId){
                    item.description = action.value;
                }
                return item;
            });

            console.log(action.type,action.value);

            /*return Object.assign({}, state, {
                notesData: newNotesData
            });*/

            return Object.assign({}, state, {

                fetchingData:{
                    folders: state.fetchingData.folders,
                    notes: {
                        isFetching: false,
                        didInvalidate: false,
                        items: newNotesData
                    }
                }

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

        case CREATE_FOLDERS_REQUEST:
            console.log(action.type);

            return Object.assign({}, state, {
                fetchingData:{
                    notes: state.fetchingData.notes,
                    folders: {
                        isFetching: true,
                        didInvalidate: false,
                        items: state.fetchingData.folders.items
                    }
                }
            });

        case CREATE_FOLDERS_RESPONSE:
            console.log(action.type,action.data,action.index,action.index+1);

            state.fetchingData.folders.items.splice(action.data.index+1,0,action.data);

            return Object.assign({}, state, {

                fetchingData:{
                    notes: state.fetchingData.notes,
                    folders: {
                        isFetching: false,
                        didInvalidate: false,
                        items: state.fetchingData.folders.items
                    }
                }

            });

        case DELETE_FOLDERS_REQUEST:
            console.log(action.type);

            return Object.assign({}, state, {
                fetchingData:{
                    notes: state.fetchingData.notes,
                    folders: {
                        isFetching: true,
                        didInvalidate: false,
                        items: state.fetchingData.folders.items
                    }
                }
            });

        case DELETE_FOLDERS_RESPONSE:
            console.log(action.type,state.fetchingData.folders.items);

            return Object.assign({}, state, {

                fetchingData:{
                    notes: state.fetchingData.notes,
                    folders: {
                        isFetching: false,
                        didInvalidate: false,
                        items: filter(state.fetchingData.folders.items, function(item) {

                            return item.id != state.activeFolderId && item.parentId != state.activeFolderId;
                        })
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
            console.log(action.type,state.fetchingData.notes.items);

            return Object.assign({}, state, {
                fetchingData:{
                    notes: {
                        isFetching: true,
                        didInvalidate: false,
                        items: state.fetchingData.notes.items
                    },
                    folders: state.fetchingData.folders
                }
            });

        case CREATE_NOTES_RESPONSE:
            console.log(action.type);

            // activeFolderId

            var items = state.fetchingData.notes.items;

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

                fetchingData:{
                    notes: {
                        isFetching: false,
                        didInvalidate: false,
                        items: items
                    },
                    folders: state.fetchingData.folders
                }

            });

        case UPDATE_NOTES_REQUEST:
            console.log(action.type);

            return Object.assign({}, state, {
                fetchingData:{
                    notes: {
                        isFetching: true,
                        didInvalidate: false,
                        items: state.fetchingData.notes.items
                    },
                    folders: state.fetchingData.folders
                }
            });

        case UPDATE_NOTES_RESPONSE:

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

        case UPDATE_SINGLENOTE_RESPONSE:

            items = state.fetchingData.notes.items;

            forEach(items,function(item){
                if(item.id == action.data.id){
                    item = action.data;
                }
            });

            return Object.assign({}, state, {

                fetchingData:{
                    notes: {
                        isFetching: false,
                        didInvalidate: false,
                        items: items
                    },
                    folders: state.fetchingData.folders
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
            //case REMOVE_NOTE:
            console.log(action.type);

            /*return Object.assign({}, state, {
                notesData: filter(state.notesData, function(item) {

                    return item.id != state.activeNoteId;
                })
            });*/

            return Object.assign({}, state, {

                fetchingData:{
                    notes: {
                        isFetching: false,
                        didInvalidate: false,
                        items: filter(state.fetchingData.notes.items, function(item) {

                            return item.id != state.activeNoteId;
                        })
                    },
                    folders: state.fetchingData.folders
                }

            });

        /*case DELETE_NOTES_RESPONSE:
            console.log(action.type);

            return Object.assign({}, state, {

                fetchingData:{
                    notes: {
                        isFetching: false,
                        didInvalidate: false,
                        items: action.data
                    }
                }

            });*/

        default:
            return state
    }
}

export default reducer